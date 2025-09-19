import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        category: {
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            id: number;
        };
    } & {
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
    }>;
    createCategory(dto: CreateCategoryDto): Promise<{
        message: string;
        category: {
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            id: number;
        };
    }>;
    findAll(query: ProductQueryDto): Promise<{
        data: ({
            category: {
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                isDeleted: boolean;
                id: number;
            };
        } & {
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
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
        category: {
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            id: number;
        };
    } & {
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
    }>;
    searchByName(searchTerm: string, page?: number, limit?: number): Promise<{
        data: ({
            category: {
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                isDeleted: boolean;
                id: number;
            };
        } & {
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
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            searchTerm: string;
        };
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        category: {
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            id: number;
        };
    } & {
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
    }>;
    remove(productId: number): Promise<{
        message: string;
    }>;
    getCategories(): Promise<{
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        id: number;
    }[]>;
    getSalesForecastByProduct(): Promise<{
        data: {
            productId: number;
            name: string;
            imageUrl: string;
            dailyIncome: number;
            monthlyIncome: number;
        }[];
        meta: {
            total: number;
            generatedAt: string;
        };
    }>;
}
