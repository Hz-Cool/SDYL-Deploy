"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomLogger = getCustomLogger;
const path = __importStar(require("path"));
const dayjs_1 = __importDefault(require("dayjs"));
const pino = require("pino");
const loggersMap = new Map();
function getCustomLogger(tag, fileName) {
    const logFileName = fileName || `${tag}.log`;
    const now = (0, dayjs_1.default)();
    const yearMonth = now.format('YYYYMM');
    const day = now.format('DD');
    const key = `${yearMonth}${day}:${tag}:${logFileName}`;
    if (loggersMap.has(key)) {
        return loggersMap.get(key);
    }
    for (const [k] of loggersMap) {
        if (!k.startsWith(`${yearMonth}${day}:`)) {
            loggersMap.delete(k);
        }
    }
    const logFilePath = path.join(process.cwd(), 'logs', yearMonth, day, tag, logFileName);
    const logger = pino({
        level: process.env.LOG_LEVEL || 'info',
    }, pino.transport({
        target: 'pino-roll',
        options: {
            file: logFilePath,
            frequency: 'daily',
            mkdir: true,
            extension: '',
        },
    }));
    loggersMap.set(key, logger);
    return logger;
}
//# sourceMappingURL=logger.util.js.map