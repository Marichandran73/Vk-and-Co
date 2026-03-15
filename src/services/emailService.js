import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

export async function sendLeadEmail({ name, phone, email, message }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn('EmailJS not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY in .env');
    return { ok: true }; // allow form to succeed in dev
  }
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_email: 'marichandran2000@gmail.com',
        from_name: name,
        from_phone: phone,
        from_email: email,
        message,
      },
      PUBLIC_KEY
    );
    return { ok: true };
  } catch (err) {
    console.error('EmailJS error:', err);
    return { ok: false, error: err.text || err.message };
  }
}
