import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(file: Express.Multer.File, createProductDto: CreateProductDto): Promise<{
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
    getCategories(): Promise<{
        id: number;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getForecastByProduct(): Promise<{
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
    update(id: number, file: Express.Multer.File, updateProductDto: UpdateProductDto): Promise<{
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
}
