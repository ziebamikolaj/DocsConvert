import { z } from "zod";

export const feature = z.object({
  id: z.number(),
  icon: z.string(),
  title: z.string(),
  description: z.string(),
});

export type Feature = z.infer<typeof feature>;
