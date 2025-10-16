import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Marquee } from "@/components/ui/marquee";
import { MotionPreset } from "@/components/ui/motion-preset";
import { Rating } from "@/components/ui/rating";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export type AvatarItem = {
  src: string
  name: string
  fallback: string
}

const avatars: AvatarItem[] = [
  {
    src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png",
    name: "Howard Lloyd",
    fallback: "HL",
  },
  {
    src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png",
    name: "Jenny Wilson",
    fallback: "JW",
  },
  {
    src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png",
    name: "Hallie Richards",
    fallback: "HR",
  },
];

export default function HeroSection() {
  return (
    <section className="flex min-h-screen flex-1 flex-col bg-gradient-to-br from-background via-muted/30 to-background dark:from-[#121219] dark:via-[#0f111b] dark:to-[#121219]">
      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Left Content */}
        <div className="flex max-w-2xl flex-col justify-center gap-10 pb-12 pt-28">
          <div className="flex flex-col items-start gap-8">
            <MotionPreset
              fade
              slide
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-2 backdrop-blur"
            >
              <Badge className="rounded-full bg-gradient-to-r from-primary to-fuchsia-500 text-primary-foreground">
                AI-Powered
              </Badge>
              <span className="text-sm text-muted-foreground">
                Solution for small teams & local businesses
              </span>
            </MotionPreset>

            <MotionPreset
              component="h1"
              fade
              slide
              delay={0.3}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-balance text-3xl font-bold leading-[1.29167] text-foreground sm:text-4xl lg:text-5xl"
            >
              Empowering Small Teams & Local Businesses
            </MotionPreset>

            <MotionPreset
              component="p"
              fade
              slide
              delay={0.6}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-base text-muted-foreground md:text-lg"
            >
              Transform your data into digital solutions with our comprehensive
              control tower platform. Aggregate and visualize critical business
              metrics from your digital components, enabling real-time insights,
              cost management, and operational efficiency for small businesses,
              individuals, and teams.
            </MotionPreset>

            <MotionPreset
              fade
              slide
              delay={0.9}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-primary to-fuchsia-500 px-6 py-3 text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:from-primary/90 hover:to-fuchsia-500/90 hover:shadow-primary/40">
                  Partner With Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button className="bg-primary/10 px-6 py-3 text-primary shadow-sm shadow-primary/20 transition-colors hover:bg-primary/20">
                Live Demo
              </Button>
            </MotionPreset>
          </div>

          <hr className="border-dashed border-border/60" />

          <MotionPreset
            fade
            slide
            delay={1.5}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            {/* Avatar Group */}
            <TooltipProvider>
              <div className="flex -space-x-4">
                {avatars.map((avatar, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Avatar className="size-12 ring-2 ring-border/70 transition-all duration-300 ease-in-out hover:z-[1] hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20">
                        <AvatarImage src={avatar.src} alt={avatar.name} />
                        <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                          {avatar.fallback}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>{avatar.name}</TooltipContent>
                  </Tooltip>
                ))}

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="size-12 ring-2 ring-border/70 transition-all duration-300 ease-in-out hover:z-[1] hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20">
                      <AvatarFallback className="bg-sky-500 text-xs text-sky-50">
                        +39k
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>39k more</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>

            <div className="space-y-1">
              {/* Ratings */}
              <div className="flex gap-0.5">
                <Rating
                  readOnly
                  variant="yellow"
                  size={24}
                  value={4.5}
                  precision={0.5}
                />
              </div>

              <span className="text-sm text-muted-foreground">
                From 4000+ Reviews
              </span>
            </div>
          </MotionPreset>
        </div>

        {/* Right Content */}
        <MotionPreset
          fade
          blur
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-lg:hidden grid grid-cols-2"
        >
          <Marquee
            vertical
            pauseOnHover
            duration={20}
            gap={1.5}
            className="h-screen min-h-182 overflow-hidden"
          >
            <img
              src="/images/admin/expenses-view.png"
              alt="Expenses View"
              className="rounded-lg border border-border/40 bg-card/80 shadow-lg shadow-primary/10"
            />
            <img
              src="/images/admin/expense-input.png"
              alt="Expense Input"
              className="rounded-lg border border-border/40 bg-card/80 shadow-lg shadow-primary/10"
            />
            <img
              src="/images/Dashboard Example.png"
              alt="Dashboard"
              className="rounded-lg border border-border/40 bg-card/80 shadow-lg shadow-primary/10"
            />
            <img
              src="/images/admin/expenses-2-view.png"
              alt="Expenses Overview"
              className="rounded-lg border border-border/40 bg-card/80 shadow-lg shadow-primary/10"
            />
          </Marquee>

          <Marquee
            vertical
            pauseOnHover
            duration={22}
            gap={1.5}
            reverse
            className="h-screen min-h-182 overflow-hidden"
          >
            <img
              src="/images/admin/business-and-marketing-view.png"
              alt="Business & Marketing"
              className="rounded-lg border border-border/40 bg-card/80 shadow-lg shadow-primary/10"
            />
            <img
              src="/images/Dashboard Example.png"
              alt="Dashboard Analytics"
              className="rounded-lg border border-border/40 bg-card/80 shadow-lg shadow-primary/10"
            />
            <img
              src="/images/admin/expenses-view.png"
              alt="Expenses"
              className="rounded-lg border border-border/40 bg-card/80 shadow-lg shadow-primary/10"
            />
            <img
              src="/images/admin/expense-input.png"
              alt="Input Form"
              className="rounded-lg border border-border/40 bg-card/80 shadow-lg shadow-primary/10"
            />
            <img
              src="/images/admin/expenses-2-view.png"
              alt="Financial Overview"
              className="rounded-lg border border-border/40 bg-card/80 shadow-lg shadow-primary/10"
            />
          </Marquee>
        </MotionPreset>
      </div>
    </section>
  );
}
