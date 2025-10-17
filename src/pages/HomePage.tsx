import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import FeatureGrid from "@/components/FeatureGrid";
import TeamSection from "@/components/TeamSection";
import IndustryIntegrationsSection from "@/components/IndustryIntegrationsSection";
import { Feature251 } from "@/components/Feature251";
import { Timeline13 } from "@/components/Timeline13";
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
  Lightbulb,
  Code2,
  Rocket,
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
    <div className="relative min-h-screen w-full bg-background text-foreground transition-colors duration-300">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-100 dark:hidden">
        <div className="absolute inset-0 bg-[#fefcff]" />
        <div className="absolute inset-0 bg-aura-light" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 hidden dark:block">
        <div className="absolute inset-0 bg-gradient-to-br from-[#05040d] via-[#101328] to-[#1a1030]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.22),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(236,72,153,0.2),_transparent_55%)]" />
      </div>
      {/* Hero Section */}
      <section
        id="hero"
        className="section-divider section-divider--full relative isolate flex min-h-[calc(100vh-5.5rem)] items-center justify-center bg-transparent pt-24 sm:pt-28 dark:bg-gradient-to-br dark:from-[#0b0b19] dark:via-[#171a2f] dark:to-[#1f1433]"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#fde5ff]/40 via-transparent to-transparent dark:from-purple-500/25 dark:via-transparent dark:to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#c9f1ff]/35 via-transparent to-transparent dark:from-sky-500/25 dark:via-transparent dark:to-transparent" />

        <div className="container relative z-10 mx-auto px-4 pb-20 md:pb-32">
          <div className="mx-auto max-w-5xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 backdrop-blur">
              <Badge className="bg-gradient-to-r from-primary to-fuchsia-500 text-primary-foreground">
                POWERING PROGRESS
              </Badge>
              <span className="text-sm text-muted-foreground">
                For Innovators, Small Teams & Local Businesses
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-balance text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
                Empowering Small Teams & Local Businesses
              </span>
            </h1>

            {/* Description */}
            <p className="text-balance mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Transform your data into digital solutions with our comprehensive
              control tower platform. Aggregate and visualize critical business
              metrics from your digital components, enabling real-time insights,
              cost management, and operational efficiency for small businesses,
              individuals, and teams.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/3d-products">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-fuchsia-500 px-8 py-6 text-lg text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:from-primary/90 hover:to-fuchsia-500/90 hover:shadow-primary/40"
                >
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Feature Badges */}
            <div className="mb-16 flex flex-wrap justify-center gap-4">
              <Badge
                variant="outline"
                className="border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary"
              >
                For Innovators
              </Badge>
              <Badge
                variant="outline"
                className="border border-sky-500/30 bg-sky-400/10 px-4 py-2 text-sm text-sky-600 dark:text-sky-300"
              >
                Digital Integrations
              </Badge>
              <Badge
                variant="outline"
                className="border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary"
              >
                For Small Teams
              </Badge>
            </div>

            {/* Dashboard Preview Image */}
            <div className="relative mx-auto max-w-4xl pb-12">
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-primary/20 via-fuchsia-500/10 to-sky-500/20" />
              <img
                src="/images/Dashboard Example.png"
                alt="Dashboard Preview"
                className="relative rounded-3xl border border-border/70 shadow-2xl shadow-primary/10"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="section-divider section-divider--short scroll-mt-32">
        <FeatureGrid />
      </section>
      {/* New Features Section (replacing AI Tools) */}
      <section
        id="innovation"
        className="section-divider section-divider--full relative overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-95 transition-opacity duration-500 bg-aura-light dark:hidden" />
        <div className="pointer-events-none absolute inset-0 -z-10 hidden opacity-100 transition-opacity duration-500 bg-aura-dark dark:block" />
        <Feature251 />
      </section>
      {/* Timeline Section */}
      <Timeline13 />
      {/* Team Section */}
      <section id="team" className="section-divider section-divider--short scroll-mt-32">
        <TeamSection />
      </section>
      {/* Industry Integrations Section */}
      <IndustryIntegrationsSection />
      {/* CTA Section - Explore Our Products */}
      <section className="section-divider section-divider--short relative isolate overflow-hidden py-16 md:py-24">
        {/* Dashed Center Fade Grid Background */}
        <div
          className="absolute inset-0 z-0"
          aria-hidden="true"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e7e5e4 1px, transparent 1px),
              linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
              repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
            `,
            WebkitMaskImage: `
              repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
            `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        {/* Dark theme grid - adjust color for dark mode */}
        <div
          className="absolute inset-0 z-0 hidden dark:block"
          aria-hidden="true"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(52, 56, 92, 0.55) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(52, 56, 92, 0.55) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
              repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
            `,
            WebkitMaskImage: `
              repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
            `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        <div className="container relative z-10 mx-auto max-w-8xl px-4 text-center">
          <div className="mb-4 font-medium uppercase tracking-[0.4em] text-primary">
            EXPLORE OUR PRODUCTS
          </div>
          <h2 className="text-balance mb-6 text-3xl font-bold md:text-4xl">
            Ready to Transform Your Business with Our Products?
          </h2>
          <div className="mx-auto mb-12 max-w-3xl">
            <p className="text-balance rounded-2xl bg-background/60 px-6 py-4 font-semibold leading-relaxed text-foreground shadow-sm backdrop-blur-sm dark:bg-background/40">
              Discover our range of innovative, US-designed and manufactured
              products that enhance your business operations. From custom 3D
              printed solutions to IoT devices and NFC technology, each product is
              crafted to integrate seamlessly with your digital transformation
              journey.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/3d-products">
              <Button className="flex items-center gap-2 bg-gradient-to-r from-primary to-fuchsia-500 text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:from-primary/90 hover:to-fuchsia-500/90 hover:shadow-primary/40">
                <ShoppingCart className="h-4 w-4" />
                Browse Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Button
              variant="outline"
              className="flex items-center gap-2 border border-border/70 bg-background/60 text-muted-foreground shadow-md shadow-primary/10 transition-all duration-200 hover:border-primary/40 hover:text-foreground hover:shadow-primary/25"
            >
              <Grid className="h-4 w-4" />
              View All Categories
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-border/60 bg-background py-12 md:py-16">
        <div className="container mx-auto flex max-w-8xl flex-col items-center px-4 text-center md:text-left">
          <div className="mx-auto mb-12 grid w-full max-w-7xl gap-10 justify-items-center md:grid-cols-4 md:justify-items-start">
            <div className="max-w-md">
              <div className="mb-4 flex items-center justify-center gap-2 md:justify-start">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-fuchsia-500 text-xs font-bold text-primary-foreground">
                  xE
                </div>
                <span className="font-bold text-foreground">xEmergence</span>
              </div>

              <p className="text-sm text-muted-foreground">
                Unleash the full potential of your ideas with our accelerated
                digital solutions, transforming data into actionable insights
                and driving your success forward through innovative technology
                and US-manufactured products.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-bold text-foreground">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/designers"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    For Designers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/developers"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    For Developers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/managers"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    For Managers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-bold text-foreground">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-bold text-foreground">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/privacy"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
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

