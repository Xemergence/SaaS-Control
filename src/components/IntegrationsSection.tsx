import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  MessageSquare,
  BarChart3,
  Brain,
  Bell,
  Settings,
  Shield,
  Zap,
  Database,
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  shadowColor: string;
}

const integrations: Integration[] = [
  {
    id: "scheduling",
    name: "Scheduling",
    icon: <Calendar className="h-9 w-9" />,
    color: "text-green-400",
    hoverColor: "hover:border-green-500/50",
    shadowColor: "hover:shadow-green-500/20",
  },
  {
    id: "ai-chat",
    name: "AI Chat",
    icon: <MessageSquare className="h-9 w-9" />,
    color: "text-blue-400",
    hoverColor: "hover:border-blue-500/50",
    shadowColor: "hover:shadow-blue-500/20",
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: <BarChart3 className="h-9 w-9" />,
    color: "text-purple-400",
    hoverColor: "hover:border-purple-500/50",
    shadowColor: "hover:shadow-purple-500/20",
  },
  {
    id: "ai-assistant",
    name: "AI Assistant",
    icon: <Brain className="h-9 w-9" />,
    color: "text-red-400",
    hoverColor: "hover:border-red-500/50",
    shadowColor: "hover:shadow-red-500/20",
  },
  {
    id: "notifications",
    name: "Notifications",
    icon: <Bell className="h-9 w-9" />,
    color: "text-yellow-400",
    hoverColor: "hover:border-yellow-500/50",
    shadowColor: "hover:shadow-yellow-500/20",
  },
  {
    id: "configuration",
    name: "Configuration",
    icon: <Settings className="h-9 w-9" />,
    color: "text-purple-400",
    hoverColor: "hover:border-purple-500/50",
    shadowColor: "hover:shadow-purple-500/20",
  },
  {
    id: "security",
    name: "Security",
    icon: <Shield className="h-9 w-9" />,
    color: "text-green-400",
    hoverColor: "hover:border-green-500/50",
    shadowColor: "hover:shadow-green-500/20",
  },
  {
    id: "automation",
    name: "Automation",
    icon: <Zap className="h-9 w-9" />,
    color: "text-blue-400",
    hoverColor: "hover:border-blue-500/50",
    shadowColor: "hover:shadow-blue-500/20",
  },
  {
    id: "data-management",
    name: "Data Management",
    icon: <Database className="h-9 w-9" />,
    color: "text-orange-400",
    hoverColor: "hover:border-orange-500/50",
    shadowColor: "hover:shadow-orange-500/20",
  },
];

export default function IntegrationsSection() {
  return (
    <section className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6">
            <Badge
              variant="outline"
              className="mb-2 bg-purple-900/30 border-purple-500/50 text-purple-400 px-3 py-1"
            >
              Integrations
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Your Favorite AI Tools, Integrated
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              xEmergence seamlessly integrates with the tools you already love,
              enabling smooth transitions across your work processes and
              maximizing operational efficiency.
            </p>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-semibold text-white">
                Centralized Control Tower
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Our platform serves as a unified control tower, powered by
                advanced AI technology, designed to transform data from your
                digital components into actionable business intelligence. By
                centralizing all your tools and platforms under one intelligent
                system, we empower small businesses, individuals, and teams with
                seamless integration, real-time insights, and automated
                workflows.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Access our comprehensive suite of AI-powered tools designed to
                streamline operations, from intelligent scheduling and analytics
                to automated notifications and security management. Plus,
                explore our array of US-designed and manufactured 3D products to
                enhance your physical business presence.
              </p>
            </div>
          </div>

          {/* Right Side - 3x3 Grid of Tools with Animation */}
          <div className="flex justify-center lg:justify-end">
            <div className="grid grid-cols-3 gap-4 max-w-md">
              {integrations.map((integration, index) => (
                <Card
                  key={integration.id}
                  className={`bg-gradient-to-br from-[#1a1e2d] to-[#2a2f4a] border-gray-700/30 ${integration.hoverColor} hover:shadow-lg ${integration.shadowColor} transition-all duration-300 hover:scale-105 animate-fade-in overflow-hidden group`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center h-32 w-32">
                    <div
                      className={`${integration.color} transition-transform duration-300 group-hover:scale-110`}
                    >
                      {integration.icon}
                    </div>
                    <span className="text-white text-xs font-medium mt-3">
                      {integration.name}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
