import { z } from "zod"

export const signinSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const signupSchema = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string().email()
})

// export const messageSchema = z.object({
    
// })