import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    getCart(userId: number): Promise<({
        product: {
            name: string;
            description: string;
            price: import("@prisma/client/runtime/library").Decimal;
            imageUrl: string | null;
            stock: number;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            id: number;
            categoryId: number;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        productId: number;
        quantity: number;
    })[]>;
    addToCart(userId: number, addToCartDto: AddToCartDto): Promise<{
        product: {
            name: string;
            description: string;
            price: import("@prisma/client/runtime/library").Decimal;
            imageUrl: string | null;
            stock: number;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            id: number;
            categoryId: number;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        productId: number;
        quantity: number;
    }>;
    removeFromCart(userId: number, productId: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        productId: number;
        quantity: number;
    }>;
    clearCart(userId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
