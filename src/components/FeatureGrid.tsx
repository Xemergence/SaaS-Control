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
  iconBgColor: string;
}

const Feature = ({ icon, title, description, iconBgColor }: FeatureProps) => {
  return (
    <Card className="flex flex-col items-center text-center p-8 bg-gradient-to-br from-[#1e2139] to-[#2a2f4a] border border-gray-700/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div
        className={`rounded-full p-4 mb-6 ${iconBgColor} border-2 border-gray-800 shadow-lg bg-gradient-to-br from-current to-transparent relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
        <div className="relative z-10">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
      <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
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
      icon: <Target className="h-6 w-6 text-white" />,
      title: "Stay Focused",
      description:
        "Centralize new issues and ideas in one place. Concentrate on the essentials while eliminating distractions from your workflow.",
      iconBgColor: "bg-green-600",
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Save Time",
      description:
        "Define and organize complex projects with our comprehensive dashboard tools, streamlining your workflow and boosting productivity.",
      iconBgColor: "bg-red-500",
    },
    {
      icon: <Brain className="h-6 w-6 text-white" />,
      title: "AI-Powered Co-Creation",
      description:
        "Keep work flowing seamlessly with our AI-powered analytics and insights, eliminating heavy file management and accelerating decision-making.",
      iconBgColor: "bg-purple-600",
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Monitor & Engage Users",
      description:
        "Track website traffic, revenue metrics, operating costs, and database usage with real-time updates and comprehensive analytics.",
      iconBgColor: "bg-green-600",
    },
    {
      icon: <FileText className="h-6 w-6 text-white" />,
      title: "Unified Documentation Hub",
      description:
        "Consolidate all your business metrics, documentation, and insights in one centralized location for seamless access and management.",
      iconBgColor: "bg-purple-600",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      title: "Stay Competitive",
      description:
        "Maintain your competitive edge with cutting-edge tools, real-time analytics, and actionable insights that drive business growth.",
      iconBgColor: "bg-teal-600",
    },
  ],
}: FeatureGridProps) => {
  return (
    <section className="w-full py-16 bg-gradient-to-br from-[#1a1e2d] via-[#2c3142] to-[#1e2139]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconBgColor={feature.iconBgColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
