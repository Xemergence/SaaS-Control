import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, ShoppingCart, Upload, Box, Coffee, PaintBucket } from "lucide-react";
import ProductCustomizer from "@/components/ProductCustomizer";

// Supabase Image helpers with optional bucket parameter (defaults to 'site-assets')
const sbObjectUrl = (path: string, bucket: string = "site-assets") => {
  const base = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const clean = encodeURI(path.replace(/^\/+/, ""));
  if (!base) return `/${clean}`;
  return `${base.replace(/\/$/, "")}/storage/v1/object/public/${bucket}/${clean}`;
};

const sbImage = (
  path: string,
  width?: number,
  quality?: number,
  bucket: string = "site-assets",
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

// Generic image error fallback: try object URL if render fails, then placeholder
const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const t = e.currentTarget;
  const fallback = t.getAttribute("data-fallback");
  if (fallback && t.src !== fallback) {
    t.src = fallback;
    t.removeAttribute("data-fallback");
    return;
  }
  t.src =
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=60";
};

type CategoryValue = "all" | "3d" | "nfc";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  imageFallback?: string;
  tags: string[];
  comingSoon?: boolean;
  sale?: boolean;
  route?: string; // if present, navigate to this route on select
  category: CategoryValue;
}

const categoryOptions = [
  { value: "all", label: "All Products", icon: ShoppingCart },
  { value: "3d", label: "3D Printed Art", icon: PaintBucket },
  { value: "nfc", label: "NFC Products", icon: Box },
] satisfies ReadonlyArray<{
  value: CategoryValue;
  label: string;
  icon: LucideIcon;
}>;

const upcomingCategoryOptions = [
  { value: "iot", label: "IoT Real Estate", icon: Box },
  { value: "manufacturing", label: "Manufacturing", icon: Box },
] satisfies ReadonlyArray<{
  value: string;
  label: string;
  icon: LucideIcon;
}>;

