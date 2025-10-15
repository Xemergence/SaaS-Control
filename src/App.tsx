import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductStore from "./pages/ProductStore";
import Navigation from "./components/Navigation";
import NFCKeychains from "./pages/NFCKeychains";

function App() {
  return (
    <div className="min-h-screen bg-[#121219] text-white">
      <Navigation />
      <main>
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
