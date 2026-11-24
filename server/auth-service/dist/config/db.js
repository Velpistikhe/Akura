"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDb = exports.connectDb = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const errorDetails_js_1 = require("../utils/errorDetails.js");
const logger_js_1 = require("../utils/logger.js");
exports.prisma = new client_1.PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});
const connectDb = async () => {
    try {
        await exports.prisma.$connect();
        logger_js_1.logger.info('Prisma Client connected to PostgreSQL database.');
    }
    catch (error) {
        logger_js_1.logger.error('Failed to connect to PostgreSQL via Prisma:', { error: (0, errorDetails_js_1.getErrorMessage)(error) });
        throw error;
    }
};
exports.connectDb = connectDb;
const disconnectDb = () => exports.prisma.$disconnect().catch(() => undefined);
exports.disconnectDb = disconnectDb;
//# sourceMappingURL=db.js.map