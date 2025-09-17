import { PrismaService } from '../prisma/prisma.service';
import { CartService } from '../cart/cart.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
export declare class OrdersService {
    private prisma;
    private cartService;
    private readonly logger;
    constructor(prisma: PrismaService, cartService: CartService);
    createOrder(userId: number): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
        };
        orderItems: ({
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
            price: import("@prisma/client/runtime/library").Decimal;
            productId: number;
            orderId: number;
            quantity: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client/runtime/library").Decimal;
    }>;
    private validateStockAvailability;
    getUserOrders(userId: number): Promise<({
        orderItems: ({
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
            price: import("@prisma/client/runtime/library").Decimal;
            productId: number;
            orderId: number;
            quantity: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client/runtime/library").Decimal;
    })[]>;
    getOrderById(orderId: number, userId: number): Promise<{
        orderItems: ({
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
            price: import("@prisma/client/runtime/library").Decimal;
            productId: number;
            orderId: number;
            quantity: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client/runtime/library").Decimal;
    }>;
    getAllOrders(): Promise<({
        user: {
            id: number;
            name: string;
            email: string;
        };
        orderItems: ({
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
            price: import("@prisma/client/runtime/library").Decimal;
            productId: number;
            orderId: number;
            quantity: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client/runtime/library").Decimal;
    })[]>;
    updateOrderStatus(orderId: number, updateOrderStatusDto: UpdateOrderStatusDto): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
        };
        orderItems: ({
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
            price: import("@prisma/client/runtime/library").Decimal;
            productId: number;
            orderId: number;
            quantity: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client/runtime/library").Decimal;
    }>;
    private decreaseProductStock;
    private increaseProductStock;
}
