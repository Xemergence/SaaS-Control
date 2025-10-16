import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductStore from "./pages/ProductStore";
import Navigation from "./components/Navigation";
import NFCKeychains from "./pages/NFCKeychains";

function App() {
  return (
    <div className="app-shell isolate flex min-h-screen flex-col text-foreground transition-colors duration-300">
      <Navigation />
      <main className="relative z-10 flex-1 pb-24 md:pb-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/3d-products" element={<ProductStore />} />
          <Route path="/nfc-keychains" element={<NFCKeychains />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
