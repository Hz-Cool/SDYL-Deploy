"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsTreeController = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const public_1 = require("../utils/decorator/public");
function buildTree(dir, baseKey) {
    const items = [];
    try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const key = `${baseKey}/${entry.name}`;
            if (entry.isDirectory()) {
                items.push({
                    title: entry.name,
                    key,
                    isLeaf: false,
                    children: buildTree(path.join(dir, entry.name), key),
                });
            }
            else if (entry.isFile() && entry.name.endsWith('.log')) {
                items.push({ title: entry.name, key, isLeaf: true });
            }
        }
    }
    catch {
    }
    return items;
}
let LogsTreeController = class LogsTreeController {
    logsDir = path.join(process.cwd(), 'logs');
    getTree() {
        return buildTree(this.logsDir, '');
    }
    getContent(filePath, page = '1', pageSize = '200', res) {
        const normalized = path.normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, '');
        const fullPath = path.join(this.logsDir, normalized);
        if (!fullPath.startsWith(this.logsDir)) {
            return res.status(403).json({ message: 'Forbidden path' });
        }
        if (!fs.existsSync(fullPath)) {
            return res.status(404).json({ message: 'File not found' });
        }
        const rawContent = fs.readFileSync(fullPath, 'utf-8');
        const allLines = rawContent.split('\n').filter((l) => l.trim() !== '');
        const total = allLines.length;
        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const size = Math.min(1000, Math.max(1, parseInt(pageSize, 10) || 200));
        const totalPages = Math.max(1, Math.ceil(total / size));
        const safePage = Math.min(pageNum, totalPages);
        const start = (safePage - 1) * size;
        const end = Math.min(start + size, total);
        const lines = allLines.slice(start, end);
        return res.status(200).json({
            lines,
            total,
            page: safePage,
            pageSize: size,
            totalPages,
        });
    }
};
exports.LogsTreeController = LogsTreeController;
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LogsTreeController.prototype, "getTree", null);
__decorate([
    (0, public_1.Public)(),
    (0, common_1.Get)('content'),
    __param(0, (0, common_1.Query)('filePath')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", void 0)
], LogsTreeController.prototype, "getContent", null);
exports.LogsTreeController = LogsTreeController = __decorate([
    (0, common_1.Controller)('logs-tree')
], LogsTreeController);
//# sourceMappingURL=logs-tree.controller.js.map