import { z } from "zod";

export const TokenSchema = z.object({
    token: z.string().min(10, {
        message: "Personal Acces token must be at least 10 characters.",
      }),
    apiSource: z.string(),
    description: z.string().nullable(),
})

export type TokenType = z.infer<typeof TokenSchema>