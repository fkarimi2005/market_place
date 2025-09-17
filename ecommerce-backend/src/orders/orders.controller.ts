
import {
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Body,
    UseGuards,
    Request,
    ParseIntPipe,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { OrdersService } from './orders.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    createOrder(@Request() req) {
        return this.ordersService.createOrder(req.user.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    getUserOrders(@Request() req) {
        return this.ordersService.getUserOrders(req.user.id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getOrderById(
        @Request() req,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.ordersService.getOrderById(id, req.user.id);
    }

    // НОВЫЕ МЕТОДЫ ДЛЯ АДМИНИСТРАТОРА

    @Get('admin/all')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    getAllOrders() {
        return this.ordersService.getAllOrders();
    }

    @Patch('admin/:id/status')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @UsePipes(new ValidationPipe())
    updateOrderStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    ) {
        return this.ordersService.updateOrderStatus(id, updateOrderStatusDto);
    }
}