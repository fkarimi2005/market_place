import { ExceptionFilter, Catch, ArgumentsHost, Logger, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

@Catch(UnauthorizedException)
export class JwtExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(JwtExceptionFilter.name);

    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
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
}