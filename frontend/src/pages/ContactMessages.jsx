import { useEffect, useState, useCallback } from "react";
import { Loader2, Mail, Trash2, MailOpen, Phone } from "lucide-react";
import { api } from "../utils/api";

export default function ContactMessages({ token }) {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState(null);

  const loadContacts = useCallback(
    async (pageToLoad = 1) => {
      setLoading(true);
      setError("");
      try {
        const data = await api.adminContacts(token, pageToLoad);
        setContacts(data.contacts);
        setTotalPages(data.totalPages);
        setPage(data.page);
      } catch (err) {
        setError(err.message || "Failed to load messages");
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    loadContacts(1);
  }, [loadContacts]);

  async function toggleOpen(contact) {
    const opening = openId !== contact._id;
    setOpenId(opening ? contact._id : null);

    // Mark as read the first time an admin opens a new message
    if (opening && contact.status === "new") {
      try {
        await api.adminUpdateContactStatus(token, contact._id, "read");
        setContacts((cs) => cs.map((c) => (c._id === contact._id ? { ...c, status: "read" } : c)));
      } catch {
        // non-critical — leave status as-is if this fails
      }
    }
  }

  async function handleDelete(contact) {
    if (!window.confirm(`Delete the message from "${contact.name}"? This cannot be undone.`)) return;
    try {
      await api.adminDeleteContact(token, contact._id);
      await loadContacts(page);
    } catch (err) {
      setError(err.message || "Failed to delete message");
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-card border border-white/70 overflow-hidden">
      <div className="px-6 py-5 border-b border-pine/5 flex items-center justify-between">
        <h2 className="font-display font-semibold text-pine flex items-center gap-2">
          <Mail size={18} className="text-leaf" />
          Contact Messages
        </h2>
      </div>

      {error && (
        <p className="mx-6 mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
          {error}
        </p>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-pine/40">
          <Loader2 size={24} className="animate-spin" />
        </div>
      ) : (
        <div className="divide-y divide-pine/5">
          {contacts.map((c) => (
            <div key={c._id} className="px-6 py-4">
              <button
                onClick={() => toggleOpen(c)}
                className="w-full flex items-center justify-between gap-4 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {c.status === "new" ? (
                    <span className="h-2 w-2 rounded-full bg-citrus shrink-0" aria-label="New" />
                  ) : (
                    <MailOpen size={14} className="text-pine/30 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-pine font-medium truncate">
                      {c.name} <span className="text-pine/40 font-normal">— {c.email}</span>
                    </p>
                    <p className="text-pine/50 text-xs truncate">{c.subject || "General Inquiry"}</p>
                  </div>
                </div>
                <span className="text-pine/40 text-xs shrink-0">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </button>

              {openId === c._id && (
                <div className="mt-3 pl-5 border-l-2 border-leaf-light">
                  <p className="text-sm text-pine/80 whitespace-pre-wrap leading-relaxed">{c.message}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-pine/50">
                    <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1 hover:text-leaf transition">
                      <Mail size={13} />
                      {c.email}
                    </a>
                    {c.phone && (
                      <span className="inline-flex items-center gap-1">
                        <Phone size={13} />
                        {c.phone}
                      </span>
                    )}
                    <button
                      onClick={() => handleDelete(c)}
                      className="inline-flex items-center gap-1 text-pine/50 hover:text-red-600 transition ml-auto"
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {contacts.length === 0 && (
            <div className="px-6 py-10 text-center text-pine/40 text-sm">No messages yet.</div>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-pine/5 text-sm">
          <button
            disabled={page <= 1}
            onClick={() => loadContacts(page - 1)}
            className="text-pine/60 hover:text-leaf disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            ← Previous
          </button>
          <span className="text-pine/40">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => loadContacts(page + 1)}
            className="text-pine/60 hover:text-leaf disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
