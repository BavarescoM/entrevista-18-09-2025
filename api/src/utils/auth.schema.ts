import { z } from "zod";

export const signupSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export const loginSchema = z.object({  
    email: z.string(),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});