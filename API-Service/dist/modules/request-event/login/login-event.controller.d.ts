import { LoginEventService } from './login-event.service';
export declare class LoginEventController {
    private readonly loginEventService;
    constructor(loginEventService: LoginEventService);
    sendLogin(body: any): Promise<{
        success: boolean;
        statusCode: number;
        apiCode: string;
        apiName: string;
        apiUrl: string;
        responseData: any;
    }>;
    sendLoginGet(): Promise<{
        success: boolean;
        statusCode: number;
        apiCode: string;
        apiName: string;
        apiUrl: string;
        responseData: any;
    }>;
}
