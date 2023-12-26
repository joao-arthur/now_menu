import { z } from "zod";

const create = z.object({
    name: z.string().min(2).max(50).readonly(),
    description: z.string().optional().readonly(),
    prepareTime: z.number().readonly(),
    price: z.number().readonly(),
}).readonly();

const update = z.object({
    name: z.string().min(2).max(50).readonly(),
    description: z.string().optional().readonly(),
    prepareTime: z.number().readonly(),
    price: z.number().readonly(),
}).readonly();

export const menuItemSchema = {
    create,
    update,
} as const;
