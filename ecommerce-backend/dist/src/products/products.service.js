"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto) {
        return this.prisma.product.create({
            data: createProductDto,
            include: { category: true },
        });
    }
    async createCategory(dto) {
        const existingCategory = await this.prisma.category.findUnique({
            where: { name: dto.name },
        });
        if (existingCategory) {
            throw new common_1.BadRequestException(`Категория с именем ${dto.name} уже существует`);
        }
        const category = await this.prisma.category.create({ data: dto });
        return { message: 'Категория успешно создана', category };
    }
    async findAll(query) {
        const { search, categoryId, minPrice, maxPrice, page, limit } = query;
        const where = { isDeleted: false };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (categoryId)
            where.categoryId = categoryId;
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.price = {};
            if (minPrice !== undefined)
                where.price.gte = minPrice;
            if (maxPrice !== undefined)
                where.price.lte = maxPrice;
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
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { category: true },
        });
        if (!product)
            throw new common_1.NotFoundException(`Продукт с ID ${id} не найден`);
        return product;
    }
    async searchByName(searchTerm, page = 1, limit = 10) {
        if (!searchTerm || searchTerm.trim().length === 0)
            throw new Error('Поисковый запрос не может быть пустым');
        const skip = (page - 1) * limit;
        const searchWhere = {
            name: {
                contains: searchTerm.trim(),
                mode: 'insensitive',
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
    async update(id, updateProductDto) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException(`Продукт с ID ${id} не найден`);
        return this.prisma.product.update({
            where: { id },
            data: updateProductDto,
            include: { category: true },
        });
    }
    async remove(productId) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Продукт с ID ${productId} не найден`);
        }
        const pendingOrdersCount = await this.prisma.orderItem.count({
            where: {
                productId,
                order: {
                    status: client_1.OrderStatus.PENDING,
                },
            },
        });
        if (pendingOrdersCount > 0) {
            throw new common_1.BadRequestException('Нельзя удалить товар: есть заказы в ожидании подтверждения');
        }
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
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map