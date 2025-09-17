"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const orders_service_1 = require("./orders.service");
describe('OrdersService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [orders_service_1.OrdersService],
        }).compile();
        service = module.get(orders_service_1.OrdersService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=orders.service.spec.js.map