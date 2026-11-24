"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.updateProfileSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const nullableEmail = zod_1.z.string().trim().email('Invalid email address').max(255).transform(value => value.toLowerCase()).nullable().optional();
const nullableTelp = zod_1.z.string().trim().min(1).max(50).nullable().optional();
exports.registerSchema = zod_1.z.object({
    username: zod_1.z.string()
        .min(3, 'Username must be at least 3 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain alphanumeric characters and underscores'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    passwordConfirmation: zod_1.z.string().min(1, 'Password confirmation is required'),
    firstName: zod_1.z.string().trim().min(1, 'First name is required'),
    lastName: zod_1.z.string().trim().min(1, 'Last name is required'),
    email: nullableEmail,
    telp: nullableTelp,
}).refine((value) => value.password === value.passwordConfirmation, {
    message: 'Password dan konfirmasi password berbeda',
    path: ['passwordConfirmation'],
});
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, 'Username is required'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
exports.updateProfileSchema = zod_1.z.object({
    firstName: zod_1.z.string().trim().min(1, 'First name is required'),
    lastName: zod_1.z.string().trim().min(1, 'Last name is required'),
    email: nullableEmail,
    telp: nullableTelp,
});
exports.changePasswordSchema = zod_1.z.object({
    oldPassword: zod_1.z.string().min(1, 'Current password is required'),
    newPassword: zod_1.z.string().min(6, 'New password must be at least 6 characters'),
    newPasswordConfirmation: zod_1.z.string().min(1, 'New password confirmation is required'),
}).refine((value) => value.newPassword === value.newPasswordConfirmation, {
    message: 'Password baru dan konfirmasi password baru berbeda',
    path: ['newPasswordConfirmation'],
});
//# sourceMappingURL=auth.schemas.js.map