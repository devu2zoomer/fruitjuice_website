const Cart = require("../models/Cart");
const Product = require("../models/Product");

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
}

function serializeCart(cart) {
  const items = cart.items
    .filter((item) => item.product) // drop items whose product was deleted
    .map((item) => ({
      product: item.product,
      quantity: item.quantity,
      subtotal: Number((item.product.price * item.quantity).toFixed(2)),
    }));

  const total = Number(items.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2));
  return { items, total };
}

// @route GET /api/cart
async function getCart(req, res) {
  try {
    const cart = await getOrCreateCart(req.user._id);
    await cart.populate("items.product");
    return res.status(200).json(serializeCart(cart));
  } catch (err) {
    return res.status(500).json({ message: "Failed to load cart", error: err.message });
  }
}

// @route POST /api/cart/items
// @desc  Add a product to the cart, or increase its quantity if already present
async function addItem(req, res) {
  try {
    const { productId, quantity } = req.body;
    const qty = Number(quantity) || 1;

    if (!productId || qty < 1) {
      return res.status(400).json({ message: "productId and a positive quantity are required" });
    }

    const product = await Product.findOne({ _id: productId, isActive: true });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const cart = await getOrCreateCart(req.user._id);
    const existing = cart.items.find((item) => item.product.toString() === productId);

    if (existing) existing.quantity += qty;
    else cart.items.push({ product: productId, quantity: qty });

    await cart.save();
    await cart.populate("items.product");
    return res.status(200).json(serializeCart(cart));
  } catch (err) {
    return res.status(500).json({ message: "Failed to add item to cart", error: err.message });
  }
}

// @route PUT /api/cart/items/:productId
// @desc  Set the exact quantity for a product already in the cart
async function updateItem(req, res) {
  try {
    const { productId } = req.params;
    const qty = Number(req.body.quantity);

    if (!qty || qty < 1) {
      return res.status(400).json({ message: "quantity must be at least 1 (use DELETE to remove)" });
    }

    const cart = await getOrCreateCart(req.user._id);
    const existing = cart.items.find((item) => item.product.toString() === productId);
    if (!existing) return res.status(404).json({ message: "Item not found in cart" });

    existing.quantity = qty;
    await cart.save();
    await cart.populate("items.product");
    return res.status(200).json(serializeCart(cart));
  } catch (err) {
    return res.status(500).json({ message: "Failed to update cart item", error: err.message });
  }
}

// @route DELETE /api/cart/items/:productId
async function removeItem(req, res) {
  try {
    const { productId } = req.params;
    const cart = await getOrCreateCart(req.user._id);
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await cart.save();
    await cart.populate("items.product");
    return res.status(200).json(serializeCart(cart));
  } catch (err) {
    return res.status(500).json({ message: "Failed to remove cart item", error: err.message });
  }
}

// @route DELETE /api/cart
async function clearCart(req, res) {
  try {
    const cart = await getOrCreateCart(req.user._id);
    cart.items = [];
    await cart.save();
    return res.status(200).json(serializeCart(cart));
  } catch (err) {
    return res.status(500).json({ message: "Failed to clear cart", error: err.message });
  }
}

// @route POST /api/cart/merge
// @desc  Merge a guest (localStorage) cart into the user's server cart on login.
//        Body: { items: [{ productId, quantity }] }
async function mergeCart(req, res) {
  try {
    const incoming = Array.isArray(req.body.items) ? req.body.items : [];
    const cart = await getOrCreateCart(req.user._id);

    for (const { productId, quantity } of incoming) {
      const qty = Number(quantity) || 0;
      if (!productId || qty < 1) continue;

      const existing = cart.items.find((item) => item.product.toString() === productId);
      if (existing) existing.quantity = Math.max(existing.quantity, qty);
      else cart.items.push({ product: productId, quantity: qty });
    }

    await cart.save();
    await cart.populate("items.product");
    return res.status(200).json(serializeCart(cart));
  } catch (err) {
    return res.status(500).json({ message: "Failed to merge cart", error: err.message });
  }
}

module.exports = { getCart, addItem, updateItem, removeItem, clearCart, mergeCart };
