import { z } from "zod";

export const formSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().optional(),
});

export type formSchemaType = z.infer<typeof formSchema>;
