import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

interface PricingFeature {
  text: string;
}

interface PricingTierProps {
  title: string;
  subtitle?: string;
  features: PricingFeature[];
  buttonText: string;
  buttonVariant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  highlighted?: boolean;
  comingSoon?: boolean;
}

const PricingTiers = ({ tiers = defaultTiers }) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  return (
    <div className="w-full bg-[#121420] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm text-purple-400 uppercase font-medium mb-2">
            PRICED FAIRLY
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Free for Solo Users, Affordable for Growing Businesses
          </h2>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-[#1e1f2e] rounded-full p-1 flex">
            <Toggle
              pressed={billingCycle === "monthly"}
              onPressedChange={() => setBillingCycle("monthly")}
              className={`rounded-full px-6 py-2 ${billingCycle === "monthly" ? "bg-purple-600 text-white" : "text-gray-400"}`}
            >
              Monthly
            </Toggle>
            <Toggle
              pressed={billingCycle === "yearly"}
              onPressedChange={() => setBillingCycle("yearly")}
              className={`rounded-full px-6 py-2 ${billingCycle === "yearly" ? "bg-purple-600 text-white" : "text-gray-400"}`}
            >
              Yearly
            </Toggle>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, index) => (
            <PricingTier key={index} {...tier} />
          ))}
        </div>
      </div>
    </div>
  );
};

const PricingTier = ({
  title,
  subtitle = "For Everyone",
  features,
  buttonText,
  buttonVariant = "default",
  highlighted = false,
  comingSoon = true,
}: PricingTierProps) => {
  return (
    <Card
      className={`bg-[#1e1f2e] border-0 text-white rounded-lg overflow-hidden flex flex-col h-full ${highlighted ? "ring-2 ring-purple-500" : ""}`}
    >
      <CardHeader className="pb-2">
        <div className="text-center">
          <p
            className={`text-sm font-medium mb-1 ${title === "MAX" ? "text-purple-400" : title === "PLUS" ? "text-blue-400" : "text-blue-500"}`}
          >
            {title}
          </p>
          <h3 className="text-xl font-bold mb-1">
            {comingSoon ? "Coming Fall 2025!" : "Available Now"}
          </h3>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4 mt-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-purple-500 mr-2">
                <Check size={18} />
              </div>
              <p className="text-sm text-gray-300">{feature.text}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Button
          variant={buttonVariant}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2"
        >
          {buttonText}{" "}
          {title === "MAX" ? "MAX" : title === "PLUS" ? "Plus" : "FREE"}{" "}
          {buttonText.includes("Get") && "→"}
        </Button>
      </CardFooter>
    </Card>
  );
};

const defaultTiers = [
  {
    title: "MAX",
    features: [
      { text: "Business intelligence dashboard" },
      { text: "Platforms and extension automation" },
      { text: "Social media integration" },
      { text: "Secure dashboard access" },
      { text: "Unlimited members" },
    ],
    buttonText: "Get started with",
    buttonVariant: "default" as const,
    highlighted: true,
  },
  {
    title: "PLUS",
    features: [
      { text: "AI automation" },
      { text: "Local payment methods" },
      { text: "Platform support" },
      { text: "Simulation Support" },
      { text: "2-4 members" },
    ],
    buttonText: "Get started with",
    buttonVariant: "default" as const,
  },
  {
    title: "FREE",
    subtitle: "For Everyone",
    features: [
      { text: "Webpage integration" },
      { text: "General analytics" },
      { text: "Reporting" },
      { text: "Chat support" },
      { text: "1 member" },
    ],
    buttonText: "Get started with",
    buttonVariant: "default" as const,
  },
];

export default PricingTiers;
