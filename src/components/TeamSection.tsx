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
    <section className="py-20 md:py-28 bg-black">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 bg-purple-900/30 border-purple-500/50 text-purple-400"
          >
            Our Team
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Meet the Innovators
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A diverse team of experts dedicated to transforming your digital
            vision into reality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              className="bg-gradient-to-br from-[#1a1e2d] to-[#0d0f1a] border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group overflow-hidden"
            >
              <CardContent className="p-6">
                {/* Avatar */}
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {member.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-[#0077b5] flex items-center justify-center shadow-lg">
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full h-full hover:scale-110 transition-transform"
                        aria-label={`${member.name}'s LinkedIn profile`}
                      >
                        <Linkedin className="h-5 w-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Name & Title */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-purple-400 text-sm font-medium mb-3">
                    {member.title}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed text-center">
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
