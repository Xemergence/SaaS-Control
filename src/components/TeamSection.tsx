import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  description: string;
  linkedinUrl: string;
  image?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "jether",
    name: "Jether Panton",
    title: "Strategy, PMO, AI Integration & Cross-domain Prototyping",
    description:
      "Strategic technology leader specializing in PMO, AI integration, and cross-domain prototyping. Expert in blockchain research, emerging technologies, and managing complex technology initiatives that drive digital transformation and innovation.",
    linkedinUrl: "https://www.linkedin.com/in/jetherpantonainnovation/",
  },
  {
    id: "sebastian",
    name: "Sebastian Vissego",
    title: "Security & Deployment Consultant",
    description:
      "Security expert with extensive experience in deployment strategies and system architecture. Provides critical insights on secure implementation and scalable infrastructure design for enterprise applications.",
    linkedinUrl: "https://www.linkedin.com/in/sebavissepo/",
  },
  {
    id: "johan",
    name: "Johan Lingani",
    title: "Social Media & Web Development, AI Prompt Engineering",
    description:
      "Creative technologist specializing in social media strategy and modern web development. Combines AI prompt engineering expertise with strong design sensibilities to create engaging digital experiences and innovative user interfaces.",
    linkedinUrl: "https://www.linkedin.com/in/johan-lingani-5788a953/",
  },
];

export default function TeamSection() {
  return (
    <section className="section-divider section-divider--short relative isolate bg-[color:var(--primary-foreground)] py-20 transition-colors dark:bg-[color:var(--color-surface)] md:py-28">
      {/* Light theme aura background */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-90 bg-aura-light dark:hidden" />
      {/* Dark theme aura background */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden opacity-90 bg-aura-dark dark:block" />

      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <Badge
            variant="outline"
            className="mb-4 border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm text-primary"
          >
            Our Team
          </Badge>
          <h2 className="text-balance mb-4 text-3xl font-bold leading-tight text-foreground md:text-5xl">
            Meet the Innovators
          </h2>
          <p className="text-balance mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            A diverse team of experts dedicated to transforming your digital
            vision into reality
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              className="group overflow-hidden border border-border/60 bg-gradient-to-br from-muted/40 via-card to-background/80 shadow-lg shadow-primary/10 transition-all duration-300 hover:border-primary/50 hover:shadow-primary/25"
            >
              <CardContent className="p-6">
                {/* Avatar */}
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-fuchsia-500 text-3xl font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-110">
                      {member.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#0077b5] shadow-lg shadow-[#0077b5]/40">
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-full w-full items-center justify-center transition-transform hover:scale-110"
                        aria-label={`${member.name}'s LinkedIn profile`}
                      >
                        <Linkedin className="h-5 w-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Name & Title */}
                <div className="mb-4 text-center">
                  <h3 className="mb-2 text-xl font-bold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-primary">{member.title}</p>
                </div>

                {/* Description */}
                <p className="text-center text-sm leading-relaxed text-muted-foreground">
                  {member.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
