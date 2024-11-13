import { z } from "zod";

export const menuItemCreate = z.object({
    name: z.string().min(2).max(50).readonly(),
    description: z.string().optional().readonly(),
    prepareTime: z.number().readonly(),
    price: z.number().readonly(),
}).readonly();

export const menuItemUpdate = z.object({
    name: z.string().min(2).max(50).readonly(),
    description: z.string().optional().readonly(),
    prepareTime: z.number().readonly(),
    price: z.number().readonly(),
}).readonly();
