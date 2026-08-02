import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { useAuth } from "./AuthContext";
import { api } from "../utils/api";

const CartContext = createContext(null);
const GUEST_STORAGE_KEY = "dafresh_cart_guest";

function readGuestCart() {
  try {
    const raw = localStorage.getItem(GUEST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeGuestCart(items) {
  localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(items));
}

function computeTotal(items) {
  return Number(items.reduce((sum, i) => sum + i.product.price * i.quantity, 0).toFixed(2));
}

// Fallback/demo products (e.g. the static juice lineup shown when the
// backend has no products yet) use ids like "fallback-orange" instead of
// real Mongo ObjectIds. The server cart doesn't know about them, so those
// items must always be kept in the local guest cart — even for logged-in
// users — instead of being sent to the API.
function isRealProductId(id) {
  return typeof id === "string" && /^[a-f\d]{24}$/i.test(id);
}

export function CartProvider({ children }) {
  const { token, isAuthenticated } = useAuth();
  const [items, setItems] = useState([]); // [{ product, quantity, subtotal }]
  const [loading, setLoading] = useState(false);
  const mergedForToken = useRef(null); // avoids re-merging the same session repeatedly

  // Guest mode: load whatever was saved locally
  useEffect(() => {
    if (!isAuthenticated) {
      setItems(readGuestCart());
    }
  }, [isAuthenticated]);

  // On login: merge the guest cart into the server cart, then take over from the server
  useEffect(() => {
    if (!isAuthenticated || !token) return;
    if (mergedForToken.current === token) return;
    mergedForToken.current = token;

    async function syncOnLogin() {
      setLoading(true);
      try {
        const guestItems = readGuestCart();
        const realGuestItems = guestItems.filter((i) => isRealProductId(i.product._id));
        const fallbackGuestItems = guestItems.filter((i) => !isRealProductId(i.product._id));

        if (realGuestItems.length > 0) {
          await api.mergeCart(
            token,
            realGuestItems.map((i) => ({ productId: i.product._id, quantity: i.quantity }))
          );
        }
        writeGuestCart(fallbackGuestItems);

        const server = await api.getCart(token);
        setItems([...server.items, ...fallbackGuestItems]);
      } catch {
        // Non-fatal — keep whatever local state we had
      } finally {
        setLoading(false);
      }
    }
    syncOnLogin();
  }, [isAuthenticated, token]);

  const addItem = useCallback(
    async (product, quantity = 1) => {
      if (isAuthenticated && token && isRealProductId(product._id)) {
        setLoading(true);
        try {
          const server = await api.addCartItem(token, product._id, quantity);
          setItems(server.items);
        } finally {
          setLoading(false);
        }
        return;
      }
      setItems((prev) => {
        const existing = prev.find((i) => i.product._id === product._id);
        const next = existing
          ? prev.map((i) =>
              i.product._id === product._id ? { ...i, quantity: i.quantity + quantity } : i
            )
          : [...prev, { product, quantity }];
        writeGuestCart(next);
        return next;
      });
    },
    [isAuthenticated, token]
  );

  const updateQuantity = useCallback(
    async (productId, quantity) => {
      if (quantity < 1) return;
      if (isAuthenticated && token && isRealProductId(productId)) {
        setLoading(true);
        try {
          const server = await api.updateCartItem(token, productId, quantity);
          setItems(server.items);
        } finally {
          setLoading(false);
        }
        return;
      }
      setItems((prev) => {
        const next = prev.map((i) => (i.product._id === productId ? { ...i, quantity } : i));
        writeGuestCart(next);
        return next;
      });
    },
    [isAuthenticated, token]
  );

  const removeItem = useCallback(
    async (productId) => {
      if (isAuthenticated && token && isRealProductId(productId)) {
        setLoading(true);
        try {
          const server = await api.removeCartItem(token, productId);
          setItems(server.items);
        } finally {
          setLoading(false);
        }
        return;
      }
      setItems((prev) => {
        const next = prev.filter((i) => i.product._id !== productId);
        writeGuestCart(next);
        return next;
      });
    },
    [isAuthenticated, token]
  );

  const clearCart = useCallback(async () => {
    if (isAuthenticated && token) {
      setLoading(true);
      try {
        await api.clearCart(token);
      } finally {
        setLoading(false);
      }
    } else {
      writeGuestCart([]);
    }
    setItems([]);
  }, [isAuthenticated, token]);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = computeTotal(items);

  const value = { items, itemCount, total, loading, addItem, updateQuantity, removeItem, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
