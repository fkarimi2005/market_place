"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JwtExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let JwtExceptionFilter = JwtExceptionFilter_1 = class JwtExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(JwtExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        this.logger.warn(`JWT ошибка: ${exception.message}`);
        response
            .status(status)
            .json({
            statusCode: status,
            message: exception.message,
            timestamp: new Date().toISOString(),
            path: ctx.getRequest().url,
        });
    }
};
exports.JwtExceptionFilter = JwtExceptionFilter;
exports.JwtExceptionFilter = JwtExceptionFilter = JwtExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(common_1.UnauthorizedException)
], JwtExceptionFilter);
//# sourceMappingURL=jwt-exception.filter.js.map