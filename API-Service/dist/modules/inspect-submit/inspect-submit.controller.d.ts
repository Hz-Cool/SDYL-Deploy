import { InspectSubmitService } from './inspect-submit.service';
import { InspectSubmitSearchDto } from './dto/inspect-submit-search.dto';
export declare class InspectSubmitController {
    private readonly service;
    constructor(service: InspectSubmitService);
    search(dto: InspectSubmitSearchDto): Promise<{
        list: import("./entities/inspect-submit.entity").MesInspectSubmit[];
        total: number;
        pageNum: number;
        pageSize: number;
    }>;
    findOne(id: string): Promise<import("./entities/inspect-submit.entity").MesInspectSubmit>;
    create(dto: any): Promise<import("./entities/inspect-submit.entity").MesInspectSubmit>;
    update(id: string, dto: any): Promise<import("./entities/inspect-submit.entity").MesInspectSubmit>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
