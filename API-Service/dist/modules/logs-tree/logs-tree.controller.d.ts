import { Response } from 'express';
interface TreeNode {
    title: string;
    key: string;
    isLeaf: boolean;
    children?: TreeNode[];
}
export declare class LogsTreeController {
    private readonly logsDir;
    getTree(): TreeNode[];
    getContent(filePath: string, page: string | undefined, pageSize: string | undefined, res: Response): Response<any, Record<string, any>>;
}
export {};
