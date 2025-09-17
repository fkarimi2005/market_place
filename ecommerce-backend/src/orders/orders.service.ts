import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartService } from '../cart/cart.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
    private readonly logger = new Logger(OrdersService.name);

    constructor(
        private prisma: PrismaService,
        private cartService: CartService,
    ) {}

    async createOrder(userId: number) {
        // Получаем содержимое корзины
        const cartItems = await this.cartService.getCart(userId);

        if (cartItems.length === 0) {
            throw new Error('Корзина пуста');
        }

        // Проверяем наличие товаров на складе
        await this.validateStockAvailability(cartItems);

        // Рассчитываем общую сумму
        const total = cartItems.reduce(
            (sum, item) => sum + item.product.price.toNumber() * item.quantity,
            0,
        );

        // Создаем заказ
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

        // Очищаем корзину
        await this.cartService.clearCart(userId);

        return order;
    }

    // Приватный метод для проверки наличия товаров на складе
    private async validateStockAvailability(cartItems: any[]) {
        for (const item of cartItems) {
            const product = await this.prisma.product.findUnique({
                where: { id: item.productId },
            });

            if (!product) {
                throw new NotFoundException(`Товар с ID ${item.productId} не найден`);
            }

            if (product.stock < item.quantity) {
                throw new Error(`Недостаточно товара "${product.name}" на складе. Доступно: ${product.stock}, требуется: ${item.quantity}`);
            }
        }
    }

    async getUserOrders(userId: number) {
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

    async getOrderById(orderId: number, userId: number) {
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

    // НОВЫЙ МЕТОД: Получение всех заказов (для администратора)
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

    // НОВЫЙ МЕТОД: Обновление статуса заказа (для администратора)
    async updateOrderStatus(orderId: number, updateOrderStatusDto: UpdateOrderStatusDto) {
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
            throw new NotFoundException('Заказ не найден');
        }

        this.logger.log(`Текущий статус заказа: ${order.status}, новый статус: ${updateOrderStatusDto.status}`);

        // Если заказ подтверждается, уменьшаем сток товаров
        if (updateOrderStatusDto.status === 'CONFIRMED' && order.status === 'PENDING') {
            this.logger.log(`Подтверждение заказа ${orderId}, уменьшаем сток товаров`);
            await this.decreaseProductStock(order.orderItems);
        }

        // Если заказ отменяется, возвращаем сток товаров
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

    // Приватный метод для уменьшения стока товаров
    private async decreaseProductStock(orderItems: any[]) {
        this.logger.log(`Уменьшение стока для ${orderItems.length} товаров`);
        this.logger.log(`Структура orderItems: ${JSON.stringify(orderItems, null, 2)}`);
        
        for (const item of orderItems) {
            this.logger.log(`Обработка товара ID: ${item.productId}, количество: ${item.quantity}`);
            
            const product = await this.prisma.product.findUnique({
                where: { id: item.productId },
            });

            if (!product) {
                throw new NotFoundException(`Товар с ID ${item.productId} не найден`);
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

    // Приватный метод для возврата стока товаров
    private async increaseProductStock(orderItems: any[]) {
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
}