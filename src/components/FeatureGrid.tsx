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
import { cn } from "@/lib/utils";

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
      className={cn(
        "group relative overflow-hidden border border-border/60 transition-all duration-500 animate-fade-in hover:-translate-y-1",
        "bg-white/85 shadow-[0_28px_80px_-60px_rgba(73,56,149,0.35)] backdrop-blur-xl hover:border-primary/40 hover:shadow-primary/25",
        "dark:bg-gradient-to-br dark:from-[#1a1e2d] dark:to-[#2a2f4a] dark:border-slate-700/40 dark:hover:border-purple-500/50 dark:hover:shadow-purple-500/20"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-8 relative z-10">
        {/* Icon Container */}
        <div className="mb-6 relative">
          <div
            className={cn(
              "inline-flex rounded-2xl border-2 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
              "border-white/60",
              "dark:border-gray-800/50",
              iconBgColor
            )}
          >
            <div className="relative z-10">{icon}</div>
          </div>
          {/* Glow effect */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 -z-10 blur-xl transition-opacity duration-500",
              "opacity-0 group-hover:opacity-30",
              iconBgColor
            )}
          ></div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-3 text-foreground transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
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
    <section className="relative overflow-hidden py-20 md:py-32">
      <div
        className="absolute inset-0 -z-10 opacity-95 transition-opacity duration-500 dark:hidden"
        style={{
          backgroundColor: "#fefcff",
          backgroundImage:
            "radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%), radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 hidden overflow-hidden dark:block" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(110,114,255,0.35),transparent_60%),radial-gradient(circle_at_85%_25%,rgba(232,74,248,0.32),transparent_62%),radial-gradient(circle_at_50%_80%,rgba(14,116,212,0.25),transparent_68%),linear-gradient(160deg,#040312_0%,#0a0f2a_45%,#01000f_100%)]" />
      </div>
      <div className="absolute -top-28 left-1/5 -z-10 h-56 w-56 rounded-full bg-primary/20 blur-[160px] dark:bg-primary/40" />
      <div className="absolute -bottom-36 right-1/4 -z-10 h-64 w-64 rounded-full bg-sky-400/25 blur-[140px] dark:bg-fuchsia-400/35" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-4 border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary"
          >
            Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-foreground">
            {title}
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Designed for innovators, small teams, and growing businesses
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
