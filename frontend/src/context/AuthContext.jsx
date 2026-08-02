import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "../utils/api";

const AuthContext = createContext(null);
const STORAGE_KEY = "dafresh_auth";

function readStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(readStoredAuth); // { token, user } | null
  const [loading, setLoading] = useState(true);

  // On mount, verify the stored token is still valid and refresh the user
  useEffect(() => {
    const stored = readStoredAuth();
    if (!stored?.token) {
      setLoading(false);
      return;
    }
    api
      .me(stored.token)
      .then(({ user }) => setAuth({ token: stored.token, user }))
      .catch(() => {
        localStorage.removeItem(STORAGE_KEY);
        setAuth(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const persist = (next) => {
    setAuth(next);
    if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const login = useCallback(async (email, password) => {
    const { token, user } = await api.login({ email, password });
    persist({ token, user });
    return user;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const { token, user } = await api.register({ name, email, password });
    persist({ token, user });
    return user;
  }, []);

  const logout = useCallback(() => {
    persist(null);
  }, []);

  const value = {
    user: auth?.user || null,
    token: auth?.token || null,
    isAuthenticated: !!auth?.user,
    isAdmin: auth?.user?.role === "admin",
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
