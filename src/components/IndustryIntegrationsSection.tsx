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
      className={`group relative overflow-hidden bg-gradient-to-br from-[#1a1e2d] to-[#2a2f4a] border-gray-700/30 ${borderColor} hover:shadow-xl ${shadowColor} transition-all duration-500 cursor-pointer animate-fade-in`}
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
          <div
            className={`absolute inset-0 ${iconBgColor} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
          ></div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-300 leading-relaxed">{description}</p>

        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
      icon: <GraduationCap className="h-7 w-7 text-white" />,
      title: "Education Platform",
      description:
        "Comprehensive learning management system with student tracking, course management, and analytics for educational institutions.",
      iconBgColor: "bg-green-600",
      borderColor: "hover:border-green-500/50",
      shadowColor: "hover:shadow-green-500/20",
    },
    {
      id: "realestate",
      icon: <Home className="h-7 w-7 text-white" />,
      title: "Real Estate Solutions",
      description:
        "Property management, listing automation, client relationship tools, and market analytics for real estate professionals.",
      iconBgColor: "bg-purple-600",
      borderColor: "hover:border-purple-500/50",
      shadowColor: "hover:shadow-purple-500/20",
    },
    {
      id: "services",
      icon: <Package className="h-7 w-7 text-white" />,
      title: "Service Management",
      description:
        "End-to-end service delivery platform with scheduling, invoicing, customer management, and performance tracking.",
      iconBgColor: "bg-blue-600",
      borderColor: "hover:border-blue-500/50",
      shadowColor: "hover:shadow-blue-500/20",
    },
    {
      id: "pregnancy",
      icon: <Baby className="h-7 w-7 text-white" />,
      title: "Pregnancy Platform",
      description:
        "Holistic pregnancy journey tracker with health monitoring, appointment scheduling, and community support features.",
      iconBgColor: "bg-red-600",
      borderColor: "hover:border-red-500/50",
      shadowColor: "hover:shadow-red-500/20",
    },
  ];

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
            Industry Solutions
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
            {title}
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">{subtitle}</p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
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
        <div className="text-center mt-16">
          <p className="text-gray-400 text-sm">
            Tailored solutions for diverse industries and business needs
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndustryIntegrationsSection;
