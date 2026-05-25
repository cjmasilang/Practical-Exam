import { z } from 'zod';

export const userSchema = z.object({
    name: z.string().min(1, 'Name is required').max(255),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters').nullable().optional(),
    roles: z.array(z.string()).min(1, 'At least one role is required')
});

export type UserFormValues = z.infer<typeof userSchema>;
