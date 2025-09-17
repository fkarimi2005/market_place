"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CartService = class CartService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCart(userId) {
        const cartItems = await this.prisma.cartItem.findMany({
            where: { userId },
            include: {
                product: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return cartItems;
    }
    async addToCart(userId, addToCartDto) {
        const { productId, quantity } = addToCartDto;
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            throw new common_1.NotFoundException('Продукт не найден');
        }
        const cartItem = await this.prisma.cartItem.upsert({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
            update: {
                quantity: {
                    increment: quantity,
                },
            },
            create: {
                userId,
                productId,
                quantity,
            },
            include: {
                product: true,
            },
        });
        return cartItem;
    }
    async removeFromCart(userId, productId) {
        const cartItem = await this.prisma.cartItem.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
        });
        if (!cartItem) {
            throw new common_1.NotFoundException('Товар в корзине не найден');
        }
        return this.prisma.cartItem.delete({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
        });
    }
    async clearCart(userId) {
        return this.prisma.cartItem.deleteMany({
            where: { userId },
        });
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map