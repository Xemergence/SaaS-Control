import React from "react";
import {
  Target,
  Clock,
  Brain,
  Users,
  FileText,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
  delay: number;
}

const Feature = ({ icon, title, description, iconBgColor, delay }: FeatureProps) => {
  return (
    <Card 
      className="group relative overflow-hidden bg-gradient-to-br from-[#1a1e2d] to-[#2a2f4a] border-gray-700/30 hover:border-purple-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-8 relative z-10">
        {/* Icon Container */}
        <div className="mb-6 relative">
          <div
            className={`inline-flex rounded-2xl p-4 ${iconBgColor} border-2 border-gray-800/50 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
          >
            <div className="relative z-10">{icon}</div>
          </div>
          {/* Glow effect */}
          <div className={`absolute inset-0 ${iconBgColor} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-300 leading-relaxed">
          {description}
        </p>

        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </CardContent>
    </Card>
  );
};

interface FeatureGridProps {
  title?: string;
  subtitle?: string;
  features?: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
    iconBgColor: string;
  }>;
}

const FeatureGrid = ({
  title = "Cutting-Edge Features with No Compromises at 100x Less Cost",
  subtitle = "Transform your business operations with our comprehensive suite of AI-powered tools",
  features = [
    {
      icon: <Target className="h-7 w-7 text-white" />,
      title: "Stay Focused",
      description:
        "Centralize new issues and ideas in one place. Concentrate on the essentials while eliminating distractions from your workflow.",
      iconBgColor: "bg-green-600",
    },
    {
      icon: <Clock className="h-7 w-7 text-white" />,
      title: "Save Time",
      description:
        "Define and organize complex projects with our comprehensive dashboard tools, streamlining your workflow and boosting productivity.",
      iconBgColor: "bg-red-500",
    },
    {
      icon: <Brain className="h-7 w-7 text-white" />,
      title: "AI-Powered Co-Creation",
      description:
        "Keep work flowing seamlessly with our AI-powered analytics and insights, eliminating heavy file management and accelerating decision-making.",
      iconBgColor: "bg-purple-600",
    },
    {
      icon: <Users className="h-7 w-7 text-white" />,
      title: "Monitor & Engage Users",
      description:
        "Track website traffic, revenue metrics, operating costs, and database usage with real-time updates and comprehensive analytics.",
      iconBgColor: "bg-green-600",
    },
    {
      icon: <FileText className="h-7 w-7 text-white" />,
      title: "Unified Documentation Hub",
      description:
        "Consolidate all your business metrics, documentation, and insights in one centralized location for seamless access and management.",
      iconBgColor: "bg-purple-600",
    },
    {
      icon: <TrendingUp className="h-7 w-7 text-white" />,
      title: "Stay Competitive",
      description:
        "Maintain your competitive edge with cutting-edge tools, real-time analytics, and actionable insights that drive business growth.",
      iconBgColor: "bg-teal-600",
    },
  ],
}: FeatureGridProps) => {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-br from-[#0a0a0f] via-[#121219] to-[#0a0a0f] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge 
            variant="outline" 
            className="mb-4 bg-purple-900/30 border-purple-500/50 text-purple-400 px-4 py-1.5 text-sm"
          >
            Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
            {title}
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconBgColor={feature.iconBgColor}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Bottom CTA or additional info */}
        <div className="text-center mt-16">
          <p className="text-gray-400 text-sm">
            Designed for innovators, small teams, and growing businesses
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;