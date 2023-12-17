import { z } from "zod";

export const signUpInfoSchema = z.object({
    cnpj: z.string().min(1).readonly(),
    name: z.string().min(1).readonly(),
    telephone: z.string().min(1).readonly(),
}).readonly();
