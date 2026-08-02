import { useState } from "react";
import { Loader2, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../utils/api";

const EMPTY_FORM = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Name, email, and message are required.");
      return;
    }

    setSubmitting(true);
    try {
      await api.submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      setSubmitted(true);
      setForm(EMPTY_FORM);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative">
      <Navbar />
      <main className="min-h-screen bg-mist px-4 sm:px-6 pt-32 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="eyebrow text-leaf mb-3">Get In Touch</p>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-pine mb-3">
              We'd love to hear from you
            </h1>
            <p className="text-pine/60 text-sm sm:text-base">
              Questions about an order, wholesale inquiries, or just want to say hi?
              Send us a message and our team will get back to you soon.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Contact info */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="bg-white rounded-3xl shadow-card border border-white/70 p-6 flex items-start gap-4">
                <div className="h-11 w-11 rounded-2xl bg-leaf-light flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-leaf-dark" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-pine">Email</p>
                  <p className="text-sm text-pine/60">hello@dafresh.com</p>
                </div>
              </div>
              <div className="bg-white rounded-3xl shadow-card border border-white/70 p-6 flex items-start gap-4">
                <div className="h-11 w-11 rounded-2xl bg-leaf-light flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-leaf-dark" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-pine">Phone</p>
                  <p className="text-sm text-pine/60">+1 (555) 010-0192</p>
                </div>
              </div>
              <div className="bg-white rounded-3xl shadow-card border border-white/70 p-6 flex items-start gap-4">
                <div className="h-11 w-11 rounded-2xl bg-leaf-light flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-leaf-dark" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-pine">Grove HQ</p>
                  <p className="text-sm text-pine/60">204 Orchard Lane, Sunridge</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 bg-white rounded-3xl shadow-card border border-white/70 p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="h-14 w-14 rounded-full bg-leaf-light flex items-center justify-center mb-4">
                    <CheckCircle2 size={28} className="text-leaf-dark" />
                  </div>
                  <h2 className="font-display text-xl font-semibold text-pine mb-2">
                    Message sent!
                  </h2>
                  <p className="text-sm text-pine/60 max-w-sm mb-6">
                    Thanks for reaching out — we'll get back to you at the email you provided.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="rounded-pill bg-leaf text-white font-semibold text-sm px-6 py-2.5 shadow-card hover:bg-leaf-dark transition"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-pine/70 mb-1.5">
                      Full name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full rounded-xl border border-pine/10 bg-mist/60 px-4 py-3 text-sm text-pine outline-none focus:ring-2 focus:ring-leaf transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-pine/70 mb-1.5">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-pine/10 bg-mist/60 px-4 py-3 text-sm text-pine outline-none focus:ring-2 focus:ring-leaf transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-pine/70 mb-1.5">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-xl border border-pine/10 bg-mist/60 px-4 py-3 text-sm text-pine outline-none focus:ring-2 focus:ring-leaf transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-semibold text-pine/70 mb-1.5">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Question about bulk orders"
                      className="w-full rounded-xl border border-pine/10 bg-mist/60 px-4 py-3 text-sm text-pine outline-none focus:ring-2 focus:ring-leaf transition"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-xs font-semibold text-pine/70 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      className="w-full rounded-xl border border-pine/10 bg-mist/60 px-4 py-3 text-sm text-pine outline-none focus:ring-2 focus:ring-leaf transition resize-none"
                    />
                  </div>

                  {error && (
                    <p className="sm:col-span-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                      {error}
                    </p>
                  )}

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center gap-2 rounded-pill bg-leaf text-white font-semibold text-sm px-6 py-3 shadow-card hover:bg-leaf-dark transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting && <Loader2 size={16} className="animate-spin" />}
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
