import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    signIn(dto: LoginDto): Promise<any>;
    getProfile(req: any): Promise<{
        id: number;
        username: string;
        nickname: string;
        status: number;
        lastLoginTime: Date;
        lastLoginIp: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
    } | {}>;
}
