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
                createdAt: Date;
                updatedAt: Date;
                id: number;
                name: string;
                description: string;
                price: import("@prisma/client/runtime/library").Decimal;
                imageUrl: string | null;
                categoryId: number;
                stock: number;
            };
        } & {
            createdAt: Date;
            id: number;
            productId: number;
            quantity: number;
            price: import("@prisma/client/runtime/library").Decimal;
            orderId: number;
        })[];
    } & {
        status: import(".prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    private validateStockAvailability;
    getUserOrders(userId: number): Promise<({
        orderItems: ({
            product: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                name: string;
                description: string;
                price: import("@prisma/client/runtime/library").Decimal;
                imageUrl: string | null;
                categoryId: number;
                stock: number;
            };
        } & {
            createdAt: Date;
            id: number;
            productId: number;
            quantity: number;
            price: import("@prisma/client/runtime/library").Decimal;
            orderId: number;
        })[];
    } & {
        status: import(".prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    })[]>;
    getOrderById(orderId: number, userId: number): Promise<{
        orderItems: ({
            product: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                name: string;
                description: string;
                price: import("@prisma/client/runtime/library").Decimal;
                imageUrl: string | null;
                categoryId: number;
                stock: number;
            };
        } & {
            createdAt: Date;
            id: number;
            productId: number;
            quantity: number;
            price: import("@prisma/client/runtime/library").Decimal;
            orderId: number;
        })[];
    } & {
        status: import(".prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    getAllOrders(): Promise<({
        user: {
            id: number;
            name: string;
            email: string;
        };
        orderItems: ({
            product: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                name: string;
                description: string;
                price: import("@prisma/client/runtime/library").Decimal;
                imageUrl: string | null;
                categoryId: number;
                stock: number;
            };
        } & {
            createdAt: Date;
            id: number;
            productId: number;
            quantity: number;
            price: import("@prisma/client/runtime/library").Decimal;
            orderId: number;
        })[];
    } & {
        status: import(".prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    })[]>;
    updateOrderStatus(orderId: number, updateOrderStatusDto: UpdateOrderStatusDto): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
        };
        orderItems: ({
            product: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                name: string;
                description: string;
                price: import("@prisma/client/runtime/library").Decimal;
                imageUrl: string | null;
                categoryId: number;
                stock: number;
            };
        } & {
            createdAt: Date;
            id: number;
            productId: number;
            quantity: number;
            price: import("@prisma/client/runtime/library").Decimal;
            orderId: number;
        })[];
    } & {
        status: import(".prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    private decreaseProductStock;
    private increaseProductStock;
}
