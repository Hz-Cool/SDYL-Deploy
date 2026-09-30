import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { AccountSearchDto } from './dto/account-search.dto';
export declare class AccountsService {
    private readonly accountsRepository;
    constructor(accountsRepository: Repository<Account>);
    saveOrUpdate(dto: Partial<Account>): Promise<Account>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    search({ pageNum, pageSize, account, status }: AccountSearchDto): Promise<{
        total: number;
        list: Account[];
    }>;
    findOneById(id: number): Promise<Account>;
    findOneByAccount(account: string): Promise<Account | null>;
    findOne(): Promise<Account>;
}
