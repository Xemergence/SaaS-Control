import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthDialog from "@/components/auth/AuthDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import FeatureGrid from "@/components/FeatureGrid";
import PricingTiers from "@/components/PricingTiers";
import TeamSection from "@/components/TeamSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import IndustryIntegrationsSection from "@/components/IndustryIntegrationsSection";
import {
  ArrowRight,
  Infinity,
  Clock,
  Brain,
  Users,
  FileText,
  BarChart3,
  Calendar,
  MessageSquare,
  Settings,
  Shield,
  Zap,
  Database,
  ShoppingCart,
  Grid,
  Menu,
  X,
} from "lucide-react";

// Helper to create Supabase Image URLs with robust fallbacks
const sbObjectUrl = (path: string) => {
  const base = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const clean = encodeURI(path.replace(/^\/+/, ""));
  if (!base) return `/${clean}`;
  return `${base.replace(/\/$/, "")}/storage/v1/object/public/site-assets/${clean}`;
};

const sbImage = (path: string, width?: number, quality?: number) => {
  const base = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const clean = encodeURI(path.replace(/^\/+/, ""));
  if (!base) return `/${clean}`;
  // Prefer render endpoint (supports transformations) when possible
  if (width || quality) {
    const q: string[] = [];
    if (width) q.push(`width=${width}`);
    if (quality) q.push(`quality=${quality}`);
    return `${base.replace(/\/$/, "")}/storage/v1/render/image/public/site-assets/${clean}${q.length ? `?${q.join("&")}` : ""}`;
  }
  return sbObjectUrl(path);
};

// Generic image error fallback: try object URL if render fails, then remote placeholder
const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const t = e.currentTarget;
  const fallback = t.getAttribute("data-fallback");
  if (fallback && t.src !== fallback) {
    t.src = fallback;
    t.removeAttribute("data-fallback");
    return;
  }
  t.src =
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=60";
};

interface TeamMember {
  id: string;
  name: string;
  title: string;
  description: string;
  fullDescription: string;
  linkedinAbout: string;
}

