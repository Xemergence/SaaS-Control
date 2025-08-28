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
            <img
              src="/images/logo-black.png"
              alt="Logo"
              className="h-10 w-10 rounded-full border border-gray-700 object-cover bg-black"
            />
            <span className="text-xl font-bold">NFC Keychains</span>
          </div>
        </div>

        {/* Hero + Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-12">
          <div className="border border-gray-800 rounded-lg overflow-hidden bg-[#121219]">
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

        {/* Product list (5 variations) */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Available Variations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Card key={item.id} className="bg-[#1c1c24] border-gray-800">
                <CardContent className="p-5 flex flex-col h-full text-white">
                  <div className="relative mb-4 h-44 w-full rounded-md overflow-hidden bg-black flex items-center justify-center">
                    <img
                      src={sbImage(item.image!, 600, 80, "product-images")}
                      data-fallback={sbObjectUrl(item.image!, "product-images")}
                      data-fallback2={localPublicImage(item.image!)}
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
                      Buy
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
