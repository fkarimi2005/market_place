import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { CreateCategoryDto } from "./dto/create-category.dto";
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        category: {
            id: number;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        price: import("@prisma/client/runtime/library").Decimal;
        imageUrl: string | null;
        categoryId: number;
        stock: number;
    }>;
    createCategory(dto: CreateCategoryDto): Promise<{
        message: string;
        category: {
            id: number;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    findAll(query: ProductQueryDto): Promise<{
        data: ({
            category: {
                id: number;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            name: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            price: import("@prisma/client/runtime/library").Decimal;
            imageUrl: string | null;
            categoryId: number;
            stock: number;
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
            id: number;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        price: import("@prisma/client/runtime/library").Decimal;
        imageUrl: string | null;
        categoryId: number;
        stock: number;
    }>;
    searchByName(searchTerm: string, page?: number, limit?: number): Promise<{
        data: ({
            category: {
                id: number;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            name: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            price: import("@prisma/client/runtime/library").Decimal;
            imageUrl: string | null;
            categoryId: number;
            stock: number;
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
            id: number;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        price: import("@prisma/client/runtime/library").Decimal;
        imageUrl: string | null;
        categoryId: number;
        stock: number;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    getCategories(): Promise<{
        id: number;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
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
