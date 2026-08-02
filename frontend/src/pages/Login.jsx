import { useState, useEffect } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login({ navigate }) {
  const { login, register, isAuthenticated, isAdmin } = useAuth();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, bounce straight to the right place
  useEffect(() => {
    if (isAuthenticated) {
      navigate(isAdmin ? "/admin" : "/");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const user =
        mode === "login"
          ? await login(form.email, form.password)
          : await register(form.name, form.email, form.password);
      navigate(user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-mist flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md">
        {/* Logo */}
        <a href="#/" className="flex items-center justify-center gap-2 mb-8">
          <div className="h-9 w-9 rounded-full bg-leaf flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-citrus" />
          </div>
          <span className="font-display font-semibold text-lg tracking-tight text-pine">
            DA FRESH
          </span>
        </a>

        <div className="bg-white rounded-3xl shadow-card border border-white/70 p-8 sm:p-10">
          <h1 className="font-display text-2xl font-semibold text-pine mb-1">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-pine/60 mb-6">
            {mode === "login"
              ? "Log in to manage your account."
              : "Sign up to start ordering fresh."}
          </p>

          {/* Mode toggle */}
          <div className="flex rounded-pill bg-mist p-1 mb-6 text-sm font-medium">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 rounded-pill py-2 transition ${
                mode === "login" ? "bg-white shadow-sm text-pine" : "text-pine/50"
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`flex-1 rounded-pill py-2 transition ${
                mode === "register" ? "bg-white shadow-sm text-pine" : "text-pine/50"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "register" && (
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-pine/70 mb-1.5">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="w-full rounded-xl border border-pine/10 bg-mist/60 px-4 py-3 text-sm text-pine outline-none focus:ring-2 focus:ring-leaf transition"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-pine/70 mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-pine/10 bg-mist/60 px-4 py-3 text-sm text-pine outline-none focus:ring-2 focus:ring-leaf transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-pine/70 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  required
                  minLength={6}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-pine/10 bg-mist/60 px-4 py-3 pr-11 text-sm text-pine outline-none focus:ring-2 focus:ring-leaf transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-pine/40 hover:text-pine/70"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-pill bg-leaf text-white font-semibold text-sm px-6 py-3 shadow-card hover:bg-leaf-dark transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              {mode === "login" ? "Log In" : "Create Account"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-pine/50 mt-6">
          <a href="#/" className="hover:text-leaf transition-colors">
            ← Back to home
          </a>
        </p>
      </div>
    </div>
  );
}
