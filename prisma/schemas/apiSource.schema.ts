import { z } from "zod";

export const apiSource = z.object({
    name: z.string(),
    description: z.string().nullable(),
})

export type TokenType = z.infer<typeof apiSource>