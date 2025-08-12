import React from "react";
import {
  Target,
  Clock,
  Brain,
  Users,
  FileText,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => {
  return (
    <Card className="flex flex-col items-center text-center p-8 bg-slate-900 border-slate-800">
      <div
        className="rounded-full p-3 mb-4 bg-opacity-20"
        style={{ backgroundColor: "rgba(var(--feature-icon-color), 0.2)" }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </Card>
  );
};

interface FeatureGridProps {
  title?: string;
  features?: FeatureProps[];
}

const FeatureGrid = ({
  title = "Cutting-Edge Features with No Compromises at 100x Less Cost",
  features = [
    {
      icon: (
        <Target
          className="h-6 w-6 text-green-500"
          style={
            { "--feature-icon-color": "34, 197, 94" } as React.CSSProperties
          }
        />
      ),
      title: "Stay Focused",
      description:
        "Centralize new issues and ideas in one place. Concentrate on the essentials while eliminating distractions from your workflow.",
    },
    {
      icon: (
        <Clock
          className="h-6 w-6 text-red-400"
          style={
            { "--feature-icon-color": "248, 113, 113" } as React.CSSProperties
          }
        />
      ),
      title: "Save Time",
      description:
        "Define and organize complex projects with our comprehensive dashboard tools, streamlining your workflow and boosting productivity.",
    },
    {
      icon: (
        <Brain
          className="h-6 w-6 text-purple-500"
          style={
            { "--feature-icon-color": "168, 85, 247" } as React.CSSProperties
          }
        />
      ),
      title: "AI-Powered Co-Creation",
      description:
        "Keep work flowing seamlessly with our AI-powered analytics and insights, eliminating heavy file management and accelerating decision-making.",
    },
    {
      icon: (
        <Users
          className="h-6 w-6 text-green-500"
          style={
            { "--feature-icon-color": "34, 197, 94" } as React.CSSProperties
          }
        />
      ),
      title: "Monitor & Engage Users",
      description:
        "Track website traffic, revenue metrics, operating costs, and database usage with real-time updates and comprehensive analytics.",
    },
    {
      icon: (
        <FileText
          className="h-6 w-6 text-purple-500"
          style={
            { "--feature-icon-color": "168, 85, 247" } as React.CSSProperties
          }
        />
      ),
      title: "Unified Documentation Hub",
      description:
        "Consolidate all your business metrics, documentation, and insights in one centralized location for seamless access and management.",
    },
    {
      icon: (
        <TrendingUp
          className="h-6 w-6 text-teal-500"
          style={
            { "--feature-icon-color": "20, 184, 166" } as React.CSSProperties
          }
        />
      ),
      title: "Stay Competitive",
      description:
        "Maintain your competitive edge with cutting-edge tools, real-time analytics, and actionable insights that drive business growth.",
    },
  ],
}: FeatureGridProps) => {
  return (
    <section className="w-full py-16 bg-slate-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
