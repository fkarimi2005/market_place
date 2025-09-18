import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
    ParseIntPipe,
    UsePipes,
    ValidationPipe,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Public } from '../auth/public.decorator';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Express } from 'express';


@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './upload',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + extname(file.originalname));
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/^image\//)) {
                return cb(new Error('Только изображения!'), false);
            }
            cb(null, true);
        },
    }))
    @UsePipes(new ValidationPipe())
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createProductDto: CreateProductDto,
    ) {
        let imageUrl = createProductDto.imageUrl;
        if (file) {
            imageUrl = `/upload/${file.filename}`;
        }
        return this.productsService.create({ ...createProductDto, imageUrl });
    }

    @Public()
    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    findAll(@Query() query: ProductQueryDto) {
        return this.productsService.findAll(query);
    }

    @Public()
    @Get('categories')
    getCategories() {
        return this.productsService.getCategories();
    }
    @Get('forecast')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @UsePipes(new ValidationPipe())
    getForecastByProduct() {
        return this.productsService.getSalesForecastByProduct();
    }

    @Public()
    @Get('search/:term')
    searchByName(
        @Param('term') searchTerm: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.productsService.searchByName(
            searchTerm,
            page || 1,
            limit || 10,
        );
    }

    @Public()
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './upload',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + extname(file.originalname));
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/^image\//)) {
                return cb(new Error('Только изображения!'), false);
            }
            cb(null, true);
        },
    }))
    @UsePipes(new ValidationPipe())
    async update(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        let imageUrl = updateProductDto.imageUrl;
        if (file) {
            imageUrl = `/upload/${file.filename}`;
        }
        return this.productsService.update(id, { ...updateProductDto, imageUrl });
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.remove(id);
    }

    @Post('categories')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @UsePipes(new ValidationPipe())
    createCategory(@Body() dto: CreateCategoryDto) {
        return this.productsService.createCategory(dto);
    }
}