import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ShoppingCart,
  Upload,
  Box,
  Coffee,
  PaintBucket,
} from "lucide-react";
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
}

const ProductStore = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
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

  return (
    <div className="bg-black text-white pt-4">
      {/* Hero Section */}
      <section className="py-12 px-4 md:px-8 max-w-6xl mx-auto text-center">
        <div className="mb-2 text-sm text-blue-500 uppercase tracking-wider">
          PRODUCTS FOR SALE
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Innovative Solutions for Your Business
        </h1>
        <p className="text-white max-w-2xl mx-auto">
          From 3D printed art covers to IoT solutions for real estate and
          manufacturing - discover products designed to enhance your business
          operations.
        </p>
      </section>

      {/* Category Tabs (visual only) */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-8">
        <div className="flex overflow-x-auto pb-2 gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            className={`rounded-full ${selectedCategory === "all" ? "bg-purple-600 hover:bg-purple-700 text-white" : "text-white hover:text-white border-gray-700/30 hover:border-gray-600/40 bg-transparent hover:bg-gray-800/20"}`}
            onClick={() => setSelectedCategory("all")}
          >
            <Box className="h-4 w-4 mr-2" /> All Products
          </Button>
          <Button
            variant={selectedCategory === "3d" ? "default" : "outline"}
            className={`rounded-full ${selectedCategory === "3d" ? "bg-purple-600 hover:bg-purple-700 text-white" : "text-white hover:text-white border-gray-700/30 hover:border-gray-600/40 bg-transparent hover:bg-gray-800/20"}`}
            onClick={() => setSelectedCategory("3d")}
          >
            <PaintBucket className="h-4 w-4 mr-2" /> 3D Printed Art
          </Button>
          <Button
            variant={selectedCategory === "nfc" ? "default" : "outline"}
            className={`rounded-full ${selectedCategory === "nfc" ? "bg-purple-600 hover:bg-purple-700 text-white" : "text-white hover:text-white border-gray-700/30 hover:border-gray-600/40 bg-transparent hover:bg-gray-800/20"}`}
            onClick={() => setSelectedCategory("nfc")}
          >
            <Box className="h-4 w-4 mr-2 text-white" /> NFC Products
          </Button>
          <Button
            variant="outline"
            className="rounded-full text-white border-gray-600/60 hover:border-gray-500/70 bg-transparent hover:bg-gray-800/10"
            disabled
          >
            <Box className="h-4 w-4 mr-2 text-white" />
            <span className="text-white">IoT Real Estate</span>{" "}
            <span className="text-xs ml-1 text-white">(Coming Soon)</span>
          </Button>
          <Button
            variant="outline"
            className="rounded-full text-white border-gray-600/60 hover:border-gray-500/70 bg-transparent hover:bg-gray-800/10"
            disabled
          >
            <Box className="h-4 w-4 mr-2 text-white" />
            <span className="text-white">Manufacturing</span>{" "}
            <span className="text-xs ml-1 text-white">(Coming Soon)</span>
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-[#1c1c24] rounded-lg overflow-hidden border border-gray-800"
            >
              <div
                className="relative cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handleProductSelect(product)}
              >
                <img
                  src={product.image}
                  data-fallback={product.imageFallback}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={handleImgError}
                  loading="lazy"
                />
                {product.comingSoon && (
                  <Badge className="absolute top-3 left-3 bg-purple-600 text-white">
                    COMING SOON
                  </Badge>
                )}
                {product.sale && (
                  <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                    SALE
                  </Badge>
                )}
              </div>
              <div className="p-5 flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-white text-sm mb-4">{product.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-800 text-white px-2 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-end justify-between mt-auto">
                  <div>
                    <span className="text-xl font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-white line-through ml-2">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-end">
                    {product.route ? (
                      <Button
                        onClick={() => handleProductSelect(product)}
                        className="bg-purple-600 hover:bg-purple-700 h-10"
                      >
                        Explore
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleProductSelect(product)}
                        className="bg-purple-600 hover:bg-purple-700 h-10"
                      >
                        Customize Design
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="flex items-center mb-4">
            <div className="bg-purple-600 rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold mr-2">
              xE
            </div>
            <span className="text-lg font-medium">xEmergence</span>
          </div>
          <p className="text-sm text-white mb-4">
            Secure payments powered by Stripe • No account required
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/" className="text-white hover:text-white">
              Home
            </Link>
            <Link to="/contact" className="text-white hover:text-white">
              Contact
            </Link>
            <Link to="/support" className="text-white hover:text-white">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductStore;