const HomePage = () => {
  const [selectedTeamMember, setSelectedTeamMember] = useState<string | null>(
    "jether",
  );

  const teamMembers: TeamMember[] = [
    {
      id: "jether",
      name: "Jether Panton",
      title: "Strategy, PMO, AI Integration & Cross-domain Prototyping",
      description:
        "Project creator focusing on PMO, AI integration, cross-domain prototyping, and emerging technologies.",
      fullDescription:
        "Strategic technology leader specializing in PMO, AI integration, and cross-domain prototyping. Expert in blockchain research, emerging technologies, and managing complex technology initiatives that drive digital transformation and innovation.",
      linkedinAbout:
        "Experienced technology leader with a passion for innovation and digital transformation. Specializing in project management, AI integration, and cross-domain prototyping to solve complex business challenges. Dedicated to leveraging emerging technologies to create sustainable, scalable solutions that drive business growth and operational excellence.",
    },
    {
      id: "sebastian",
      name: "Sebastian Vissego",
      title: "Security & Deployment Consultant",
      description:
        "Consultant providing expertise on security and deployment strategies, leveraging extensive experience to discuss and refine ideas.",
      fullDescription:
        "Security expert with extensive experience in deployment strategies and system architecture. Provides critical insights on secure implementation and scalable infrastructure design for enterprise applications.",
      linkedinAbout:
        "Cybersecurity professional with over 15 years of experience in enterprise security architecture and deployment strategies. Focused on helping organizations implement robust security frameworks while maintaining operational efficiency. Expertise in threat assessment, vulnerability management, and secure system design for mission-critical applications.",
    },
    {
      id: "johan",
      name: "Johan Lingani",
      title: "Social Media & Web Development, AI Prompt Engineering",
      description:
        "Focused on social media strategy, web development, AI research through prompt engineering, and wireframing.",
      fullDescription:
        "Creative technologist specializing in social media strategy and modern web development. Combines AI prompt engineering expertise with strong design sensibilities to create engaging digital experiences and innovative user interfaces.",
      linkedinAbout:
        "Creative digital strategist bridging the gap between technology and user experience. Passionate about leveraging AI and modern web development to create meaningful digital experiences. Specialized in social media strategy, prompt engineering, and intuitive interface design that connects brands with their audiences in authentic and innovative ways.",
    },
  ];

  // Add handler for industry card clicks
  const handleIndustryClick = (industry: string) => {
    switch (industry) {
      case "education":
        window.open(
          "https://tempo-deployment-dfa3f0dc-dfe0-4b42.vercel.app/",
          "_blank",
        );
        break;
      case "realestate":
        window.open(
          "https://tempo-deployment-0d4445fa-fe2d-4801.vercel.app/",
          "_blank",
        );
        break;
      case "pregnancy":
        // No link available - could show a coming soon message
        alert("Pregnancy Platform coming soon!");
        break;
      case "services":
        // No link available - could show a coming soon message
        alert("Service Management Platform coming soon!");
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-[#121219] text-white h-[5986px]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a0f] via-[#121219] to-[#1a1b2e]">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/30 border border-purple-500/50 mb-8">
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600">
                POWERING PROGRESS
              </Badge>
              <span className="text-sm text-gray-300">
                For Innovators, Small Teams & Local Businesses
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Empowering Small Teams & Local Businesses
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your data into digital solutions with our comprehensive
              control tower platform. Aggregate and visualize critical business
              metrics from your digital components, enabling real-time insights,
              cost management, and operational efficiency for small businesses,
              individuals, and teams.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <AuthDialog
                mode="signin"
                trigger={
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                }
              />
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm bg-purple-900/20 border-purple-500/30 text-purple-300"
              >
                For Innovators
              </Badge>
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm bg-blue-900/20 border-blue-500/30 text-blue-300"
              >
                Digital Integrations
              </Badge>
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm bg-purple-900/20 border-purple-500/30 text-purple-300"
              >
                For Small Teams
              </Badge>
            </div>

            {/* Dashboard Preview Image */}
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl"></div>
              <img
                src="/images/Dashboard Example.png"
                alt="Dashboard Preview"
                className="relative rounded-lg shadow-2xl border border-gray-700/50"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="bg-black">
        <FeatureGrid />
      </section>
      
      {/* AI Tools Section */}
      <IntegrationsSection />
      
      {/* Pricing Section */}
      <section id="pricing">
        <div className="bg-[#1a1b2e] min-h-[868px] py-16 md:py-24">
          <PricingTiers />
        </div>
      </section>
      
      {/* Team Section */}
      <section id="team">
        <TeamSection />
      </section>
      
      {/* Industry Integrations Section */}
      <IndustryIntegrationsSection />
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4 text-center max-w-8xl">
          <div className="text-purple-500 font-medium mb-4 uppercase tracking-wider">
            EXPLORE OUR PRODUCTS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Business with Our Products?
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-12">
            Discover our range of innovative, US-designed and manufactured
            products that enhance your business operations. From custom 3D
            printed solutions to IoT devices and NFC technology, each product is
            crafted to integrate seamlessly with your digital transformation
            journey.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/3d-products">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200">
                <ShoppingCart className="h-4 w-4" />
                Browse Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 bg-transparent flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Grid className="h-4 w-4" />
              View All Categories
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-12 md:py-16 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4 max-w-8xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12 max-w-7xl mx-auto">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
                  xE
                </div>
                <span className="font-bold">xEmergence</span>
              </div>

              <p className="text-gray-400 text-sm">
                Unleash the full potential of your ideas with our accelerated
                digital solutions, transforming data into actionable insights
                and driving your success forward through innovative technology
                and US-manufactured products.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/designers"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    For Designers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/developers"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    For Developers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/managers"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    For Managers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
            <p className="text-gray-500 text-sm">
              TrendBlend Inc 2023 All Rights Reserved
            </p>

            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

// Missing icon components - adding them here
const Check = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Code = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const Bell = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const GraduationCap = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const Home = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const Package = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const Baby = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12h.01M15 12h.01M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
    <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
  </svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Youtube = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ImageIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="m22 21-3-3m0 0a2 2 0 0 0 0-4 2 2 0 0 0 0 4z" />
  </svg>
);

const InfoIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const AwardIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="8" r="6" />
    <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
  </svg>
);