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
  price?: string;
  billingCycle?: "monthly" | "yearly";
  setBillingCycle?: (cycle: "monthly" | "yearly") => void;
}

const PricingTiers = ({ tiers = defaultTiers }) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "yearly",
  );

  return (
    <div className="w-full min-h-[868px] bg-[#1a1b2e] py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm text-purple-400 uppercase font-medium mb-4 tracking-wider">
            PRICED FAIRLY
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Free for new solo users, and
            <br />
            reasonably priced business
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <PricingTier
              key={index}
              {...tier}
              billingCycle={billingCycle}
              setBillingCycle={setBillingCycle}
            />
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
  price,
  billingCycle = "yearly",
  setBillingCycle,
}: PricingTierProps) => {
  return (
    <Card
      className={`relative overflow-hidden flex flex-col h-full transition-all duration-300 hover:scale-105 ${
        highlighted
          ? "bg-gradient-to-br from-[#2a2d5a] to-[#1e2139] border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20"
          : "bg-gradient-to-br from-[#1e2139] to-[#252a47] border border-gray-700/30"
      }`}
    >
      {highlighted && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 pointer-events-none" />
      )}

      <CardHeader className="pb-6 pt-8 relative z-10">
        <div className="text-center">
          <p
            className={`text-xs font-bold mb-3 uppercase tracking-wider ${
              title === "MAX"
                ? "text-purple-400"
                : title === "PLUS"
                  ? "text-blue-400"
                  : "text-gray-400"
            }`}
          >
            {title}
          </p>

          {price && (
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-white mb-2">{price}</h3>

              {/* Billing Toggle for individual cards */}
              {setBillingCycle && (
                <div className="flex justify-center mb-4">
                  <div className="bg-[#1a1d2a] rounded-full p-1 flex">
                    <button
                      onClick={() => setBillingCycle("monthly")}
                      className={`rounded-full px-4 py-1 text-xs transition-all ${
                        billingCycle === "monthly"
                          ? "bg-purple-600 text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setBillingCycle("yearly")}
                      className={`rounded-full px-4 py-1 text-xs transition-all ${
                        billingCycle === "yearly"
                          ? "bg-purple-600 text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      Yearly
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {!price && (
            <h3 className="text-2xl font-bold text-white mb-2">
              {title === "FREE" ? "Free For Everyone" : "Coming Fall 2025!"}
            </h3>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-grow px-8 relative z-10">
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600/20 flex items-center justify-center mr-3 mt-0.5">
                <Check className="w-3 h-3 text-purple-400" />
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-6 pb-8 px-8 relative z-10">
        <Button
          variant={buttonVariant}
          className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
            highlighted
              ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
        >
          {buttonText} {title}
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </CardFooter>
    </Card>
  );
};

const defaultTiers = [
  {
    title: "MAX",
    price: "$200 per user/month",
    features: [
      { text: "Business intelligence dashboard" },
      { text: "platforms and extension automation" },
      { text: "Social media integration" },
      { text: "Secure dashboard access" },
      { text: "Unlimited members" },
    ],
    buttonText: "Get started with",
    buttonVariant: "default" as const,
    highlighted: false,
  },
  {
    title: "PLUS",
    price: "$80 per user/month",
    features: [
      { text: "AI automation" },
      { text: "Local payment methods" },
      { text: "Platform support" },
      { text: "Simulation Support" },
      { text: "2-4 members" },
    ],
    buttonText: "Get started with",
    buttonVariant: "default" as const,
    highlighted: true,
  },
  {
    title: "FREE",
    subtitle: "For Everyone",
    features: [
      { text: "Webpage integration" },
      { text: "General analytics" },
      { text: "reporting" },
      { text: "Chat support" },
      { text: "1 member" },
    ],
    buttonText: "Get started with",
    buttonVariant: "default" as const,
    highlighted: false,
  },
];

export default PricingTiers;
