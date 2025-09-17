"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const cart_service_1 = require("./cart.service");
describe('CartService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [cart_service_1.CartService],
        }).compile();
        service = module.get(cart_service_1.CartService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=cart.service.spec.js.map