const Product = require("../models/Product");

// @route GET /api/products
// @desc  Public: list active products (storefront)
async function listProducts(req, res) {
  try {
    const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });
    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ message: "Failed to load products", error: err.message });
  }
}

// @route GET /api/products/:id
// @desc  Public: single active product
async function getProduct(req, res) {
  try {
    const product = await Product.findOne({ _id: req.params.id, isActive: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ product });
  } catch (err) {
    return res.status(400).json({ message: "Invalid product id" });
  }
}

// @route GET /api/admin/products
// @desc  Admin: list every product, including inactive ones
async function adminListProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ message: "Failed to load products", error: err.message });
  }
}

// @route POST /api/admin/products
// @desc  Admin: create a product
async function createProduct(req, res) {
  try {
    const { name, flavor, description, price, image, stock, isActive } = req.body;

    if (!name || price === undefined || price === null) {
      return res.status(400).json({ message: "Name and price are required" });
    }
    if (Number(price) < 0) {
      return res.status(400).json({ message: "Price cannot be negative" });
    }

    const product = await Product.create({
      name,
      flavor,
      description,
      price,
      image,
      stock: stock ?? 0,
      isActive: isActive ?? true,
    });

    return res.status(201).json({ product });
  } catch (err) {
    return res.status(500).json({ message: "Failed to create product", error: err.message });
  }
}

// @route PUT /api/admin/products/:id
// @desc  Admin: update a product
async function updateProduct(req, res) {
  try {
    const { name, flavor, description, price, image, stock, isActive } = req.body;

    if (price !== undefined && Number(price) < 0) {
      return res.status(400).json({ message: "Price cannot be negative" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (name !== undefined) product.name = name;
    if (flavor !== undefined) product.flavor = flavor;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (image !== undefined) product.image = image;
    if (stock !== undefined) product.stock = stock;
    if (isActive !== undefined) product.isActive = isActive;

    await product.save();
    return res.status(200).json({ product });
  } catch (err) {
    return res.status(500).json({ message: "Failed to update product", error: err.message });
  }
}

// @route DELETE /api/admin/products/:id
// @desc  Admin: delete a product
async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
}

module.exports = {
  listProducts,
  getProduct,
  adminListProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
