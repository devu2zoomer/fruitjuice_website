const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Thin wrapper around fetch() that adds the JSON content type, attaches
 * the stored JWT (if any), and normalizes error handling.
 */
async function request(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    throw new Error("Could not reach the server. Please check your connection and try again.");
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // no JSON body (e.g. 204) — leave data as null
  }

  if (!res.ok) {
    throw new Error((data && data.message) || `Request failed (${res.status})`);
  }

  return data;
}

export const api = {
  register: (payload) => request("/auth/register", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),
  me: (token) => request("/auth/me", { token }),

  adminDashboard: (token) => request("/admin/dashboard", { token }),
  adminUsers: (token, page = 1) => request(`/admin/users?page=${page}`, { token }),

  // Storefront (public)
  products: () => request("/products"),

  // Admin product management
  adminProducts: (token) => request("/admin/products", { token }),
  adminCreateProduct: (token, payload) =>
    request("/admin/products", { method: "POST", body: payload, token }),
  adminUpdateProduct: (token, id, payload) =>
    request(`/admin/products/${id}`, { method: "PUT", body: payload, token }),
  adminDeleteProduct: (token, id) =>
    request(`/admin/products/${id}`, { method: "DELETE", token }),

  // Cart (requires auth)
  getCart: (token) => request("/cart", { token }),
  addCartItem: (token, productId, quantity = 1) =>
    request("/cart/items", { method: "POST", body: { productId, quantity }, token }),
  updateCartItem: (token, productId, quantity) =>
    request(`/cart/items/${productId}`, { method: "PUT", body: { quantity }, token }),
  removeCartItem: (token, productId) =>
    request(`/cart/items/${productId}`, { method: "DELETE", token }),
  clearCart: (token) => request("/cart", { method: "DELETE", token }),
  mergeCart: (token, items) => request("/cart/merge", { method: "POST", body: { items }, token }),

  // Contact (public form submission + admin inbox)
  submitContact: (payload) => request("/contact", { method: "POST", body: payload }),
  adminContacts: (token, page = 1) => request(`/admin/contacts?page=${page}`, { token }),
  adminUpdateContactStatus: (token, id, status) =>
    request(`/admin/contacts/${id}`, { method: "PUT", body: { status }, token }),
  adminDeleteContact: (token, id) =>
    request(`/admin/contacts/${id}`, { method: "DELETE", token }),
};
