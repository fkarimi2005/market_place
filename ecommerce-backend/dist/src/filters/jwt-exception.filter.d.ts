import { ExceptionFilter, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
export declare class JwtExceptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: UnauthorizedException, host: ArgumentsHost): void;
}
