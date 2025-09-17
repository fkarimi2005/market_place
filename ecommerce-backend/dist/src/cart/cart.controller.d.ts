import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(req: any): Promise<({
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
    addToCart(req: any, addToCartDto: AddToCartDto): Promise<{
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
    removeFromCart(req: any, productId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        productId: number;
        quantity: number;
    }>;
    clearCart(req: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
