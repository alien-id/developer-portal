import { z } from "zod";

export const formSchema = z.object({
    domainName: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    domaneUrl: z.string().url({
        message: "Please provide proper URL like http://example.com"
    }),
})