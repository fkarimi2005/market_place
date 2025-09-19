import { PrismaService } from '../prisma/prisma.service';
import { CartService } from '../cart/cart.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
export declare class OrdersService {
    private prisma;
    private cartService;
    private readonly logger;
    constructor(prisma: PrismaService, cartService: CartService);
    createOrder(userId: number): Promise<{
        orderItems: ({
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
            price: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            id: number;
            productId: number | null;
            orderId: number;
            quantity: number;
        })[];
        user: {
            name: string;
            id: number;
            email: string;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client/runtime/library").Decimal;
    }>;
    private validateStockAvailability;
    getUserOrders(userId: number): Promise<({
        orderItems: ({
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
            price: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            id: number;
            productId: number | null;
            orderId: number;
            quantity: number;
        })[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client/runtime/library").Decimal;
    })[]>;
    getOrderById(orderId: number, userId: number): Promise<{
        orderItems: ({
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
            price: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            id: number;
            productId: number | null;
            orderId: number;
            quantity: number;
        })[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client/runtime/library").Decimal;
    }>;
    getAllOrders(): Promise<({
        orderItems: ({
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
            price: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            id: number;
            productId: number | null;
            orderId: number;
            quantity: number;
        })[];
        user: {
            name: string;
            id: number;
            email: string;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client/runtime/library").Decimal;
    })[]>;
    updateOrderStatus(orderId: number, updateOrderStatusDto: UpdateOrderStatusDto): Promise<{
        orderItems: ({
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
            price: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            id: number;
            productId: number | null;
            orderId: number;
            quantity: number;
        })[];
        user: {
            name: string;
            id: number;
            email: string;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client/runtime/library").Decimal;
    }>;
    private decreaseProductStock;
    private increaseProductStock;
}
