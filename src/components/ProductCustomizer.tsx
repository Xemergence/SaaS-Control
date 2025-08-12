import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Box,
  Coffee,
  Palette,
  HelpCircle,
  Upload,
  ArrowLeft,
} from "lucide-react";

interface ProductOption {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: React.ReactNode;
}

interface ProductCustomizerProps {
  onSubmit?: (data: {
    selectedProduct: string;
    designFile: File | null;
  }) => void;
  defaultProduct?: string;
  product?: any;
  onBack?: () => void;
}

const ProductCustomizer = ({
  onSubmit,
  defaultProduct = "keychain",
  product,
  onBack,
}: ProductCustomizerProps) => {
  const [selectedProduct, setSelectedProduct] =
    useState<string>(defaultProduct);
  const [designFile, setDesignFile] = useState<File | null>(null);

  const productOptions: ProductOption[] = [
    {
      id: "keychain",
      name: "Keychain",
      price: 15.99,
      description:
        "Durable 3D printed keychain with your custom design. Perfect for branding, gifts, or personal use. Includes metal ring attachment.",
      icon: <Box className="h-5 w-5" />,
    },
    {
      id: "coaster",
      name: "Coaster",
      price: 24.99,
      description:
        "Custom coaster set (4 pieces) with your logo or design. Heat-resistant material perfect for protecting surfaces while showcasing your brand.",
      icon: <Coffee className="h-5 w-5" />,
    },
    {
      id: "art-piece",
      name: "Art Piece",
      price: 49.99,
      description:
        "Custom 3D printed art piece or decorative item. Transform your 2D design into a stunning 3D sculpture or wall art. Various sizes available.",
      icon: <Palette className="h-5 w-5" />,
    },
    {
      id: "other",
      name: "Other",
      price: 0,
      description:
        "Have a unique idea? Upload your design and describe what you'd like created. Our team will review and provide a custom quote for your project.",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ];

  const selectedProductData =
    productOptions.find((p) => p.id === selectedProduct) || productOptions[0];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDesignFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        selectedProduct,
        designFile,
      });
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-[#121219] text-white">
      <div className="flex items-center mb-8">
        {onBack && (
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mr-4 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Button>
        )}
        <div className="text-center flex-grow">
          <h1 className="text-3xl font-bold mb-2">
            Create Your Custom 3D Print
          </h1>
          <p className="text-muted-foreground">
            Upload your design and choose what you'd like us to create for you
          </p>
        </div>
      </div>

      <Card className="mb-8 bg-slate-900 border-slate-800">
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="text-lg font-medium mb-1">
              Selected: {selectedProductData.name}
            </h2>
            <p className="text-sm text-muted-foreground mb-2">
              {selectedProductData.description}
            </p>
            <p className="text-purple-400 font-medium">
              Starting at ${selectedProductData.price.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Choose Your Item</h2>
          <div className="space-y-4">
            {productOptions.map((option) => (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all hover:border-purple-500 ${selectedProduct === option.id ? "border-purple-500 bg-slate-800" : "bg-slate-900 border-slate-800"}`}
                onClick={() => setSelectedProduct(option.id)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 text-purple-400">{option.icon}</div>
                    <div>
                      <h3 className="font-medium">{option.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {option.id === "other" ? (
                      <span className="text-purple-400">Quote</span>
                    ) : (
                      <span className="text-purple-400">
                        ${option.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Upload Your Design</h2>
          <div className="mb-4">
            <p className="text-sm mb-2">Preview: {selectedProductData.name}</p>
            <div className="border border-slate-700 rounded-md overflow-hidden bg-slate-900 h-48 flex items-center justify-center">
              {designFile ? (
                <img
                  src={URL.createObjectURL(designFile)}
                  alt="Design preview"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="text-center p-4">
                  {selectedProduct === "keychain" && (
                    <img
                      src="https://images.unsplash.com/photo-1611490616424-a4e09e8c5c03?w=400&q=80"
                      alt="Example of keychain"
                      className="max-h-full max-w-full object-contain mx-auto"
                    />
                  )}
                  <p className="text-sm text-muted-foreground mt-2">
                    Example of {selectedProductData.name.toLowerCase()}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="border-2 border-dashed border-slate-700 rounded-md p-8 text-center bg-slate-900">
            <div className="flex flex-col items-center justify-center">
              <Upload className="h-10 w-10 text-purple-400 mb-4" />
              <p className="mb-2 text-sm font-medium">
                Drop your file here or click to browse
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                SVG files preferred for best results. PNG, JPG also accepted.
              </p>
              <Button
                variant="secondary"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                Choose File
              </Button>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".svg,.png,.jpg,.jpeg"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button
          onClick={handleSubmit}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2"
          disabled={!selectedProduct}
        >
          Submit Custom Order
        </Button>
      </div>
    </div>
  );
};

export default ProductCustomizer;
