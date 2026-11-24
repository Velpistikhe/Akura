import { z } from 'zod';
export declare const registerSchema: z.ZodEffects<z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    passwordConfirmation: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>>;
    telp: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    passwordConfirmation: string;
    firstName: string;
    lastName: string;
    email?: string | null | undefined;
    telp?: string | null | undefined;
}, {
    username: string;
    password: string;
    passwordConfirmation: string;
    firstName: string;
    lastName: string;
    email?: string | null | undefined;
    telp?: string | null | undefined;
}>, {
    username: string;
    password: string;
    passwordConfirmation: string;
    firstName: string;
    lastName: string;
    email?: string | null | undefined;
    telp?: string | null | undefined;
}, {
    username: string;
    password: string;
    passwordConfirmation: string;
    firstName: string;
    lastName: string;
    email?: string | null | undefined;
    telp?: string | null | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const updateProfileSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>>;
    telp: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    email?: string | null | undefined;
    telp?: string | null | undefined;
}, {
    firstName: string;
    lastName: string;
    email?: string | null | undefined;
    telp?: string | null | undefined;
}>;
export declare const changePasswordSchema: z.ZodEffects<z.ZodObject<{
    oldPassword: z.ZodString;
    newPassword: z.ZodString;
    newPasswordConfirmation: z.ZodString;
}, "strip", z.ZodTypeAny, {
    oldPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
}, {
    oldPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
}>, {
    oldPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
}, {
    oldPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
}>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
