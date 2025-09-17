import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    getCart(userId: number): Promise<({
        product: {
            id: number;
            name: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            price: import("@prisma/client/runtime/library").Decimal;
            imageUrl: string | null;
            categoryId: number;
            stock: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        productId: number;
        quantity: number;
    })[]>;
    addToCart(userId: number, addToCartDto: AddToCartDto): Promise<{
        product: {
            id: number;
            name: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            price: import("@prisma/client/runtime/library").Decimal;
            imageUrl: string | null;
            categoryId: number;
            stock: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        productId: number;
        quantity: number;
    }>;
    removeFromCart(userId: number, productId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        productId: number;
        quantity: number;
    }>;
    clearCart(userId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
