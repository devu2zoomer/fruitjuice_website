import { useState } from "react";
import { ShoppingCart, Loader2, Check } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  async function handleAdd() {
    setAdding(true);
    try {
      await addItem(product, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white shadow-card border border-black/5 flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-leaf-light flex items-center justify-center text-leaf-dark font-display text-xl">
            {product.name}
          </div>
        )}
        {product.stock <= 0 && (
          <span className="absolute top-3 left-3 rounded-pill bg-ink/80 text-white text-xs font-semibold px-3 py-1">
            Out of stock
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        {product.flavor && <p className="eyebrow text-leaf mb-1">{product.flavor}</p>}
        <h3 className="font-display font-semibold text-xl text-pine mb-1">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-pine/60 leading-relaxed mb-4 flex-1">{product.description}</p>
        )}

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="font-display font-semibold text-lg text-pine">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            disabled={adding || product.stock <= 0}
            className="inline-flex items-center gap-1.5 rounded-pill bg-leaf text-white font-semibold text-sm px-5 py-2.5 shadow-card hover:bg-leaf-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {adding ? (
              <Loader2 size={15} className="animate-spin" />
            ) : added ? (
              <Check size={15} />
            ) : (
              <ShoppingCart size={15} />
            )}
            {added ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
