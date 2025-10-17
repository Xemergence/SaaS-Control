import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Factory, Ruler, MapPin, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

interface KeychainItem {
  id: string;
  name: string;
  platform: string;
  description: string;
  image?: string; // Path relative to bucket, e.g. "nfc/tiktok.png"
  comingSoon?: boolean;
}

// Supabase Image helpers with fallback (bucket-aware, defaults to product-images)
const sbObjectUrl = (path: string, bucket: string = "product-images") => {
  const base = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const clean = encodeURI(path.replace(/^\/+/, ""));
  if (!base) return `/${clean}`;
  return `${base.replace(/\/$/, "")}/storage/v1/object/public/${bucket}/${clean}`;
};

const sbImage = (
  path: string,
  width?: number,
  quality?: number,
  bucket: string = "product-images",
) => {
  const base = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const clean = encodeURI(path.replace(/^\/+/, ""));
  if (!base) return `/${clean}`;
  if (width || quality) {
    const q: string[] = [];
    if (width) q.push(`width=${width}`);
    if (quality) q.push(`quality=${quality}`);
    return `${base.replace(/\/$/, "")}/storage/v1/render/image/public/${bucket}/${clean}${q.length ? `?${q.join("&")}` : ""}`;
  }
  return sbObjectUrl(path, bucket);
};

// Local public image fallback helper (maps to /public/product-images)
const localPublicImage = (path: string) => {
  const file = (path.split("/").pop() || path).replace(/^\/+/, "");
  return `/product-images/${file}`;
};

// Generic image error fallback: try object URL if render fails, then local public asset, then placeholder
const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const t = e.currentTarget;
  const fb1 = t.getAttribute("data-fallback");
  const fb2 = t.getAttribute("data-fallback2");
  if (fb1 && t.src !== fb1) {
    t.src = fb1;
    t.removeAttribute("data-fallback");
    return;
  }
  if (fb2 && t.src !== fb2) {
    t.src = fb2;
    t.removeAttribute("data-fallback2");
    return;
  }
  t.src =
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=60";
};

const items: KeychainItem[] = [
  {
    id: "instagram",
    name: "Instagram NFC Keychain",
    platform: "Instagram",
    description:
      "Tap to share your IG profile or link-in-bio instantly. 3D printed in the USA.",
    image: "nfc/instagram.png",
  },
  {
    id: "linkedin",
    name: "LinkedIn NFC Keychain",
    platform: "LinkedIn",
    description:
      "Network faster: open your LinkedIn profile with one tap. 3D printed in the USA.",
    image: "nfc/linkedin.png",
  },
  {
    id: "tiktok",
    name: "TikTok NFC Keychain",
    platform: "TikTok",
    description:
      "Creators love it: link to your TikTok in a tap. 3D printed in the USA.",
    image: "nfc/tiktok.png",
  },
  {
    id: "venmo",
    name: "Venmo NFC Keychain",
    platform: "Venmo",
    description:
      "Get paid faster by opening your Venmo profile on tap. 3D printed in the USA.",
    image: "nfc/venmo.png",
  },
  {
    id: "youtube",
    name: "YouTube NFC Keychain",
    platform: "YouTube",
    description:
      "Drive views: open your channel or latest video instantly. 3D printed in the USA.",
    image: "nfc/youtube.png",
  },
];

const InfoCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <Card className="border border-border/50 bg-card dark:border-white/10 dark:bg-white/[0.06]">
    <CardContent className="flex items-start gap-3 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 text-primary">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </CardContent>
  </Card>
);

