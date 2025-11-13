import type { PricingPlan } from "@/types/pricingPlan";
import React from "react";
import { FaCheck } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const plans: PricingPlan[] = [
  {
    id: 1,
    name: "Free",
    price: "$0",
    period: "per month",
    features: [
      "10 page conversions",
      "HTML, HTL, and XML formats",
      "Customizable outputs",
      "Preview conversion",
    ],
    buttonText: "Get Started",
  },
  {
    id: 2,
    name: "Pro",
    price: "$9",
    period: "per month",
    features: [
      "Unlimited page conversions",
      "HTML, HTL, and XML formats",
      "Customizable outputs",
      "Preview conversion",
      "Usage tracking",
    ],
    buttonText: "Get Started",
  },
  {
    id: 3,
    name: "Enterprise",
    price: "Contact us",
    period: "for pricing",
    features: [
      "Customized plan",
      "Dedicated support",
      "Advanced analytics",
      "Custom integrations",
    ],
    buttonText: "Contact Sales",
  },
];

interface PlanProps {
  name: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
}

const Plan = ({ name, price, period, features, buttonText }: PlanProps) => (
  <Card className="flex flex-wrap content-between justify-center space-y-4 rounded-lg bg-muted p-6 shadow-sm">
    <div className="space-y-2">
      <h3 className="text-2xl font-bold">{name}</h3>
      <p className="text-4xl font-bold">{price}</p>
      <p className="text-lg font-medium">{period}</p>
    </div>
    <ul className="w-full space-y-2 text-left">
      {features.map((feature, index) => (
        <li key={"temp_" + index} className="flex items-center gap-2">
          <FaCheck className="h-5 w-5 text-primary" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <Button>{buttonText}</Button>
  </Card>
);

export const Pricing = () => (
  <section className="py-20">
    <div className="container mx-auto max-w-6xl px-4 md:px-6">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Pricing that fits your needs
        </h2>
        <p className="text-lg">
          Choose the plan that works best for you and your business.
        </p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Plan key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </div>
  </section>
);
