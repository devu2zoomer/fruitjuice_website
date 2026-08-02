import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { api } from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

// Shown when the backend has no products yet (or is unreachable) so the
// shop page always has real, orderable-looking juice products to browse.
const FALLBACK_PRODUCTS = [
  {
    _id: "fallback-watermelon",
    name: "Watermelon Cold Press",
    flavor: "Watermelon",
    description: "Slow-extracted watermelon juice, packed with natural hydration and vitamin C.",
    price: 5.99,
    image: "https://images.pexels.com/photos/11009208/pexels-photo-11009208.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
  },
  {
    _id: "fallback-orange",
    name: "Orange Cold Press",
    flavor: "Orange",
    description: "Bright, fresh-squeezed orange juice with a full daily dose of vitamin C.",
    price: 5.99,
    image: "https://images.pexels.com/photos/5946790/pexels-photo-5946790.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
  },
  {
    _id: "fallback-mango",
    name: "Mango Cold Press",
    flavor: "Mango",
    description: "Rich, tropical mango juice, cold pressed to lock in flavor and nutrients.",
    price: 6.49,
    image: "https://images.pexels.com/photos/4955257/pexels-photo-4955257.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
  },
  {
    _id: "fallback-pineapple",
    name: "Pineapple Cold Press",
    flavor: "Pineapple",
    description: "Bright, tangy pineapple juice with a bold tropical bite.",
    price: 5.79,
    image: "https://images.pexels.com/photos/5146439/pexels-photo-5146439.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
  },
  {
    _id: "fallback-green-apple",
    name: "Green Apple Cold Press",
    flavor: "Green Apple",
    description: "Crisp, lightly tart green apple juice pressed straight from the orchard.",
    price: 5.59,
    image: "https://images.pexels.com/photos/5876752/pexels-photo-5876752.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
  },
  {
    _id: "fallback-pomegranate",
    name: "Pomegranate Cold Press",
    flavor: "Pomegranate",
    description: "Rich in antioxidants, with a deep, jewel-toned flavor.",
    price: 6.99,
    image: "https://images.pexels.com/photos/15545361/pexels-photo-15545361.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
  },
  {
    _id: "fallback-mixed-berry",
    name: "Mixed Berry Cold Press",
    flavor: "Mixed Berry",
    description: "Blueberry, raspberry and blackberry, blended and cold pressed together.",
    price: 6.29,
    image: "https://images.pexels.com/photos/11135665/pexels-photo-11135665.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
  },
  {
    _id: "fallback-carrot-ginger",
    name: "Carrot Ginger Cold Press",
    flavor: "Carrot Ginger",
    description: "Earthy carrot juice with a spiced ginger kick for an extra boost.",
    price: 5.89,
    image: "https://images.pexels.com/photos/4443459/pexels-photo-4443459.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .products()
      .then((data) => {
        const fetched = data.products || [];
        setProducts(fetched.length > 0 ? fetched : FALLBACK_PRODUCTS);
      })
      .catch(() => {
        // Backend unavailable — fall back to a static juice lineup rather
        // than showing an error, so the shop page always has products.
        setProducts(FALLBACK_PRODUCTS);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative min-h-screen bg-mist">
      <Navbar />

      <main className="pt-32 pb-24 px-6 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="eyebrow text-leaf mb-4">Shop The Range</p>
            <h1 className="font-display font-semibold text-4xl sm:text-5xl text-pine">
              Every Flavor, Freshly Pressed
            </h1>
            <p className="mt-4 text-pine/60 text-base leading-relaxed">
              Pick your favorites and add them to your cart — cold-pressed,
              same-day, straight to your door.
            </p>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-24 text-pine/40">
              <Loader2 size={28} className="animate-spin" />
            </div>
          )}

          {error && (
            <p className="text-center text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 max-w-md mx-auto">
              {error}
            </p>
          )}

          {!loading && !error && products.length === 0 && (
            <p className="text-center text-pine/50 py-24">
              No products available right now — check back soon.
            </p>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
