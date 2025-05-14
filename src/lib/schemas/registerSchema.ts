import { z } from 'zod';


export const registerSchema = z.object({
    username: z.string().min(4),
    email: z.string().email({ message: "Invalid Email"}),
    password: z.string().min(6, { message: "Password must be 6 or more characters long"}),
});

export type RegisterSchema = z.infer<typeof registerSchema>;