import { Table1EventService } from './table1-event.service';
export declare class Table1EventController {
    private readonly table1EventService;
    constructor(table1EventService: Table1EventService);
    sendTable1(body: any): Promise<{
        success: boolean;
        statusCode: number;
        apiCode: string;
        apiName: string;
        apiUrl: string;
        responseData: any;
    }>;
    sendTable1Get(): Promise<{
        success: boolean;
        statusCode: number;
        apiCode: string;
        apiName: string;
        apiUrl: string;
        responseData: any;
    }>;
}
