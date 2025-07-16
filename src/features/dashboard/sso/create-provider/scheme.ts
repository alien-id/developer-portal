import { z } from "zod";

export const formSchema = z.object({
    providerName: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    providerDomainUrl: z.string().url({
        message: "Please provide proper URL like http://example.com"
    }),
})