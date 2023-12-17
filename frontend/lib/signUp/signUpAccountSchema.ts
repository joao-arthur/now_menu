import { z } from "zod";

export const signUpAccountSchema = z.object({
    email: z.string().email().min(1).readonly(),
    password: z.string().min(1).readonly(),
}).readonly();
