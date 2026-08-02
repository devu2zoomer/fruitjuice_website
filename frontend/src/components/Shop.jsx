import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { api } from "../utils/api";
import ProductCard from "./ProductCard";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .products()
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err.message || "Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && !error && products.length === 0) return null;

  return (
    <section id="shop" className="py-28 px-6 sm:px-10 bg-mist">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="eyebrow text-leaf mb-4">Shop</p>
          <h2 className="font-display font-semibold text-4xl sm:text-5xl text-pine">
            Grab a Bottle
          </h2>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16 text-pine/40">
            <Loader2 size={26} className="animate-spin" />
          </div>
        )}

        {error && (
          <p className="text-center text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 max-w-md mx-auto">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {!loading && !error && products.length > 3 && (
          <div className="text-center mt-12">
            <a
              href="#/shop"
              className="inline-flex rounded-pill bg-leaf text-white font-semibold text-sm px-7 py-3.5 shadow-card hover:bg-leaf-dark transition"
            >
              View All Flavors
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
