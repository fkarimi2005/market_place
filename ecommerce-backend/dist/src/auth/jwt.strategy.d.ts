import { Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    validate(payload: any): Promise<{
        id: number;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
}
export {};
