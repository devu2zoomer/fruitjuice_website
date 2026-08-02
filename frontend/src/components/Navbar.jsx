import { useState } from "react";
import { Menu, X, User, LogOut, LayoutDashboard, ShoppingCart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const LINKS = [
  {
    label: "Home",
    href: "#home"
  },
  {
    label: "Products",
    href: "#/shop"
  },
  {
    label: "Reviews",
    href: "#reviews"
  },
  {
    label: "Contact",
    href: "#/contact"
  }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <header
      className="
fixed
top-4
left-0
right-0
z-50
px-4
sm:px-6
"
    >
      <nav
        className="
anim-fade-down
mx-auto
max-w-6xl
rounded-pill
bg-white/70
backdrop-blur-xl
border
border-white/70
shadow-soft
px-5
sm:px-6
py-3
flex
items-center
justify-between
"
        style={{ "--delay": "0.2s" }}
      >
        {/* LOGO */}
        <a
          href="#home"
          className="
flex
items-center
gap-2
"
        >
          <div
            className="
h-9
w-9
rounded-full
bg-leaf
flex
items-center
justify-center
"
          >
            <div
              className="
h-4
w-4
rounded-full
bg-citrus
"
            />
          </div>

          <span
            className="
font-display
font-semibold
text-lg
tracking-tight
text-pine
"
          >
            DA FRESH
          </span>
        </a>

        {/* DESKTOP MENU */}
        <ul
          className="
hidden
md:flex
items-center
gap-8
font-body
text-sm
font-medium
text-pine/80
"
        >
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="
hover:text-leaf
transition-colors
"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div
          className="
flex
items-center
gap-3
"
        >
          {/* SHOP BUTTON */}
          <a
            href="#/shop"
            className="
hidden
sm:inline-flex
rounded-pill
bg-leaf
text-white
font-semibold
text-sm
px-6
py-2.5
shadow-card
hover:bg-leaf-dark
transition
"
          >
            Shop Now
          </a>

          {/* CART */}
          <a
            href="#/cart"
            className="relative h-10 w-10 rounded-full bg-white/80 flex items-center justify-center text-pine hover:text-leaf transition"
            aria-label="View cart"
          >
            <ShoppingCart size={18} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-[18px] min-w-[18px] px-1 rounded-full bg-citrus text-white text-[10px] font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </a>

          {/* ACCOUNT CONTROLS */}
          {isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-3">
              {isAdmin && (
                <a
                  href="#/admin"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-pine/70 hover:text-leaf transition"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </a>
              )}
              <button
                onClick={logout}
                title={user?.name}
                className="h-10 w-10 rounded-full bg-white/80 flex items-center justify-center text-pine hover:text-red-600 transition"
                aria-label="Log out"
              >
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <a
              href="#/login"
              className="hidden sm:inline-flex h-10 w-10 rounded-full bg-white/80 items-center justify-center text-pine hover:text-leaf transition"
              aria-label="Log in"
            >
              <User size={18} />
            </a>
          )}

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
            className="
md:hidden
h-10
w-10
rounded-full
bg-white/80
flex
items-center
justify-center
text-pine
"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE DROPDOWN */}
      <div
        className={`mobile-nav-panel ${open ? "is-open" : ""}
md:hidden
mx-auto
max-w-6xl
mt-2
rounded-3xl
bg-white/80
backdrop-blur-xl
border
border-white/70
shadow-soft
`}
      >
        <ul
          className="
flex
flex-col
p-4
gap-2
font-body
text-pine
"
        >
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="
block
px-4
py-3
rounded-xl
hover:bg-leaf-light
transition
"
              >
                {link.label}
              </a>
            </li>
          ))}

          <li>
            <a
              href="#/shop"
              onClick={() => setOpen(false)}
              className="
block
text-center
rounded-pill
bg-leaf
text-white
font-semibold
px-5
py-3
"
            >
              Shop Now
            </a>
          </li>

          <li>
            <a
              href="#/cart"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-leaf-light transition"
            >
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="h-5 min-w-[20px] px-1 rounded-full bg-citrus text-white text-xs font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </a>
          </li>

          {isAuthenticated ? (
            <>
              {isAdmin && (
                <li>
                  <a
                    href="#/admin"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-xl hover:bg-leaf-light transition"
                  >
                    Dashboard
                  </a>
                </li>
              )}
              <li>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-leaf-light transition"
                >
                  Log out
                </button>
              </li>
            </>
          ) : (
            <li>
              <a
                href="#/login"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl hover:bg-leaf-light transition"
              >
                Log In
              </a>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
