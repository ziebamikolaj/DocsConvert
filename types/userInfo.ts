import { z } from "zod";

export const userInfo = z.object({
  email: z.string(),
  subscriptionTier: z.union([z.literal("FREE"), z.literal("PRO")]),
});
export type UserInfo = z.infer<typeof userInfo>;
