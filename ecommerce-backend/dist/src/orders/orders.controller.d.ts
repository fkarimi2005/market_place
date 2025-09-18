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
    getUserOrders(req: any): Promise<({
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
    getOrderById(req: any, id: number): Promise<{
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
    updateOrderStatus(id: number, updateOrderStatusDto: UpdateOrderStatusDto): Promise<{
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
}
