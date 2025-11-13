import { z } from "zod";

export const pricingPlan = z.object({
  id: z.number(),
  name: z.string(),
  price: z.string(),
  period: z.string(),
  features: z.array(z.string()),
  buttonText: z.string(),
});
export type PricingPlan = z.infer<typeof pricingPlan>;
