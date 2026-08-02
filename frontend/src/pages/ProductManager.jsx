import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Package, Upload, ImageOff } from "lucide-react";
import { api } from "../utils/api";

const EMPTY_FORM = {
  name: "",
  flavor: "",
  description: "",
  price: "",
  image: "",
  stock: "",
  isActive: true,
};

export default function ProductManager({ token }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const MAX_IMAGE_BYTES = 3 * 1024 * 1024; // 3MB, keeps base64 payload well under the 5mb JSON limit

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { products } = await api.adminProducts(token);
      setProducts(products);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  function openCreateForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setFormOpen(true);
  }

  function openEditForm(product) {
    setEditingId(product._id);
    setForm({
      name: product.name,
      flavor: product.flavor || "",
      description: product.description || "",
      price: String(product.price),
      image: product.image || "",
      stock: String(product.stock ?? 0),
      isActive: product.isActive,
    });
    setFormError("");
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function handleImageFile(e) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;

    setFormError("");

    if (!file.type.startsWith("image/")) {
      setFormError("Please choose an image file");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setFormError("Image is too large — please choose a file under 3MB");
      return;
    }

    setUploadingImage(true);
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, image: reader.result }));
      setUploadingImage(false);
    };
    reader.onerror = () => {
      setFormError("Failed to read image file");
      setUploadingImage(false);
    };
    reader.readAsDataURL(file);
  }

  function clearImage() {
    setForm((f) => ({ ...f, image: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    if (!form.name.trim() || form.price === "") {
      setFormError("Name and price are required");
      return;
    }
    const price = Number(form.price);
    const stock = form.stock === "" ? 0 : Number(form.stock);
    if (Number.isNaN(price) || price < 0) {
      setFormError("Price must be a valid, non-negative number");
      return;
    }
    if (Number.isNaN(stock) || stock < 0) {
      setFormError("Stock must be a valid, non-negative number");
      return;
    }

    const payload = {
      name: form.name.trim(),
      flavor: form.flavor.trim(),
      description: form.description.trim(),
      price,
      image: form.image.trim(),
      stock,
      isActive: form.isActive,
    };

    setSaving(true);
    try {
      if (editingId) await api.adminUpdateProduct(token, editingId, payload);
      else await api.adminCreateProduct(token, payload);
      closeForm();
      await loadProducts();
    } catch (err) {
      setFormError(err.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(product) {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    try {
      await api.adminDeleteProduct(token, product._id);
      await loadProducts();
    } catch (err) {
      setError(err.message || "Failed to delete product");
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-card border border-white/70 overflow-hidden">
      <div className="px-6 py-5 border-b border-pine/5 flex items-center justify-between">
        <h2 className="font-display font-semibold text-pine flex items-center gap-2">
          <Package size={18} className="text-leaf" />
          Products
        </h2>
        <button
          onClick={openCreateForm}
          className="inline-flex items-center gap-1.5 rounded-pill bg-leaf text-white font-semibold text-sm px-4 py-2 shadow-card hover:bg-leaf-dark transition"
        >
          <Plus size={15} />
          Add Product
        </button>
      </div>

      {error && (
        <p className="mx-6 mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
          {error}
        </p>
      )}

      {/* Add / edit form */}
      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="mx-6 mt-4 p-5 rounded-2xl bg-mist/60 border border-pine/10 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="sm:col-span-2 flex items-center justify-between">
            <h3 className="font-display font-semibold text-pine text-sm">
              {editingId ? "Edit Product" : "New Product"}
            </h3>
            <button type="button" onClick={closeForm} className="text-pine/40 hover:text-pine">
              <X size={16} />
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-pine/70 mb-1.5">Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-pine/10 bg-white px-3 py-2.5 text-sm text-pine outline-none focus:ring-2 focus:ring-leaf transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-pine/70 mb-1.5">Flavor</label>
            <input
              name="flavor"
              value={form.flavor}
              onChange={handleChange}
              className="w-full rounded-xl border border-pine/10 bg-white px-3 py-2.5 text-sm text-pine outline-none focus:ring-2 focus:ring-leaf transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-pine/70 mb-1.5">Price (USD) *</label>
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={handleChange}
              className="w-full rounded-xl border border-pine/10 bg-white px-3 py-2.5 text-sm text-pine outline-none focus:ring-2 focus:ring-leaf transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-pine/70 mb-1.5">Stock</label>
            <input
              name="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={handleChange}
              className="w-full rounded-xl border border-pine/10 bg-white px-3 py-2.5 text-sm text-pine outline-none focus:ring-2 focus:ring-leaf transition"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-pine/70 mb-1.5">Image URL</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-xl border border-pine/10 bg-white px-3 py-2.5 text-sm text-pine outline-none focus:ring-2 focus:ring-leaf transition"
            />

            <div className="flex items-center gap-3 my-3">
              <div className="h-px flex-1 bg-pine/10" />
              <span className="text-[11px] font-semibold text-pine/40 uppercase tracking-wide">
                or upload from device
              </span>
              <div className="h-px flex-1 bg-pine/10" />
            </div>

            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-pine/20 bg-white px-3 py-2.5 text-sm text-pine/70 cursor-pointer hover:border-leaf hover:text-leaf transition">
                {uploadingImage ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Upload size={15} />
                )}
                {uploadingImage ? "Reading..." : "Choose image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                  className="hidden"
                  disabled={uploadingImage}
                />
              </label>

              {form.image ? (
                <div className="flex items-center gap-2">
                  <img
                    src={form.image}
                    alt="Product preview"
                    className="h-12 w-12 rounded-lg object-cover border border-pine/10"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="text-xs font-medium text-pine/50 hover:text-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs text-pine/30">
                  <ImageOff size={14} />
                  No image set
                </span>
              )}
            </div>
            <p className="mt-1.5 text-[11px] text-pine/40">
              Paste a URL above, or upload a file here if you don't have one (max 3MB). Uploading
              replaces the URL field.
            </p>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-pine/70 mb-1.5">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={2}
              className="w-full rounded-xl border border-pine/10 bg-white px-3 py-2.5 text-sm text-pine outline-none focus:ring-2 focus:ring-leaf transition resize-none"
            />
          </div>

          <label className="sm:col-span-2 flex items-center gap-2 text-sm text-pine/70">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="h-4 w-4 rounded accent-leaf"
            />
            Visible in storefront
          </label>

          {formError && (
            <p className="sm:col-span-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
              {formError}
            </p>
          )}

          <div className="sm:col-span-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeForm}
              className="text-sm font-medium text-pine/60 hover:text-pine px-4 py-2.5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploadingImage}
              className="inline-flex items-center gap-2 rounded-pill bg-leaf text-white font-semibold text-sm px-6 py-2.5 shadow-card hover:bg-leaf-dark transition disabled:opacity-60"
            >
              {saving && <Loader2 size={15} className="animate-spin" />}
              {editingId ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      )}

      {/* Product table */}
      <div className="overflow-x-auto mt-4">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-pine/40">
            <Loader2 size={24} className="animate-spin" />
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-pine/40 text-xs uppercase tracking-wide">
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Stock</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t border-pine/5">
                  <td className="px-6 py-3.5">
                    <p className="text-pine font-medium">{product.name}</p>
                    {product.flavor && <p className="text-pine/40 text-xs">{product.flavor}</p>}
                  </td>
                  <td className="px-6 py-3.5 text-pine/70">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-3.5 text-pine/70">{product.stock}</td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex rounded-pill px-2.5 py-1 text-xs font-semibold ${
                        product.isActive ? "bg-leaf-light text-leaf-dark" : "bg-pine/5 text-pine/40"
                      }`}
                    >
                      {product.isActive ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => openEditForm(product)}
                        className="text-pine/50 hover:text-leaf transition"
                        aria-label="Edit product"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="text-pine/50 hover:text-red-600 transition"
                        aria-label="Delete product"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-pine/40">
                    No products yet — add your first one above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
