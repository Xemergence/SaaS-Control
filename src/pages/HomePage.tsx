import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import FeatureGrid from "@/components/FeatureGrid";
import PricingTiers from "@/components/PricingTiers";
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

interface TeamMember {
  id: string;
  name: string;
  title: string;
  description: string;
  fullDescription: string;
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
    },
    {
      id: "sebastian",
      name: "Sebastian Vissego",
      title: "Security & Deployment Consultant",
      description:
        "Consultant providing expertise on security and deployment strategies, leveraging extensive experience to discuss and refine ideas.",
      fullDescription:
        "Security expert with extensive experience in deployment strategies and system architecture. Provides critical insights on secure implementation and scalable infrastructure design for enterprise applications.",
    },
    {
      id: "johan",
      name: "Johan Lingani",
      title: "Social Media & Web Development, AI Prompt Engineering",
      description:
        "Focused on social media strategy, web development, AI research through prompt engineering, and wireframing.",
      fullDescription:
        "Creative technologist specializing in social media strategy and modern web development. Combines AI prompt engineering expertise with strong design sensibilities to create engaging digital experiences and innovative user interfaces.",
    },
  ];

  return (
    <div className="bg-[#121219] text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-purple-500 font-medium mb-4 uppercase tracking-wider">
          POWERING PROGRESS
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Empowering Small Teams & Local Businesses
            </h1>
            <p className="text-gray-300 mb-8 text-lg">
              Transform your data into digital solutions with our comprehensive
              control tower platform. Aggregate and visualize critical business
              metrics from your digital components, enabling real-time insights,
              cost management, and operational efficiency for small businesses,
              individuals, and teams.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6 h-auto">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="mt-4 text-gray-400 text-sm">
              Designed for innovators, small teams, and growing businesses
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <Badge
                variant="outline"
                className="bg-[#1a1e2d] border-purple-900 text-white flex items-center gap-2 py-2 px-4"
              >
                <Infinity className="h-4 w-4 text-purple-500" />
                For Innovators
              </Badge>
              <Badge
                variant="outline"
                className="bg-[#1a1e2d] border-purple-900 text-white flex items-center gap-2 py-2 px-4"
              >
                <Code className="h-4 w-4 text-blue-500" />
                Digital Integrations
              </Badge>
              <Badge
                variant="outline"
                className="bg-[#1a1e2d] border-purple-900 text-white flex items-center gap-2 py-2 px-4"
              >
                <Users className="h-4 w-4 text-purple-500" />
                For Small Teams
              </Badge>
            </div>
          </div>

          <div className="bg-[#1a1e2d] rounded-xl p-4 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
              alt="Dashboard Analytics"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-[#131620]">
        <FeatureGrid />
      </section>

      {/* AI Tools Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Favorite AI Tools, Integrated
              </h2>
              <p className="text-gray-300 mb-8">
                xEmergence seamlessly integrates with the tools you already
                love, enabling smooth transitions across your work processes and
                maximizing operational efficiency.
              </p>

              <h3 className="text-2xl font-bold mb-4">
                Centralized Control Tower
              </h3>
              <p className="text-gray-300 mb-6">
                Our platform serves as a unified control tower, powered by
                advanced AI technology, designed to transform data from your
                digital components into actionable business intelligence. By
                centralizing all your tools and platforms under one intelligent
                system, we empower small businesses, individuals, and teams with
                seamless integration, real-time insights, and automated
                workflows.
              </p>

              <p className="text-gray-300">
                Access our comprehensive suite of AI-powered tools designed to
                streamline operations, from intelligent scheduling and analytics
                to automated notifications and security management. Plus,
                explore our array of US-designed and manufactured 3D products to
                enhance your physical business presence.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Tool Card 1 */}
              <Card className="bg-[#1a1e2d] border-none shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center mx-auto mb-3">
                    <Calendar className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="text-sm font-medium">Scheduling</p>
                </CardContent>
              </Card>

              {/* Tool Card 2 */}
              <Card className="bg-[#1a1e2d] border-none shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                  </div>
                  <p className="text-sm font-medium">AI Chat</p>
                </CardContent>
              </Card>

              {/* Tool Card 3 */}
              <Card className="bg-[#1a1e2d] border-none shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="h-5 w-5 text-purple-500" />
                  </div>
                  <p className="text-sm font-medium">Analytics</p>
                </CardContent>
              </Card>

              {/* Tool Card 4 */}
              <Card className="bg-[#1a1e2d] border-none shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center mx-auto mb-3">
                    <Brain className="h-5 w-5 text-red-500" />
                  </div>
                  <p className="text-sm font-medium">AI Assistant</p>
                </CardContent>
              </Card>

              {/* Tool Card 5 */}
              <Card className="bg-[#1a1e2d] border-none shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-yellow-900/30 flex items-center justify-center mx-auto mb-3">
                    <Bell className="h-5 w-5 text-yellow-500" />
                  </div>
                  <p className="text-sm font-medium">Notifications</p>
                </CardContent>
              </Card>

              {/* Tool Card 6 */}
              <Card className="bg-[#1a1e2d] border-none shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-gray-700/30 flex items-center justify-center mx-auto mb-3">
                    <Settings className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium">Configuration</p>
                </CardContent>
              </Card>

              {/* Tool Card 7 */}
              <Card className="bg-[#1a1e2d] border-none shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="text-sm font-medium">Security</p>
                </CardContent>
              </Card>

              {/* Tool Card 8 */}
              <Card className="bg-[#1a1e2d] border-none shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-5 w-5 text-blue-500" />
                  </div>
                  <p className="text-sm font-medium">Automation</p>
                </CardContent>
              </Card>

              {/* Tool Card 9 */}
              <Card className="bg-[#1a1e2d] border-none shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center mx-auto mb-3">
                    <Database className="h-5 w-5 text-purple-500" />
                  </div>
                  <p className="text-sm font-medium">Data Management</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-[#131620]">
        <PricingTiers />
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12">Team members</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Team Member Cards */}
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`bg-[#1a1e2d] rounded-lg p-6 flex gap-4 cursor-pointer hover:bg-[#252a3d] transition-colors ${selectedTeamMember === member.id ? "border border-purple-500" : ""}`}
                onClick={() => setSelectedTeamMember(member.id)}
              >
                <div className="flex-shrink-0">
                  <Avatar className="h-12 w-12 bg-purple-900 text-white">
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{member.name}</h3>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-blue-500 text-blue-400"
                    >
                      in
                    </Badge>
                  </div>
                  <p className="text-purple-400 text-sm">{member.title}</p>
                  <p className="text-gray-400 text-sm mt-2">
                    {member.description}
                  </p>
                  <div className="mt-3 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-600 text-blue-400 flex items-center gap-2"
                    >
                      <LinkedinIcon className="h-3 w-3" />
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* Team Member Detail Card - Featured */}
            {selectedTeamMember && (
              <div className="md:col-span-2 bg-[#1a1e2d] rounded-lg p-6 border border-purple-800/30">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-12 w-12 bg-purple-900 text-white">
                    <AvatarFallback>
                      {teamMembers
                        .find((m) => m.id === selectedTeamMember)
                        ?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-xl">
                    {teamMembers.find((m) => m.id === selectedTeamMember)?.name}
                  </h3>
                </div>

                <p className="text-purple-400 mb-4">
                  {teamMembers.find((m) => m.id === selectedTeamMember)?.title}
                </p>

                <p className="text-gray-300 mb-6">
                  {
                    teamMembers.find((m) => m.id === selectedTeamMember)
                      ?.fullDescription
                  }
                </p>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="border-blue-600 text-blue-400 flex items-center gap-2 flex-1"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                    View LinkedIn Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="border-purple-600 text-purple-400 flex items-center gap-2 flex-1"
                  >
                    Message
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Industry Integrations Section */}
      <section className="py-16 md:py-24 bg-[#131620]">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Industry-Specific Platform Integrations
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Discover our specialized platforms designed to enhance specific
            industries. We build and sponsor industry-focused solutions that
            empower professionals and small businesses with data visualization,
            automation, AI, and advanced features. Our template-driven approach
            accelerates development while maintaining affordability through
            tiered pricing systems.
          </p>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Industry Card 1 */}
          <Card className="bg-[#1a1e2d] border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-bold">Education</h3>
            </CardContent>
          </Card>

          {/* Industry Card 2 */}
          <Card className="bg-[#1a1e2d] border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                <Home className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="font-bold">Real Estate</h3>
            </CardContent>
          </Card>

          {/* Industry Card 3 */}
          <Card className="bg-[#1a1e2d] border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                <Package className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-bold">Services</h3>
            </CardContent>
          </Card>

          {/* Industry Card 4 */}
          <Card className="bg-[#1a1e2d] border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                <Baby className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="font-bold">Pregnancy Platform</h3>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
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
              <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Browse Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 flex items-center gap-2"
            >
              <Grid className="h-4 w-4" />
              View All Categories
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 bg-[#131620] border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
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

          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
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

const ShoppingCart = ({ className }: { className?: string }) => (
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
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const Grid = ({ className }: { className?: string }) => (
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
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
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
