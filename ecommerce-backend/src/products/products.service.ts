import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaClient, OrderStatus } from '@prisma/client'; // импортируем OrderStatus


@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
      include: { category: true },
    });
  }

  async createCategory(dto: CreateCategoryDto) {
    const existingCategory = await this.prisma.category.findUnique({
      where: { name: dto.name },
    });

    if (existingCategory) {
      throw new BadRequestException(`Категория с именем ${dto.name} уже существует`);
    }

    const category = await this.prisma.category.create({ data: dto });

    return { message: 'Категория успешно создана', category };
  }

  async findAll(query: ProductQueryDto) {
    const { search, categoryId, minPrice, maxPrice, page, limit } = query;
    const where: any = { isDeleted: false }; // 👈 добавляем сразу сюда

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoryId) where.categoryId = categoryId;
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) throw new NotFoundException(`Продукт с ID ${id} не найден`);
    return product;
  }

  async searchByName(searchTerm: string, page: number = 1, limit: number = 10) {
    if (!searchTerm || searchTerm.trim().length === 0)
      throw new Error('Поисковый запрос не может быть пустым');

    const skip = (page - 1) * limit;

    const searchWhere = {
      name: {
        contains: searchTerm.trim(),
        mode: 'insensitive' as const, // ← используем 'as const' для QueryMode
      },
    };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where: searchWhere,
        include: { category: true },
        skip,
        take: limit,
        orderBy: { name: 'asc' },
      }),
      this.prisma.product.count({ where: searchWhere }),
    ]);

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        searchTerm: searchTerm.trim(),
      },
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException(`Продукт с ID ${id} не найден`);

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: { category: true },
    });
  }


  async remove(productId: number) {
    // 1️⃣ Проверяем, существует ли товар
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Продукт с ID ${productId} не найден`);
    }

    // 2️⃣ Считаем количество связанных заказов со статусом PENDING
    const pendingOrdersCount = await this.prisma.orderItem.count({
      where: {
        productId,
        order: {
          status: OrderStatus.PENDING, // enum из @prisma/client
        },
      },
    });

    if (pendingOrdersCount > 0) {
      throw new BadRequestException(
        'Нельзя удалить товар: есть заказы в ожидании подтверждения'
      );
    }

    // 3️⃣ Мягкое удаление: скрываем товар, чтобы история заказов сохранилась
    await this.prisma.product.update({
      where: { id: productId },
      data: { isDeleted: true },
    });

    return { message: 'Товар успешно удалён' };
  }

  async getCategories() {
    return this.prisma.category.findMany({ orderBy: { name: 'asc' } });
  }

  async getSalesForecastByProduct() {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    oneMonthAgo.setHours(0, 0, 0, 0);

    const productsWithSales = await this.prisma.product.findMany({
      where: {
        orderItems: { some: { order: { status: 'CONFIRMED', createdAt: { gte: oneMonthAgo } } } },
      },
      include: {
        orderItems: {
          where: { order: { status: 'CONFIRMED', createdAt: { gte: oneMonthAgo } } },
          include: { order: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const result = productsWithSales.map(product => {
      const orderItems = product.orderItems || [];
      const dailyIncome = orderItems
        .filter(oi => oi.order.createdAt >= todayStart)
        .reduce((sum, oi) => sum + Number(oi.price) * oi.quantity, 0);

      const monthlyIncome = orderItems.reduce((sum, oi) => sum + Number(oi.price) * oi.quantity, 0);

      return {
        productId: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        dailyIncome: parseFloat(dailyIncome.toFixed(2)),
        monthlyIncome: parseFloat(monthlyIncome.toFixed(2)),
      };
    });

    return {
      data: result,
      meta: { total: result.length, generatedAt: new Date().toISOString() },
    };
  }
}
