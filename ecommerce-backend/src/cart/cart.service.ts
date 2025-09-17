import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) {}

    async getCart(userId: number) {
        const cartItems = await this.prisma.cartItem.findMany({
            where: { userId },
            include: {
                product: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return cartItems;
    }

    async addToCart(userId: number, addToCartDto: AddToCartDto) {
        const { productId, quantity } = addToCartDto;

        // Проверяем, существует ли продукт
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            throw new NotFoundException('Продукт не найден');
        }

        // Добавляем или обновляем элемент в корзине
        const cartItem = await this.prisma.cartItem.upsert({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
            update: {
                quantity: {
                    increment: quantity,
                },
            },
            create: {
                userId,
                productId,
                quantity,
            },
            include: {
                product: true,
            },
        });

        return cartItem;
    }

    async removeFromCart(userId: number, productId: number) {
        const cartItem = await this.prisma.cartItem.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
        });

        if (!cartItem) {
            throw new NotFoundException('Товар в корзине не найден');
        }

        return this.prisma.cartItem.delete({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
        });
    }

    async clearCart(userId: number) {
        return this.prisma.cartItem.deleteMany({
            where: { userId },
        });
    }
}