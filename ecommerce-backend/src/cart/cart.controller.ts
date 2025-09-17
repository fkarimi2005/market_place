import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    UseGuards,
    Request,
    ParseIntPipe,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get()
    getCart(@Request() req) {
        return this.cartService.getCart(req.user.id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
        return this.cartService.addToCart(req.user.id, addToCartDto);
    }

    @Delete(':productId')
    removeFromCart(
        @Request() req,
        @Param('productId', ParseIntPipe) productId: number,
    ) {
        return this.cartService.removeFromCart(req.user.id, productId);
    }

    @Delete()
    clearCart(@Request() req) {
        return this.cartService.clearCart(req.user.id);
    }
}