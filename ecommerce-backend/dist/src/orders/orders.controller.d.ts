import { OrdersService } from './orders.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(req: any): Promise<{
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
    getUserOrders(req: any): Promise<({
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
    getOrderById(req: any, id: number): Promise<{
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
    updateOrderStatus(id: number, updateOrderStatusDto: UpdateOrderStatusDto): Promise<{
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
}
