import { z } from "zod";

const general = z.object({
    cnpj: z.string().length(14).readonly(),
    name: z.string().min(2).max(200).readonly(),
    telephone: z.string().readonly(),
}).readonly();

const address = z.object({
    state: z.string().min(2).max(100).readonly(),
    city: z.string().min(2).max(100).readonly(),
    district: z.string().min(2).max(100).readonly(),
    address: z.string().min(1).max(200).readonly(),
    cep: z.string().length(8).readonly(),
}).readonly();

const login = z.object({
    email: z.string().min(2).max(100).readonly(),
    password: z.string().min(6).max(100).readonly(),
}).readonly();

export const accountSchema = {
    address,
    general,
    login,
} as const;
