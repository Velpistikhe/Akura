"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDb = exports.connectDb = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const logger_js_1 = require("../utils/logger.js");
exports.prisma = new client_1.PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});
const connectDb = async () => {
    await exports.prisma.$connect();
    logger_js_1.logger.info('Connected to the Marketing PostgreSQL database.');
};
exports.connectDb = connectDb;
const disconnectDb = () => exports.prisma.$disconnect().catch(() => undefined);
exports.disconnectDb = disconnectDb;
//# sourceMappingURL=db.js.map