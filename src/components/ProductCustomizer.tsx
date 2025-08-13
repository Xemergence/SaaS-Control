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
  defaultProduct = "art-piece",
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
    <div className="min-h-screen bg-black text-white">
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-12">
          {onBack && (
            <Button
              variant="ghost"
              onClick={handleBack}
              className="mr-4 text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          )}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
              xE
            </div>
            <span className="text-xl font-bold">Custom 3D Print</span>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Create Your Custom 3D Print
          </h1>
          <p className="text-gray-400 text-lg">
            Upload your design and choose what you'd like us to create for you
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Choose Your Item */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-white">
              Choose Your Item
            </h2>
            <div className="space-y-4">
              {productOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all duration-300 border-2 ${
                    selectedProduct === option.id
                      ? "border-purple-500 bg-gray-800/50"
                      : "border-gray-700 bg-gray-900/50 hover:border-gray-600"
                  }`}
                  onClick={() => setSelectedProduct(option.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="text-purple-400 mt-1">
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-white mb-2">
                            {option.name}
                          </h3>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        {option.id === "other" ? (
                          <span className="text-purple-400 font-semibold">
                            Quote
                          </span>
                        ) : (
                          <span className="text-purple-400 font-semibold text-lg">
                            ${option.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column - Upload Your Design */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-white">
              Upload Your Design
            </h2>

            {/* Preview Section */}
            <div className="mb-6">
              <p className="text-sm mb-3 text-gray-400">
                Preview: {selectedProductData.name}
              </p>
              <div className="border-2 border-gray-700 rounded-lg overflow-hidden bg-gray-900 h-64 flex items-center justify-center">
                {designFile ? (
                  <img
                    src={URL.createObjectURL(designFile)}
                    alt="Design preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-center p-6">
                    <img
                      src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80"
                      alt="Example of art piece"
                      className="max-h-full max-w-full object-contain mx-auto rounded-lg"
                    />
                    <p className="text-sm text-gray-400 mt-3">
                      Example of {selectedProductData.name.toLowerCase()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Upload Section */}
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-gray-900/30 hover:bg-gray-900/50 transition-colors">
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-purple-400" />
                </div>
                <p className="mb-2 text-lg font-medium text-white">
                  Drop your file here or click to browse
                </p>
                <p className="text-sm text-gray-400 mb-6">
                  SVG files preferred for best results. PNG, JPG also accepted.
                </p>
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
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

            {/* Selected Product Info */}
            <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
              <h3 className="font-semibold text-white mb-2">
                Selected: {selectedProductData.name}
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                {selectedProductData.description}
              </p>
              <p className="text-purple-400 font-semibold text-lg">
                Starting at ${selectedProductData.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-12 text-center">
          <Button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={!selectedProduct}
          >
            Submit Custom Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCustomizer;
