import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(req: any): Promise<({
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
    addToCart(req: any, addToCartDto: AddToCartDto): Promise<{
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
    removeFromCart(req: any, productId: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        productId: number;
        quantity: number;
    }>;
    clearCart(req: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