const ProductStore = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryValue>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  const products: Product[] = [
    {
      id: "nfc-collection",
      name: "3D Printed NFC Keychains",
      description:
        "Custom NFC keychains with your logo or design. Perfect for business branding and marketing.",
      price: 89.99,
      originalPrice: 119.99,
      image: sbImage(
        "marketing/nfc_keychains_hero.png",
        800,
        80,
        "product-images",
      ),
      imageFallback:
        "https://storage.googleapis.com/tempo-image-previews/github%7C145282054-1756348109835-20250409_1752_Social%20Media%20Keychains_remix_01jre8m26bfsfbyn3ad255arhg.png",
      tags: ["NFC", "Custom Design"],
      comingSoon: false,
      sale: true,
      route: "/nfc-keychains",
      category: "nfc",
    },
    {
      id: "custom-3d-print",
      name: "Custom 3D Print",
      description:
        "Upload your logo or design for custom 3D printing on various products including promotional items.",
      price: 149.99,
      image: sbImage(
        "marketing/custom_3d_print.png",
        800,
        80,
        "product-images",
      ),
      imageFallback:
        "https://storage.googleapis.com/tempo-image-previews/github%7C145282054-1756348326892-Custom%20Product%20Image.png",
      tags: ["Modular Design", "Multiple Sizes"],
      comingSoon: true,
      category: "3d",
    },
  ];

  const handleProductSelect = (product: Product) => {
    if (product.route) {
      navigate(product.route);
      return;
    }
    setSelectedProduct(product);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  if (selectedProduct) {
    return (
      <ProductCustomizer
        onSubmit={(data) => console.log(data)}
        defaultProduct={selectedProduct.id}
        onBack={handleBackToProducts}
      />
    );
  }

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
      >
        <div className="absolute -right-32 -top-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(126,87,255,0.25),_transparent_60%)] blur-3xl" />
        <div className="absolute -left-16 bottom-[-30%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.2),_transparent_62%)] blur-3xl" />
      </div>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-90">
          <div className="h-full w-full bg-[radial-gradient(circle_at_15%_20%,rgba(126,87,255,0.18),transparent_55%),radial-gradient(circle_at_85%_15%,rgba(59,130,246,0.2),transparent_60%),radial-gradient(circle_at_80%_85%,rgba(236,72,153,0.2),transparent_65%)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(126,87,255,0.22),transparent_60%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.26),transparent_65%),radial-gradient(circle_at_80%_90%,rgba(226,74,255,0.24),transparent_68%)]" />
        </div>

        <div className="container relative mx-auto flex max-w-6xl flex-col gap-12 px-4 py-20 sm:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start">
                <Badge className="rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  PRODUCTS FOR SALE
                </Badge>
              </div>
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Innovative Solutions for Your Business
              </h1>
              <p className="mx-auto max-w-2xl text-base text-muted-foreground md:mx-0 md:text-lg">
                From 3D printed art covers to IoT solutions for real estate and
                manufacturing - discover products designed to enhance your business
                operations.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <Button
                  variant="ghost"
                  className="group border border-border/60 bg-background/60 backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-primary/10"
                  onClick={() => navigate("/")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Home
                </Button>
                <Button
                  className="bg-primary shadow-[0_18px_45px_-18px_rgba(78,51,182,0.55)] transition-shadow hover:bg-primary/90 hover:shadow-[0_24px_60px_-18px_rgba(78,51,182,0.6)]"
                  onClick={() => setSelectedCategory("nfc")}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Shop Products
                </Button>
              </div>
            </div>

            <div className="grid w-full max-w-sm gap-4 rounded-3xl border border-border/70 bg-card/85 p-6 shadow-[0_28px_80px_-48px_rgba(64,45,145,0.35)] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.05]">
              <div className="flex items-start gap-3">
                <Upload className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Upload your model
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Send STL, STEP, or OBJ files for rapid quotes and iteration.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <PaintBucket className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Brand-ready finishes
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Multi-color, metallic, and soft-touch options tailored to your brand.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Coffee className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Small batch friendly
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Launch limited drops or pilot runs without large minimums.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Tabs
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as CategoryValue)}
            className="w-full"
          >
            <TabsList className="flex w-full flex-wrap gap-2 rounded-full border border-border/60 bg-background/80 p-1 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]">
              {categoryOptions.map((category) => (
                <TabsTrigger
                  key={category.value}
                  value={category.value}
                  className={cn(
                    "group flex items-center gap-2 rounded-full px-5 py-2 text-sm transition-all duration-200",
                    "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_12px_35px_-18px_rgba(78,51,182,0.65)]",
                    "data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:hover:bg-primary/10",
                  )}
                >
                  <category.icon className="h-4 w-4 transition-transform group-data-[state=active]:scale-110" />
                  <span>{category.label}</span>
                </TabsTrigger>
              ))}
              {upcomingCategoryOptions.map((category) => (
                <div
                  key={category.value}
                  className="flex items-center gap-2 rounded-full border border-dashed border-border/60 px-5 py-2 text-sm text-muted-foreground/70"
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.label}</span>
                  <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground/60">
                    Coming Soon
                  </span>
                </div>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 pb-24">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={handleProductSelect}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/70 bg-card/60 px-8 py-24 text-center backdrop-blur-md dark:border-white/10 dark:bg-white/[0.02]">
            <Badge className="mb-4 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-primary">
              Coming Soon
            </Badge>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              New products are in the works
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
              We&apos;re expanding into additional IoT and manufacturing solutions. Check
              back soon or reach out to the team for early access.
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-background/80">
        <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-12 text-center">
          <div className="flex items-center gap-3">
            <div className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-primary to-fuchsia-500 text-xs font-semibold text-primary-foreground shadow-[0_12px_32px_-12px_rgba(86,72,198,0.6)]">
              xE
            </div>
            <span className="text-lg font-medium tracking-tight text-foreground">
              xEmergence
            </span>
          </div>
          <p className="max-w-xl text-sm text-muted-foreground">
            Secure payments powered by Stripe - No account required
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground transition-colors">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <Link to="/contact" className="hover:text-foreground">
              Contact
            </Link>
            <Link to="/support" className="hover:text-foreground">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ProductCard = ({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (product: Product) => void;
}) => {
  const buttonLabel = product.route ? "Explore" : "Customize Design";
  const isComingSoon = Boolean(product.comingSoon);

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/60 bg-card/85 shadow-[0_28px_80px_-48px_rgba(64,45,145,0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_38px_110px_-42px_rgba(78,51,182,0.48)] dark:border-white/10 dark:bg-white/[0.05]">
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          data-fallback={product.imageFallback ?? undefined}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={handleImgError}
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background via-background/60 via-20% to-transparent dark:from-black/80" />
        {product.comingSoon && (
          <Badge className="absolute left-4 top-4 rounded-full border border-amber-500/40 bg-amber-500/20 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-amber-400 backdrop-blur-md">
            Coming Soon
          </Badge>
        )}
        {product.sale && (
          <Badge className="absolute right-4 top-4 rounded-full border border-rose-500/50 bg-rose-500/20 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-rose-400 backdrop-blur-md">
            Sale
          </Badge>
        )}
      </div>
      <CardContent className="flex flex-1 flex-col gap-5 p-8">
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur dark:border-white/15 dark:bg-white/[0.03] dark:text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold tracking-tight text-foreground lg:text-2xl">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground lg:text-base">
            {product.description}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-2xl font-semibold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="block text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button
            type="button"
            onClick={() => onSelect(product)}
            disabled={isComingSoon}
            variant={isComingSoon ? "outline" : "default"}
            className={cn(
              "h-10 rounded-full px-5 transition-all duration-200",
              isComingSoon
                ? "cursor-not-allowed border-border/60 bg-transparent text-muted-foreground"
                : "bg-primary text-primary-foreground shadow-[0_12px_28px_-14px_rgba(78,51,182,0.5)] hover:bg-primary/90 hover:shadow-[0_18px_42px_-14px_rgba(78,51,182,0.58)]",
            )}
          >
            {buttonLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductStore;
