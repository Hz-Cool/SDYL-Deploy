import { RefreshModelEventService } from './refresh-model-event.service';
export declare class RefreshModelEventController {
    private readonly refreshModelEventService;
    constructor(refreshModelEventService: RefreshModelEventService);
    sendRefreshModel(body: any): Promise<any>;
    sendRefreshModelGet(): Promise<any>;
}
