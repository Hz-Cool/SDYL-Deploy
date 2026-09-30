import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserSearchDto } from './dto/userSearchDto';
import { UserDeleteDto } from './dto/userDeleteDto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    saveOrUpdate(dto: Partial<User>): Promise<Partial<User> & User>;
    delete({ id }: UserDeleteDto): Promise<import("typeorm").UpdateResult>;
    search({ pageNum, pageSize, username, nickname, status }: UserSearchDto): Promise<{
        total: number;
        list: User[];
    }>;
    findOne(username: string): Promise<User | null>;
    findOneById(id: number): Promise<User>;
}
