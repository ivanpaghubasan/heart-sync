import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid Email"}),
    password: z.string().min(6, { message: "Password must be 6 or more characters long"}),
});

export type LoginSchema = z.infer<typeof loginSchema>;