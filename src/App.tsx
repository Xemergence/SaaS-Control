import { useRoutes, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import ProductStore from "./pages/ProductStore";
import Navigation from "./components/Navigation";

function App() {
  const [routes, setRoutes] = useState<any>(null);

  useEffect(() => {
    if (import.meta.env.VITE_TEMPO === "true") {
      import("tempo-routes")
        .then((module) => {
          setRoutes(module.default);
        })
        .catch((error) => {
          console.warn("Failed to load tempo routes:", error);
        });
    }
  }, []);
  return (
    <div className="min-h-screen bg-[#121219] text-white">
      <Navigation />
      <main>
        {/* Tempo routes - must come first to catch storyboard routes */}
        {import.meta.env.VITE_TEMPO === "true" && routes && useRoutes(routes)}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/3d-products" element={<ProductStore />} />

          {/* Add tempo route fallback */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" element={<div />} />
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;
