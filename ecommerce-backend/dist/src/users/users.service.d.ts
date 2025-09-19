import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOneByEmail(email: string): Promise<{
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
    findOneById(id: number): Promise<{
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
}
