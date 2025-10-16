import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Home, Package, Baby } from "lucide-react";

interface IndustryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
  borderColor: string;
  shadowColor: string;
  delay: number;
  onClick: () => void;
}

const IndustryCard = ({
  icon,
  title,
  description,
  iconBgColor,
  borderColor,
  shadowColor,
  delay,
  onClick,
}: IndustryCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden border border-border/60 bg-gradient-to-br from-muted/40 via-card to-background/80 transition-all duration-500 ${borderColor} ${shadowColor} animate-fade-in hover:shadow-xl`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-8 relative z-10">
        {/* Icon Container */}
        <div className="mb-6 relative">
          <div
            className={`inline-flex rounded-2xl border-2 border-border/60 p-4 shadow-lg shadow-primary/10 transition-all duration-300 group-hover:rotate-3 group-hover:scale-110 ${iconBgColor}`}
          >
            <div className="relative z-10">{icon}</div>
          </div>
          {/* Glow effect */}
          <div
            className={`absolute inset-0 ${iconBgColor} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
      </CardContent>
    </Card>
  );
};

interface IndustryIntegrationsSectionProps {
  title?: string;
  subtitle?: string;
}

const IndustryIntegrationsSection = ({
  title = "Industry-Specific Platform Integrations",
  subtitle = "Discover our specialized platforms designed to enhance specific industries. We build and sponsor industry-focused solutions that empower professionals and small businesses with data visualization, automation, AI, and advanced features. Our template-driven approach accelerates development while maintaining affordability through tiered pricing systems.",
}: IndustryIntegrationsSectionProps) => {
  const handleIndustryClick = (industry: string) => {
    switch (industry) {
      case "education":
        window.open(
          "https://tempo-deployment-dfa3f0dc-dfe0-4b42.vercel.app/",
          "_blank"
        );
        break;
      case "realestate":
        window.open(
          "https://tempo-deployment-0d4445fa-fe2d-4801.vercel.app/",
          "_blank"
        );
        break;
      case "pregnancy":
        alert("Pregnancy Platform coming soon!");
        break;
      case "services":
        alert("Service Management Platform coming soon!");
        break;
      default:
        break;
    }
  };

  const industries = [
    {
      id: "education",
      icon: <GraduationCap className="h-7 w-7" color="white" strokeWidth={2.5} />,
      title: "Education Platform",
      description:
        "Comprehensive learning management system with student tracking, course management, and analytics for educational institutions.",
      iconBgColor: "bg-green-600",
      borderColor: "hover:border-green-500/50",
      shadowColor: "hover:shadow-green-500/20",
    },
    {
      id: "realestate",
      icon: <Home className="h-7 w-7" color="white" strokeWidth={2.5} />,
      title: "Real Estate Solutions",
      description:
        "Property management, listing automation, client relationship tools, and market analytics for real estate professionals.",
      iconBgColor: "bg-purple-600",
      borderColor: "hover:border-purple-500/50",
      shadowColor: "hover:shadow-purple-500/20",
    },
    {
      id: "services",
      icon: <Package className="h-7 w-7" color="white" strokeWidth={2.5} />,
      title: "Service Management",
      description:
        "End-to-end service delivery platform with scheduling, invoicing, customer management, and performance tracking.",
      iconBgColor: "bg-blue-600",
      borderColor: "hover:border-blue-500/50",
      shadowColor: "hover:shadow-blue-500/20",
    },
    {
      id: "pregnancy",
      icon: <Baby className="h-7 w-7" color="white" strokeWidth={2.5} />,
      title: "Pregnancy Platform",
      description:
        "Holistic pregnancy journey tracker with health monitoring, appointment scheduling, and community support features.",
      iconBgColor: "bg-red-600",
      borderColor: "hover:border-red-500/50",
      shadowColor: "hover:shadow-red-500/20",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background py-20 md:py-32 dark:from-[#0a0a0f] dark:via-[#121219] dark:to-[#0a0a0f]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent dark:from-purple-900/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-400/20 via-transparent to-transparent dark:from-blue-900/25"></div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-4 border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm text-primary"
          >
            Industry Solutions
          </Badge>
          <h2 className="mb-6 text-3xl font-bold leading-tight text-foreground md:text-5xl">
            {title}
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        </div>

        {/* Industries Grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, index) => (
            <IndustryCard
              key={industry.id}
              icon={industry.icon}
              title={industry.title}
              description={industry.description}
              iconBgColor={industry.iconBgColor}
              borderColor={industry.borderColor}
              shadowColor={industry.shadowColor}
              delay={index * 100}
              onClick={() => handleIndustryClick(industry.id)}
            />
          ))}
        </div>

        {/* Bottom CTA or additional info */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Tailored solutions for diverse industries and business needs
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndustryIntegrationsSection;
