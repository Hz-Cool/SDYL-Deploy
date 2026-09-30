import { AccountsService } from './accounts.service';
import { Account } from './account.entity';
import { AccountSearchDto } from './dto/account-search.dto';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    saveOrUpdate(dto: Partial<Account>): Promise<Account>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    search(dto: AccountSearchDto): Promise<{
        total: number;
        list: Account[];
    }>;
    getAccount(id: number): Promise<Account>;
}
