import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CartModule } from '../cart/cart.module'; // Добавляем импорт CartModule
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
    imports: [PrismaModule, CartModule], // Добавляем CartModule в imports
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}