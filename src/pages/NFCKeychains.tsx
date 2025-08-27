import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Factory, Ruler, MapPin, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface KeychainItem {
  id: string;
  name: string;
  platform: string;
  description: string;
  image?: string; // Path relative to bucket, e.g. "images/tiktok_1.png"
  comingSoon?: boolean;
}

// Helper to create fast Supabase Image CDN URLs with sensible defaults
const sbImage = (path: string, width: number = 800, quality: number = 80) => {
  const base = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const clean = encodeURI(path.replace(/^\/+/, ""));
  if (!base) return `/${clean}`; // Fallback to local public folder
  return `${base.replace(/\/$/, "")}/storage/v1/render/image/public/site-assets/${clean}?width=${width}&quality=${quality}`;
};

// Generic image error fallback: try local public image once, then a lightweight placeholder
const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const t = e.currentTarget;
  const fallback = t.getAttribute("data-fallback");
  const alreadyTried = t.getAttribute("data-failed");
  if (fallback && !alreadyTried) {
    t.setAttribute("data-failed", "true");
    t.src = fallback;
    return;
  }
  t.src =
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=60";
};

const keychains: KeychainItem[] = [
  {
    id: "tiktok",
    name: "TikTok NFC Keychain",
    platform: "TikTok",
    description:
      "Tap to open your TikTok profile or a specific video/link instantly.",
    image: "images/tiktok_1.png",
  },
  {
    id: "instagram",
    name: "Instagram NFC Keychain",
    platform: "Instagram",
    description:
      "Share your IG profile, Link-in-bio or latest reel with one tap.",
    image: "images/instagram_1.png",
  },
  {
    id: "etsy",
    name: "Etsy NFC Keychain",
    platform: "Etsy",
    description: "Direct customers to your Etsy shop or a featured listing.",
    comingSoon: true,
  },
  {
    id: "facebook",
    name: "Facebook NFC Keychain",
    platform: "Facebook",
    description: "Open your Facebook page or Messenger with a single tap.",
    comingSoon: true,
  },
  {
    id: "whatsapp",
    name: "WhatsApp NFC Keychain",
    platform: "WhatsApp",
    description:
      "Start a chat or share your contact card via WhatsApp instantly.",
    comingSoon: true,
  },
];

const moreOptions: KeychainItem[] = [
  {
    id: "linkedin",
    name: "LinkedIn NFC Keychain",
    platform: "LinkedIn",
    description:
      "Perfect for events: open your LinkedIn profile to connect fast.",
    image: "images/linkedin_1.png",
  },
  {
    id: "venmo",
    name: "Venmo NFC Keychain",
    platform: "Venmo",
    description: "Accept payments quickly by opening your Venmo profile.",
    image: "images/venmo_1.png",
  },
];

export default function NFCKeychains() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/3d-products" className="inline-flex items-center">
            <Button
              variant="ghost"
              className="text-white hover:text-white hover:bg-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Store
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
              xE
            </div>
            <span className="text-xl font-bold">NFC Keychains</span>
          </div>
        </div>

        {/* Hero + Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-12">
          <div className="border border-gray-800 rounded-lg overflow-hidden bg-[#121219]">
            <img
              src={sbImage("images/tiktok_pair.png", 1200, 80)}
              data-fallback="/images/tiktok_pair.png"
              onError={handleImgError}
              loading="lazy"
              alt="NFC Keychains"
              className="w-full h-[420px] object-contain bg-black"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                3D Printed NFC Keychains
              </h1>
              <p className="text-white">
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

        {/* Primary selection list */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Popular Platforms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {keychains.map((item) => (
              <Card key={item.id} className="bg-[#1c1c24] border-gray-800">
                <CardContent className="p-5 flex flex-col h-full text-white">
                  <div className="relative mb-4 h-44 w-full rounded-md overflow-hidden bg-black flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={sbImage(item.image, 600, 80)}
                        data-fallback={`/${item.image}`}
                        onError={handleImgError}
                        loading="lazy"
                        alt={`${item.platform} keychain`}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-sm">
                        Image coming soon
                      </div>
                    )}
                    {item.comingSoon && (
                      <Badge className="absolute top-2 left-2 bg-purple-600">
                        COMING SOON
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-1 text-white">
                    {item.name}
                  </h3>
                  <p className="text-white text-sm mb-4 flex-1">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-purple-400 font-semibold">
                      From $14.99
                    </span>
                    <Button className="bg-purple-600 hover:bg-purple-700 h-10">
                      Select
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* More options from provided images */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">More Options</h2>
            <span className="text-sm text-white">
              Built from your reference photos
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {moreOptions.map((item) => (
              <Card key={item.id} className="bg-[#1c1c24] border-gray-800">
                <CardContent className="p-5 flex flex-col h-full text-white">
                  <div className="relative mb-4 h-44 w-full rounded-md overflow-hidden bg-black flex items-center justify-center">
                    <img
                      src={sbImage(item.image!, 600, 80)}
                      data-fallback={`/${item.image}`}
                      onError={handleImgError}
                      loading="lazy"
                      alt={`${item.platform} keychain`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-1 text-white">
                    {item.name}
                  </h3>
                  <p className="text-white text-sm mb-4 flex-1">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-purple-400 font-semibold">
                      From $14.99
                    </span>
                    <Button className="bg-purple-600 hover:bg-purple-700 h-10">
                      Select
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
