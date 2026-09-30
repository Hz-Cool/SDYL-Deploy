import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserSearchDto } from './dto/userSearchDto';
import { UserDeleteDto } from './dto/userDeleteDto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    saveOrUpdate(dto: Partial<User>): Promise<Partial<User> & User>;
    delete(dto: UserDeleteDto): Promise<import("typeorm").UpdateResult>;
    search(dto: UserSearchDto): Promise<{
        total: number;
        list: User[];
    }>;
    getUser(id: number): Promise<User>;
}
