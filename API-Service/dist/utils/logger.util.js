"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomLogger = getCustomLogger;
const path = require("path");
const dayjs = require("dayjs");
const pino = require("pino");
const loggersMap = new Map();
function getCustomLogger(tag, fileName) {
    const logFileName = fileName || `${tag}.log`;
    const now = dayjs();
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