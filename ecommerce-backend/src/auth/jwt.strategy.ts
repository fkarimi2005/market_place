import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name);

    constructor(private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
        });
    }

    async validate(payload: any) {
        this.logger.log(`Validating payload: ${JSON.stringify(payload)}`);

        // Ищем пользователя по ID из payload
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
        });

        if (!user) {
            this.logger.warn(`User not found for ID: ${payload.sub}`);
            throw new UnauthorizedException('Пользователь не найден');
        }

        this.logger.log(`User validated: ${user.email}`);

        // Возвращаем только необходимые данные пользователя
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
    }
}