const NFCProductCard = ({ item }: { item: KeychainItem }) => {
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/50 bg-card shadow-xl transition-transform duration-400 hover:-translate-y-1.5 hover:shadow-2xl dark:border-white/10 dark:bg-white/[0.06]">
      <CardContent className="relative flex h-full flex-col gap-5 p-8">
        <div className="flex items-center justify-between">
          <Badge className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-primary">
            {item.platform}
          </Badge>
          {item.comingSoon && (
            <Badge className="rounded-full border border-amber-500/40 bg-amber-500/20 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-amber-400 backdrop-blur">
              Coming Soon
            </Badge>
          )}
        </div>

        <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-[1.25rem] border border-border/60 bg-background/80 p-6 dark:border-white/10 dark:bg-white/[0.04]">
          <img
            src={sbImage(item.image ?? "", 600, 80, "product-images")}
            data-fallback={sbObjectUrl(item.image ?? "", "product-images")}
            data-fallback2={localPublicImage(item.image ?? "")}
            onError={handleImgError}
            loading="lazy"
            alt={`${item.platform} keychain`}
            className="max-h-full w-full object-contain transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">
            {item.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {item.description}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4">
          <span className="text-sm font-semibold text-primary">From $14.99</span>
          {item.comingSoon ? (
            <Button
              type="button"
              disabled
              className="rounded-full border border-border/60 bg-transparent px-5 text-muted-foreground"
            >
              Join Waitlist
            </Button>
          ) : (
            <Button asChild className="rounded-full bg-primary px-5 text-primary-foreground shadow-md transition-colors hover:bg-primary/90 hover:shadow-lg">
              <Link to="/contact">Request Info</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function NFCKeychains() {
  const { theme } = useTheme();
  const fallbackLogo = "/images/logo-black.png";
  const preferredLogo =
    theme === "dark" ? "/images/logo-dark.svg" : "/images/logo-light.svg";
  const logoFrameClasses = cn(
    "grid size-12 place-items-center rounded-[1.4rem] border transition-colors duration-300",
    theme === "dark"
      ? "border-white/30 text-white"
      : "border-slate-300 text-slate-900"
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_10%,rgba(126,87,255,0.16),transparent_60%),radial-gradient(circle_at_85%_85%,rgba(59,130,246,0.18),transparent_65%)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/3d-products" className="inline-flex items-center">
            <Button
              variant="ghost"
              className="group border border-border/60 bg-background/60 px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Store
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <span className={logoFrameClasses}>
              <img
                src={preferredLogo}
                alt="xEmergence Logo"
                className="h-9 w-auto object-contain"
                onError={(e) => {
                  if (!e.currentTarget.src.includes("logo-black.png")) {
                    e.currentTarget.src = fallbackLogo;
                  }
                }}
              />
            </span>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              NFC Keychains
            </span>
          </div>
        </div>

        {/* Hero + Specs */}
        <div className="mb-14 grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/85 p-6 shadow-[0_38px_120px_-60px_rgba(72,56,149,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05]">
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_18%_18%,rgba(126,87,255,0.24),transparent_62%),radial-gradient(circle_at_82%_28%,rgba(59,130,246,0.24),transparent_65%)] opacity-90" />
            <div className="relative flex h-[420px] items-center justify-center rounded-[1.5rem] border border-border/60 bg-background/70 p-8 backdrop-blur-lg dark:border-white/10 dark:bg-white/[0.02]">
              <img
                src={sbImage(
                  "nfc/nfc_keychains_bulk.png",
                  1200,
                  80,
                  "product-images",
                )}
                data-fallback={sbObjectUrl(
                  "nfc/nfc_keychains_bulk.png",
                  "product-images",
                )}
                data-fallback2={localPublicImage("nfc_keychains_bulk.png")}
                onError={handleImgError}
                loading="lazy"
                alt="Bulk NFC Keychains"
                className="max-h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                3D Printed NFC Keychains
              </h1>
              <p className="text-base text-muted-foreground md:text-lg">
                Tap-to-share keychains that instantly open your social profile,
                store, link-in-bio, or contact card. Designed for creators,
                small businesses, and event networking.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-[#141625] border-gray-800">
                <CardContent className="p-4 flex items-start gap-3 text-white">
                  <Factory className="h-5 w-5 text-purple-400 mt-1" />
                  <div>
                    <p className="text-sm text-white">Material</p>
                    <p className="font-medium">
                      Durable PLA/PLA+ (multi-color)
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#141625] border-gray-800">
                <CardContent className="p-4 flex items-start gap-3 text-white">
                  <MapPin className="h-5 w-5 text-purple-400 mt-1" />
                  <div>
                    <p className="text-sm text-white">Manufactured</p>
                    <p className="font-medium">Detroit, MI</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#141625] border-gray-800">
                <CardContent className="p-4 flex items-start gap-3 text-white">
                  <Settings className="h-5 w-5 text-purple-400 mt-1" />
                  <div>
                    <p className="text-sm text-white">Process</p>
                    <p className="font-medium">
                      FDM 3D Printing + Embedded NFC
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#141625] border-gray-800">
                <CardContent className="p-4 flex items-start gap-3 text-white">
                  <Ruler className="h-5 w-5 text-purple-400 mt-1" />
                  <div>
                    <p className="text-sm text-white">Dimensions</p>
                    <p className="font-medium">~40 × 40 × 4 mm (approx.)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Product list (5 variations) */}
        <section className="mb-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Available Variations
            </h2>
            <p className="text-sm text-muted-foreground">
              Choose your platform and unlock instant tap-to-share experiences.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <NFCProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}




