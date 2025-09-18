import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOneByEmail(email: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
    findOneById(id: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
}
