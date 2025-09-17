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
var OrdersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cart_service_1 = require("../cart/cart.service");
let OrdersService = OrdersService_1 = class OrdersService {
    constructor(prisma, cartService) {
        this.prisma = prisma;
        this.cartService = cartService;
        this.logger = new common_1.Logger(OrdersService_1.name);
    }
    async createOrder(userId) {
        const cartItems = await this.cartService.getCart(userId);
        if (cartItems.length === 0) {
            throw new Error('Корзина пуста');
        }
        await this.validateStockAvailability(cartItems);
        const total = cartItems.reduce((sum, item) => sum + item.product.price.toNumber() * item.quantity, 0);
        const order = await this.prisma.order.create({
            data: {
                userId,
                total: total,
                orderItems: {
                    create: cartItems.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.product.price,
                    })),
                },
            },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        await this.cartService.clearCart(userId);
        return order;
    }
    async validateStockAvailability(cartItems) {
        for (const item of cartItems) {
            const product = await this.prisma.product.findUnique({
                where: { id: item.productId },
            });
            if (!product) {
                throw new common_1.NotFoundException(`Товар с ID ${item.productId} не найден`);
            }
            if (product.stock < item.quantity) {
                throw new Error(`Недостаточно товара "${product.name}" на складе. Доступно: ${product.stock}, требуется: ${item.quantity}`);
            }
        }
    }
    async getUserOrders(userId) {
        return this.prisma.order.findMany({
            where: { userId },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async getOrderById(orderId, userId) {
        return this.prisma.order.findUnique({
            where: {
                id: orderId,
                userId,
            },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }
    async getAllOrders() {
        return this.prisma.order.findMany({
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async updateOrderStatus(orderId, updateOrderStatusDto) {
        this.logger.log(`Обновление статуса заказа ${orderId} на ${updateOrderStatusDto.status}`);
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        if (!order) {
            throw new common_1.NotFoundException('Заказ не найден');
        }
        this.logger.log(`Текущий статус заказа: ${order.status}, новый статус: ${updateOrderStatusDto.status}`);
        if (updateOrderStatusDto.status === 'CONFIRMED' && order.status === 'PENDING') {
            this.logger.log(`Подтверждение заказа ${orderId}, уменьшаем сток товаров`);
            await this.decreaseProductStock(order.orderItems);
        }
        if (updateOrderStatusDto.status === 'CANCELLED' && order.status === 'CONFIRMED') {
            this.logger.log(`Отмена заказа ${orderId}, возвращаем сток товаров`);
            await this.increaseProductStock(order.orderItems);
        }
        return this.prisma.order.update({
            where: { id: orderId },
            data: {
                status: updateOrderStatusDto.status,
            },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async decreaseProductStock(orderItems) {
        this.logger.log(`Уменьшение стока для ${orderItems.length} товаров`);
        this.logger.log(`Структура orderItems: ${JSON.stringify(orderItems, null, 2)}`);
        for (const item of orderItems) {
            this.logger.log(`Обработка товара ID: ${item.productId}, количество: ${item.quantity}`);
            const product = await this.prisma.product.findUnique({
                where: { id: item.productId },
            });
            if (!product) {
                throw new common_1.NotFoundException(`Товар с ID ${item.productId} не найден`);
            }
            this.logger.log(`Товар "${product.name}": текущий сток ${product.stock}, требуется ${item.quantity}`);
            if (product.stock < item.quantity) {
                throw new Error(`Недостаточно товара "${product.name}" на складе. Доступно: ${product.stock}, требуется: ${item.quantity}`);
            }
            const newStock = product.stock - item.quantity;
            this.logger.log(`Обновляем сток товара "${product.name}" с ${product.stock} на ${newStock}`);
            const updatedProduct = await this.prisma.product.update({
                where: { id: item.productId },
                data: {
                    stock: newStock,
                },
            });
            this.logger.log(`Сток товара "${product.name}" успешно обновлен на ${updatedProduct.stock}`);
        }
    }
    async increaseProductStock(orderItems) {
        this.logger.log(`Возврат стока для ${orderItems.length} товаров`);
        for (const item of orderItems) {
            this.logger.log(`Возвращаем товар ID: ${item.productId}, количество: ${item.quantity}`);
            const updatedProduct = await this.prisma.product.update({
                where: { id: item.productId },
                data: {
                    stock: {
                        increment: item.quantity,
                    },
                },
            });
            this.logger.log(`Сток товара ID ${item.productId} увеличен на ${item.quantity}, новый сток: ${updatedProduct.stock}`);
        }
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = OrdersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cart_service_1.CartService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map