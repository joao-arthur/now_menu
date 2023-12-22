import { z } from "zod";

export const menuItemRegisterSchema = z.object({
    name: z.string().min(1).readonly(),
    description: z.string().min(1).readonly(),
    prepareHours: z.number().readonly(),
    prepareMinutes: z.number().readonly(),
    prepareSeconds: z.number().readonly(),
    price: z.string().min(1).readonly(),
}).readonly();
