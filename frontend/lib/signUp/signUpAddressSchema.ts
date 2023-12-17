import { z } from "zod";

export const signUpAddressSchema = z.object({
    cep: z.string().min(1).readonly(),
    address: z.string().min(1).readonly(),
    district: z.string().min(1).readonly(),
    city: z.string().min(1).readonly(),
    state: z.string().min(1).readonly(),
}).readonly();
