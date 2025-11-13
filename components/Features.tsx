import type { Feature } from "@/types/feature";
import React from "react";
import { FaCog, FaSignInAlt, FaUpload } from "react-icons/fa";

const features: Feature[] = [
  {
    id: 1,
    icon: "FaUpload",
    title: "File Upload",
    description:
      "Easily upload your documents in .docx, .doc, .pdf, and .odt formats using our drag-and-drop interface.",
  },
  {
    id: 2,
    icon: "FaCog",
    title: "Conversion",
    description:
      "Convert your documents to HTML, HTL, and XML formats with high-quality results and preserved formatting.",
  },
  {
    id: 3,
    icon: "FaSignInAlt",
    title: "Subscription",
    description:
      "Enjoy our free tier with up to 10 page conversions, or upgrade to our paid tier for additional conversions.",
  },
];
interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => (
  <div className="space-y-4 rounded-lg bg-muted p-6 shadow-sm">
    {icon}
    <h3 className="text-xl font-bold">{title}</h3>
    <p>{description}</p>
  </div>
);

const Icons = {
  FaCog,
  FaSignInAlt,
  FaUpload,
};

export const Features = () => (
  <section className="py-20">
    <div className="container mx-auto max-w-6xl px-4 md:px-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const IconComponent = Icons[feature.icon as keyof typeof Icons];
          return (
            <Feature
              key={feature.id}
              icon={<IconComponent className="h-8 w-8 text-primary" />}
              title={feature.title}
              description={feature.description}
            />
          );
        })}
      </div>
    </div>
  </section>
);
