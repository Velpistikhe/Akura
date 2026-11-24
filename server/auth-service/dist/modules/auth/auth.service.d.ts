import { AuthResult, AuthTokens, UserSanitized } from '../../types/auth.types.js';
import { type SecurityAuditContext } from '../../utils/userHistory.js';
declare class AuthService {
    register(username: string, password: string, firstName: string, lastName: string, email?: string | null, telp?: string | null, context?: SecurityAuditContext): Promise<void>;
    login(username: string, password: string, context?: SecurityAuditContext): Promise<AuthResult>;
    refreshToken(refreshToken: string, context?: SecurityAuditContext): Promise<AuthTokens>;
    logout(refreshToken?: string, context?: SecurityAuditContext): Promise<void>;
    updateProfile(userId: string, firstName: string, lastName: string, email?: string | null, telp?: string | null): Promise<UserSanitized>;
    changePassword(userId: string, oldPassword: string, newPassword: string): Promise<UserSanitized>;
    getProfile(userId: string): Promise<UserSanitized>;
}
export declare const authService: AuthService;
export {};
