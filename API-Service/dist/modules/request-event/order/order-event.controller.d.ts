import { OrderEventService } from './order-event.service';
export declare class OrderEventController {
    private readonly orderEventService;
    constructor(orderEventService: OrderEventService);
    sendOrder(body: any): Promise<{
        success: boolean;
        statusCode: number;
        apiCode: string;
        apiName: string;
        apiUrl: string;
        responseData: any;
    }>;
    sendOrderGet(): Promise<{
        success: boolean;
        statusCode: number;
        apiCode: string;
        apiName: string;
        apiUrl: string;
        responseData: any;
    }>;
}
