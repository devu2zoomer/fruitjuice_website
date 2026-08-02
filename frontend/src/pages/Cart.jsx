import { Minus, Plus, Trash2, ShoppingBag, Loader2, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Cart({ navigate }) {
  const { items, total, loading, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <div className="relative min-h-screen bg-mist">
      <Navbar />

      <main className="pt-32 pb-24 px-6 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <button
              onClick={() => navigate("/shop")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-pine/60 hover:text-leaf transition mb-4"
            >
              <ArrowLeft size={15} />
              Continue Shopping
            </button>
            <p className="eyebrow text-leaf mb-3">Your Cart</p>
            <h1 className="font-display font-semibold text-4xl sm:text-5xl text-pine">
              {items.length > 0 ? "Ready to Checkout?" : "Your Cart Is Empty"}
            </h1>
          </div>

          {loading && items.length === 0 && (
            <div className="flex items-center justify-center py-24 text-pine/40">
              <Loader2 size={28} className="animate-spin" />
            </div>
          )}

          {!loading && items.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center py-20 rounded-3xl bg-white border border-black/5 shadow-card">
              <div className="h-16 w-16 rounded-full bg-leaf-light flex items-center justify-center text-leaf mb-5">
                <ShoppingBag size={26} />
              </div>
              <p className="text-pine/60 mb-6 max-w-sm">
                Looks like you haven't added any juices yet. Go grab something fresh.
              </p>
              <button
                onClick={() => navigate("/shop")}
                className="inline-flex items-center gap-1.5 rounded-pill bg-leaf text-white font-semibold text-sm px-6 py-3 shadow-card hover:bg-leaf-dark transition"
              >
                Shop Now
              </button>
            </div>
          )}

          {items.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* ITEMS LIST */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {items.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex items-center gap-4 rounded-3xl bg-white border border-black/5 shadow-card p-4"
                  >
                    <div className="h-20 w-20 shrink-0 rounded-2xl overflow-hidden bg-leaf-light flex items-center justify-center">
                      {item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-leaf-dark font-display text-sm text-center px-1">
                          {item.product.name}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      {item.product.flavor && (
                        <p className="eyebrow text-leaf mb-0.5">{item.product.flavor}</p>
                      )}
                      <h3 className="font-display font-semibold text-base text-pine truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-pine/50">${item.product.price.toFixed(2)} each</p>
                    </div>

                    <div className="flex items-center gap-2 rounded-pill bg-mist px-2 py-1.5">
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        disabled={loading || item.quantity <= 1}
                        className="h-7 w-7 rounded-full bg-white shadow-card flex items-center justify-center text-pine hover:text-leaf transition disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-5 text-center text-sm font-semibold text-pine">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        disabled={loading}
                        className="h-7 w-7 rounded-full bg-white shadow-card flex items-center justify-center text-pine hover:text-leaf transition disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <span className="w-16 text-right font-display font-semibold text-pine">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>

                    <button
                      onClick={() => removeItem(item.product._id)}
                      disabled={loading}
                      className="h-9 w-9 rounded-full flex items-center justify-center text-pine/40 hover:text-red-600 hover:bg-red-50 transition disabled:opacity-40"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => clearCart()}
                  disabled={loading}
                  className="self-start text-sm font-medium text-pine/40 hover:text-red-600 transition mt-2 disabled:opacity-40"
                >
                  Clear Cart
                </button>
              </div>

              {/* SUMMARY */}
              <div className="lg:col-span-1">
                <div className="rounded-3xl bg-white border border-black/5 shadow-card p-6 sticky top-32">
                  <h2 className="font-display font-semibold text-lg text-pine mb-5">
                    Order Summary
                  </h2>

                  <div className="flex items-center justify-between text-sm text-pine/60 mb-2">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-pine/60 mb-4">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>

                  <div className="h-px bg-black/5 my-4" />

                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display font-semibold text-pine">Total</span>
                    <span className="font-display font-semibold text-xl text-pine">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <button
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-pill bg-leaf text-white font-semibold text-sm px-6 py-3.5 shadow-card hover:bg-leaf-dark transition disabled:opacity-50"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : "Checkout"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
