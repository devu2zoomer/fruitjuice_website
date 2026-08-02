const swaggerJSDoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 5000;

const definition = {
  openapi: "3.0.3",
  info: {
    title: "Da Fresh API",
    version: "1.0.0",
    description:
      "REST API for the Da Fresh MERN app: user auth, roles, product catalog, cart, and the admin dashboard.",
  },
  servers: [{ url: `http://localhost:${PORT}/api`, description: "Local server" }],
  tags: [
    { name: "Auth", description: "Registration, login, current user" },
    { name: "Products", description: "Public storefront catalog" },
    { name: "Cart", description: "Logged-in user's shopping cart" },
    { name: "Admin", description: "Admin-only: dashboard stats, users, product management" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: 'Paste the token returned by /auth/login or /auth/register, e.g. just the raw JWT (the "Bearer " prefix is added automatically).',
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string", example: "665f1c2e9b1e8a0012a34567" },
          name: { type: "string", example: "Jane Doe" },
          email: { type: "string", example: "jane@example.com" },
          role: { type: "string", enum: ["user", "admin"], example: "user" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      AuthResponse: {
        type: "object",
        properties: {
          token: { type: "string", example: "eyJhbGciOiJIUzI1NiIs..." },
          user: { $ref: "#/components/schemas/User" },
        },
      },
      RegisterRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string", example: "Jane Doe" },
          email: { type: "string", example: "jane@example.com" },
          password: { type: "string", format: "password", example: "supersecret" },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", example: "jane@example.com" },
          password: { type: "string", format: "password", example: "supersecret" },
        },
      },
      Product: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string", example: "Orange Cold Press" },
          flavor: { type: "string", example: "Orange" },
          description: { type: "string", example: "Bright, fresh-squeezed orange juice." },
          price: { type: "number", example: 5.99 },
          image: { type: "string", example: "https://example.com/orange.jpg" },
          stock: { type: "integer", example: 100 },
          isActive: { type: "boolean", example: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      ProductInput: {
        type: "object",
        required: ["name", "price"],
        properties: {
          name: { type: "string", example: "Orange Cold Press" },
          flavor: { type: "string", example: "Orange" },
          description: { type: "string", example: "Bright, fresh-squeezed orange juice." },
          price: { type: "number", example: 5.99 },
          image: { type: "string", example: "https://example.com/orange.jpg" },
          stock: { type: "integer", example: 100 },
          isActive: { type: "boolean", example: true },
        },
      },
      CartItem: {
        type: "object",
        properties: {
          product: { $ref: "#/components/schemas/Product" },
          quantity: { type: "integer", example: 2 },
          subtotal: { type: "number", example: 11.98 },
        },
      },
      Cart: {
        type: "object",
        properties: {
          items: { type: "array", items: { $ref: "#/components/schemas/CartItem" } },
          total: { type: "number", example: 11.98 },
        },
      },
      DashboardStats: {
        type: "object",
        properties: {
          totalUsers: { type: "integer", example: 42 },
          totalAdmins: { type: "integer", example: 1 },
          totalAccounts: { type: "integer", example: 43 },
          totalProducts: { type: "integer", example: 3 },
          activeProducts: { type: "integer", example: 3 },
          recentUsers: { type: "array", items: { $ref: "#/components/schemas/User" } },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: { type: "string", example: "Something went wrong" },
        },
      },
    },
    responses: {
      Unauthorized: {
        description: "Missing, invalid, or expired token",
        content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
      },
      Forbidden: {
        description: "Authenticated, but lacking the required role",
        content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
      },
      NotFound: {
        description: "Resource not found",
        content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
      },
    },
  },
};

const swaggerSpec = swaggerJSDoc({
  definition,
  apis: ["./routes/*.js"], // JSDoc @swagger blocks live in the route files
});

module.exports = swaggerSpec;
