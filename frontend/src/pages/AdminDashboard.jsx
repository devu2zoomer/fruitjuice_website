import { useEffect, useState, useCallback } from "react";
import { Users, ShieldCheck, LayoutGrid, Package, LogOut, Loader2, RefreshCw, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";
import ProductManager from "./ProductManager";
import ContactMessages from "./ContactMessages";

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white rounded-3xl shadow-card border border-white/70 p-6 flex items-center gap-4">
      <div className="h-12 w-12 rounded-2xl bg-leaf-light flex items-center justify-center shrink-0">
        <Icon size={22} className="text-leaf-dark" />
      </div>
      <div>
        <p className="text-2xl font-display font-semibold text-pine leading-tight">{value}</p>
        <p className="text-xs text-pine/50 font-medium">{label}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard({ navigate }) {
  const { user, token, logout, isAdmin } = useAuth();
  const [tab, setTab] = useState("overview"); // "overview" | "products" | "messages"
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = useCallback(
    async (pageToLoad = 1) => {
      setLoading(true);
      setError("");
      try {
        const [dashboard, userList] = await Promise.all([
          api.adminDashboard(token),
          api.adminUsers(token, pageToLoad),
        ]);
        setStats(dashboard);
        setUsers(userList.users);
        setTotalPages(userList.totalPages);
        setPage(userList.page);
      } catch (err) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  // Guard: only admins may view this page
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (!isAdmin) {
      navigate("/");
      return;
    }
    loadData(1);
  }, [token, isAdmin, navigate, loadData]);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-mist">
      {/* Top bar */}
      <header className="bg-white border-b border-pine/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-leaf flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-citrus" />
            </div>
            <span className="font-display font-semibold text-lg tracking-tight text-pine">
              DA FRESH <span className="text-leaf">Admin</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-pine/60 hidden sm:inline">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-pine/70 hover:text-red-600 transition"
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-semibold text-pine">Dashboard</h1>
            <p className="text-sm text-pine/50">Overview of your accounts and activity.</p>
          </div>
          <button
            onClick={() => loadData(page)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-pine/70 hover:text-leaf transition"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { key: "overview", label: "Overview" },
            { key: "products", label: "Products" },
            { key: "messages", label: "Messages" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative rounded-pill px-5 py-2 text-sm font-medium transition ${
                tab === t.key ? "bg-leaf text-white shadow-card" : "bg-white text-pine/60 hover:text-pine"
              }`}
            >
              {t.label}
              {t.key === "messages" && stats?.newContacts > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-[18px] min-w-[18px] px-1 rounded-full bg-citrus text-white text-[10px] font-bold flex items-center justify-center">
                  {stats.newContacts}
                </span>
              )}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-6">
            {error}
          </p>
        )}

        {loading && !stats ? (
          <div className="flex items-center justify-center py-24 text-pine/40">
            <Loader2 size={28} className="animate-spin" />
          </div>
        ) : tab === "products" ? (
          <ProductManager token={token} />
        ) : tab === "messages" ? (
          <ContactMessages token={token} />
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-5 mb-10">
              <StatCard icon={Users} label="Total Customers" value={stats?.totalUsers ?? 0} />
              <StatCard icon={ShieldCheck} label="Admins" value={stats?.totalAdmins ?? 0} />
              <StatCard icon={LayoutGrid} label="Total Accounts" value={stats?.totalAccounts ?? 0} />
              <StatCard icon={Package} label="Active Products" value={stats?.activeProducts ?? 0} />
              <StatCard icon={Mail} label="New Messages" value={stats?.newContacts ?? 0} />
            </div>

            {/* Users table */}
            <div className="bg-white rounded-3xl shadow-card border border-white/70 overflow-hidden">
              <div className="px-6 py-5 border-b border-pine/5">
                <h2 className="font-display font-semibold text-pine">All Users</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-pine/40 text-xs uppercase tracking-wide">
                      <th className="px-6 py-3 font-medium">Name</th>
                      <th className="px-6 py-3 font-medium">Email</th>
                      <th className="px-6 py-3 font-medium">Role</th>
                      <th className="px-6 py-3 font-medium">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id} className="border-t border-pine/5">
                        <td className="px-6 py-3.5 text-pine font-medium">{u.name}</td>
                        <td className="px-6 py-3.5 text-pine/70">{u.email}</td>
                        <td className="px-6 py-3.5">
                          <span
                            className={`inline-flex rounded-pill px-2.5 py-1 text-xs font-semibold ${
                              u.role === "admin"
                                ? "bg-citrus/10 text-citrus"
                                : "bg-leaf-light text-leaf-dark"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 text-pine/50">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-pine/40">
                          No users yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-pine/5 text-sm">
                  <button
                    disabled={page <= 1}
                    onClick={() => loadData(page - 1)}
                    className="text-pine/60 hover:text-leaf disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    ← Previous
                  </button>
                  <span className="text-pine/40">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => loadData(page + 1)}
                    className="text-pine/60 hover:text-leaf disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
