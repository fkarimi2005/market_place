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
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
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
        id: number;
        categoryId: number;
    }>;
    findAll(query: ProductQueryDto): Promise<{
        data: ({
            category: {
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
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
    getCategories(): Promise<{
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
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
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
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
    findOne(id: number): Promise<{
        category: {
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
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
        id: number;
        categoryId: number;
    }>;
    update(id: number, file: Express.Multer.File, updateProductDto: UpdateProductDto): Promise<{
        category: {
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
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
        id: number;
        categoryId: number;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    createCategory(dto: CreateCategoryDto): Promise<{
        message: string;
        category: {
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
    }>;
}
