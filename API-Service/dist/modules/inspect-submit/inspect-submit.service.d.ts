import { Repository } from 'typeorm';
import { MesInspectSubmit } from './entities/inspect-submit.entity';
import { InspectSubmitSearchDto } from './dto/inspect-submit-search.dto';
export declare class InspectSubmitService {
    private readonly repo;
    constructor(repo: Repository<MesInspectSubmit>);
    search(query: InspectSubmitSearchDto): Promise<{
        list: MesInspectSubmit[];
        total: number;
        pageNum: number;
        pageSize: number;
    }>;
    findOne(id: number): Promise<MesInspectSubmit>;
    create(dto: Partial<MesInspectSubmit>): Promise<MesInspectSubmit>;
    update(id: number, dto: Partial<MesInspectSubmit>): Promise<MesInspectSubmit>;
    remove(id: number): Promise<{
        success: boolean;
    }>;
}
