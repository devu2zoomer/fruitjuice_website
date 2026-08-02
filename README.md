# Da Fresh — MERN Auth & Admin Dashboard

This adds a full MERN backend, a **user login/sign-up page**, and an **admin
dashboard** on top of the existing "Da Fresh" React frontend.

```
G/
├── backend/     Express + MongoDB API (auth, JWT, roles)
└── frontend/    Existing Vite/React site + new Login & Admin pages
```

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
- `MONGO_URI` — your local MongoDB or MongoDB Atlas connection string
- `JWT_SECRET` — any long random string
- `CLIENT_ORIGIN` — the frontend URL (default `http://localhost:5173`)
- `ADMIN_NAME` / `ADMIN_EMAIL` / `ADMIN_PASSWORD` — used only by the seed script below

Create the first admin account (regular sign-ups are always created as `role: "user"`,
so an admin has to be seeded once):

```bash
npm run seed:admin
```

Start the API:

```bash
npm run dev      # nodemon, auto-restarts on changes
# or
npm start
```

The API runs on `http://localhost:5000` by default, with routes under `/api`.

### Interactive API docs (Swagger UI)

Once the server is running, open:

```
http://localhost:5000/api/docs
```

to browse and try every endpoint from the browser — including the "Authorize"
button, where you paste the JWT from `/auth/login` to call protected routes.
The raw OpenAPI JSON is at `http://localhost:5000/api/docs.json`.

| Method | Route                        | Auth           | Description                          |
|--------|-------------------------------|----------------|----------------------------------------|
| POST   | `/api/auth/register`          | Public         | Create a user account                  |
| POST   | `/api/auth/login`             | Public         | Log in, returns JWT + user             |
| GET    | `/api/auth/me`                | Bearer token   | Current user profile                   |
| GET    | `/api/products`               | Public         | List active products (storefront)      |
| GET    | `/api/products/:id`           | Public         | Single active product                  |
| GET    | `/api/cart`                   | Bearer token   | Get the current user's cart            |
| POST   | `/api/cart/items`              | Bearer token   | Add a product to the cart              |
| PUT    | `/api/cart/items/:productId`   | Bearer token   | Set an item's quantity                 |
| DELETE | `/api/cart/items/:productId`   | Bearer token   | Remove an item                         |
| DELETE | `/api/cart`                    | Bearer token   | Clear the cart                         |
| POST   | `/api/cart/merge`              | Bearer token   | Merge a guest cart in on login         |
| GET    | `/api/admin/dashboard`        | Admin token    | Account + product stats, recent users  |
| GET    | `/api/admin/users`            | Admin token    | Paginated user list                    |
| GET    | `/api/admin/products`         | Admin token    | List every product (incl. hidden)      |
| POST   | `/api/admin/products`         | Admin token    | Create a product                       |
| PUT    | `/api/admin/products/:id`     | Admin token    | Update a product                       |
| DELETE | `/api/admin/products/:id`     | Admin token    | Delete a product                       |

Seed the storefront with the site's three flavors as real products:

```bash
npm run seed:products
```

## 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_URL, defaults to http://localhost:5000/api
npm run dev
```

New routes (hash-based, no extra router dependency was added):

- `#/` — the existing marketing site, now with a **Shop** section that loads
  products from the API and lets you add them to your cart
- `#/login` — login / sign-up form (used by both regular users and the admin)
- `#/cart` — view/edit cart items, change quantities, remove items
- `#/admin` — admin dashboard; redirects to `#/login` if not authenticated,
  or `#/` if logged in but not an admin. Has two tabs:
  - **Overview** — account + product stats, recent/all users
  - **Products** — full CRUD for the catalog (create, edit, delete, show/hide)

The navbar shows a cart icon with a live item count, a **Log In** icon when
signed out, and a **Dashboard** link (admins only) + **Log out** button when
signed in.

### How the cart works
- Signed-out visitors get a cart stored in `localStorage` so they can shop
  before creating an account.
- Once a user logs in, that local cart is merged into their server-side cart
  (`POST /api/cart/merge`) and all further changes are persisted to MongoDB,
  so the cart follows them across devices/sessions.

## 3. How auth works

- Passwords are hashed with bcrypt before being stored (`backend/models/User.js`).
- Login/register return a JWT, stored in the browser via `localStorage`
  (`frontend/src/context/AuthContext.jsx`) and sent as `Authorization: Bearer <token>`.
- `backend/middleware/authMiddleware.js` verifies the token (`protect`) and
  restricts routes to a role, e.g. `authorize("admin")` on every `/api/admin/*` route.
- There's no public "become an admin" endpoint — the only way to create an
  admin is the `npm run seed:admin` script, which is intentional.

## Notes

- MongoDB must be running locally (`mongod`) or you can point `MONGO_URI` at
  a MongoDB Atlas cluster.
- This build environment has no network access, so dependencies could not be
  installed or `npm run build` verified end-to-end here — run `npm install`
  in both `backend/` and `frontend/` on your machine.
