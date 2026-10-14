import { RefreshSubmissionStatusEventService } from './refresh-submission-status-event.service';
export declare class RefreshSubmissionStatusEventController {
    private readonly service;
    constructor(service: RefreshSubmissionStatusEventService);
    run(body: any): Promise<any>;
    runGet(): Promise<any>;
}
