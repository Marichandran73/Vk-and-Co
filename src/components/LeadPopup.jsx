import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { sendLeadEmail } from '../services/emailService';
import { addLead } from '../services/storage';

const POPUP_DELAY_MS = 20000;
const STORAGE_KEY = 'vk-lead-popup-seen';

export default function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  useEffect(() => {
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (seen) return;
    const t = setTimeout(() => setOpen(true), POPUP_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  const validate = () => {
    const e = {};
    if (!form.name?.trim()) e.name = 'Name is required';
    if (!form.phone?.trim()) e.phone = 'Phone is required';
    if (!form.email?.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    try {
      const result = await sendLeadEmail(form);
      addLead(form);
      if (result.ok) {
        setSubmitted(true);
        sessionStorage.setItem(STORAGE_KEY, '1');
      } else {
        setErrors({ submit: result.error || 'Failed to send. Try again.' });
      }
    } catch (err) {
      addLead(form);
      setSubmitted(true);
      sessionStorage.setItem(STORAGE_KEY, '1');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem(STORAGE_KEY, '1');
  };

  const popupContent = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-popup-title"
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md max-h-[90vh] bg-white rounded-2xl shadow-2xl z-[9999] flex flex-col"
          >
            <div className="p-6 overflow-y-auto flex-1 min-h-0">
              <div className="flex justify-between items-center mb-6">
                <h3 id="lead-popup-title" className="text-xl font-bold text-slate-900">Get in Touch</h3>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Close"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-8 text-center"
                >
                  <p className="text-green-600 font-semibold">Thank you! We'll get back to you soon.</p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-4 text-primary-600 hover:underline"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="lead-name" className="block text-sm font-medium text-slate-700 mb-1">
                      Name *
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Your name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="lead-phone" className="block text-sm font-medium text-slate-700 mb-1">
                      Phone *
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="lead-email" className="block text-sm font-medium text-slate-700 mb-1">
                      Email *
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="lead-message" className="block text-sm font-medium text-slate-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="lead-message"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                      placeholder="How can we help?"
                    />
                  </div>
                  {errors.submit && <p className="text-sm text-red-600">{errors.submit}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Sending...' : 'Submit'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(popupContent, document.body);
}
