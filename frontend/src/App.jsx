import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { useHashRoute } from "./utils/useHashRoute";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Story from "./components/Story";
import FlavorReveal from "./components/FlavorReveal";
import Shop from "./components/Shop";
import Products from "./components/Products";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Cart from "./pages/Cart";
import ProductsPage from "./pages/ProductsPage";
import ContactPage from "./pages/ContactPage";

function Landing() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <Story />
        <FlavorReveal />
        <Shop />
        <Products />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  const [route, navigate] = useHashRoute();

  if (route === "/login") return <Login navigate={navigate} />;
  if (route === "/admin") return <AdminDashboard navigate={navigate} />;
  if (route === "/cart") return <Cart navigate={navigate} />;
  if (route === "/shop") return <ProductsPage navigate={navigate} />;
  if (route === "/contact") return <ContactPage navigate={navigate} />;
  return <Landing />;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router />
      </CartProvider>
    </AuthProvider>
  );
}
