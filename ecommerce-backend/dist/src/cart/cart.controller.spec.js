"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const cart_controller_1 = require("./cart.controller");
describe('CartController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [cart_controller_1.CartController],
        }).compile();
        controller = module.get(cart_controller_1.CartController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=cart.controller.spec.js.map