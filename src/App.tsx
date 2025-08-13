import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductStore from "./pages/ProductStore";
import Navigation from "./components/Navigation";

// Conditionally create TempoRoutes component only when VITE_TEMPO is enabled
const TempoRoutes =
  import.meta.env.VITE_TEMPO === "true"
    ? lazy(() => {
        // Use eval to prevent Rollup from analyzing this import at build time
        const importPath = "tempo-routes";
        return eval(`import("${importPath}")`)
          .then((routes) => ({
            default: () => useRoutes(routes.default),
          }))
          .catch((error) => {
            console.warn("Failed to load tempo routes:", error);
            return { default: () => null };
          });
      })
    : () => null;

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen w-screen bg-[#121219]">
          <p className="text-white">Loading...</p>
        </div>
      }
    >
      <div className="min-h-screen bg-[#121219] text-white">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/3d-products" element={<ProductStore />} />
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && <TempoRoutes />}
        </main>
      </div>
    </Suspense>
  );
}

export default App;
