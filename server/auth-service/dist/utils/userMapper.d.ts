import { User } from '@prisma/client';
import { UserSanitized } from '../types/auth.types.js';
export declare const sanitizeUser: (user: User) => UserSanitized;
