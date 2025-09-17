import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import {CreateCategoryDto} from "./dto/create-category.dto";

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {
    }

    async create(createProductDto: CreateProductDto) {
        return this.prisma.product.create({
            data: createProductDto,
            include: {
                category: true,
            },
        });
    }

    async createCategory(dto: CreateCategoryDto) {
        // Проверяем, существует ли категория с таким именем
        const existingCategory = await this.prisma.category.findUnique({
            where: {name: dto.name},
        });

        if (existingCategory) {
            throw new BadRequestException(`Категория с именем ${dto.name} уже существует`);
        }

        const category = await this.prisma.category.create({
            data: dto,
        });

        return {
            message: 'Категория успешно создана',
            category,
        };
    }


    async findAll(query: ProductQueryDto) {
        const {search, categoryId, minPrice, maxPrice, page, limit} = query;

        const where: any = {};

        if (search) {
            where.OR = [
                {name: {contains: search, mode: 'insensitive'}},
                {description: {contains: search, mode: 'insensitive'}},
            ];
        }

        if (categoryId) {
            where.categoryId = categoryId;
        }

        if (minPrice !== undefined || maxPrice !== undefined) {
            where.price = {};
            if (minPrice !== undefined) {
                where.price.gte = minPrice;
            }
            if (maxPrice !== undefined) {
                where.price.lte = maxPrice;
            }
        }

        const skip = (page - 1) * limit;

        const [products, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                include: {
                    category: true,
                },
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            this.prisma.product.count({where}),
        ]);

        return {
            data: products,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: number) {
        const product = await this.prisma.product.findUnique({
            where: {id},
            include: {
                category: true,
            },
        });

        if (!product) {
            throw new NotFoundException(`Продукт с ID ${id} не найден`);
        }

        return product;
    }

    // НОВЫЙ МЕТОД: Поиск продуктов по подстроке в имени
    async searchByName(searchTerm: string, page: number = 1, limit: number = 10) {
        if (!searchTerm || searchTerm.trim().length === 0) {
            throw new Error('Поисковый запрос не может быть пустым');
        }

        const skip = (page - 1) * limit;

        const [products, total] = await Promise.all([
            this.prisma.product.findMany({
                where: {
                    name: {
                        contains: searchTerm.trim(),
                        mode: 'insensitive',
                    },
                },
                include: {
                    category: true,
                },
                skip,
                take: limit,
                orderBy: {
                    name: 'asc',
                },
            }),
            this.prisma.product.count({
                where: {
                    name: {
                        contains: searchTerm.trim(),
                        mode: 'insensitive',
                    },
                },
            }),
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
        const product = await this.prisma.product.findUnique({
            where: {id},
        });

        if (!product) {
            throw new NotFoundException(`Продукт с ID ${id} не найден`);
        }

        return this.prisma.product.update({
            where: {id},
            data: updateProductDto,
            include: {
                category: true,
            },
        });
    }

    async remove(id: number) {
        // Проверяем, существует ли товар
        const product = await this.prisma.product.findUnique({where: {id}});
        if (!product) {
            throw new NotFoundException(`Продукт с ID ${id} не найден`);
        }

        // Получаем все orderItems этого товара с заказами, которые CONFIRMED
        const confirmedOrders = await this.prisma.orderItem.findMany({
            where: {
                productId: id,
                order: {
                    status: 'CONFIRMED',
                },
            },
            include: {
                order: true,
            },
        });

        // Если есть confirmed заказы, удаляем их связи и товар
        if (confirmedOrders.length > 0) {
            // Можно использовать транзакцию, чтобы удалить всё атомарно
            await this.prisma.$transaction([
                // Удаляем связанные orderItems
                this.prisma.orderItem.deleteMany({where: {productId: id}}),
                // Удаляем связанные cartItems
                this.prisma.cartItem.deleteMany({where: {productId: id}}),
                // Удаляем сам продукт
                this.prisma.product.delete({where: {id}}),
            ]);

            return {message: `Товар с ID ${id} и связанные confirmed заказы удалены`};
        }

        // Если нет confirmed заказов, просто удаляем товар и корзину
        await this.prisma.$transaction([
            this.prisma.cartItem.deleteMany({where: {productId: id}}),
            this.prisma.product.delete({where: {id}}),
        ]);

        return {message: `Товар с ID ${id} успешно удалён`};
    }

    async getCategories() {
        return this.prisma.category.findMany({
            orderBy: {
                name: 'asc',
            },
        });
    }

    async getSalesForecastByProduct() { // ← Без параметров
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        oneMonthAgo.setHours(0, 0, 0, 0);

        // Получаем ТОЛЬКО те продукты, которые есть в confirmed заказах за последний месяц
        const productsWithSales = await this.prisma.product.findMany({
            where: {
                orderItems: {
                    some: {
                        order: {
                            status: 'CONFIRMED',
                            createdAt: {
                                gte: oneMonthAgo,
                            },
                        },
                    },
                },
            },
            include: {
                orderItems: {
                    where: {
                        order: {
                            status: 'CONFIRMED',
                            createdAt: {
                                gte: oneMonthAgo,
                            },
                        },
                    },
                    include: {
                        order: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        const result = productsWithSales.map((product) => {
            const orderItems = product.orderItems || [];

            const dailyIncome = orderItems
                .filter((oi) => oi.order.createdAt >= todayStart)
                .reduce((sum, oi) => sum + Number(oi.price) * oi.quantity, 0);

            const monthlyIncome = orderItems.reduce(
                (sum, oi) => sum + Number(oi.price) * oi.quantity,
                0
            );

            return {
                productId: product.id,
                name: product.name,
                imageUrl: product.imageUrl, // ← добавили!
                dailyIncome: parseFloat(dailyIncome.toFixed(2)),
                monthlyIncome: parseFloat(monthlyIncome.toFixed(2)),
            };
        });

        return {
            data: result,
            meta: {
                total: result.length,
                generatedAt: new Date().toISOString(),
            },
        };
    }}