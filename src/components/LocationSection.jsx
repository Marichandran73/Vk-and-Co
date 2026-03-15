import { motion } from 'framer-motion';
import { HiLocationMarker } from 'react-icons/hi';
import { useCompany } from '../hooks/useData';

const FALLBACK_MAPS_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.083333333333!2d78.1349!3d8.7642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b03e1ff72f2d78f%3A0x2a0a2b2b2b2b2b2b!2sThoothukudi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin';

export default function LocationSection() {
  const company = useCompany();
  const address = company?.location?.address || 'MXCX+7R9 Kattalangulam, Thoothukudi, Tamil Nadu';
  const embedUrl = company?.location?.mapsEmbedUrl || FALLBACK_MAPS_URL;

  return (
    <section id="location" className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Find Us</h2>
          <p className="mt-3 text-slate-600 flex items-center justify-center gap-2">
            <HiLocationMarker className="w-5 h-5 text-primary-500" />
            {address}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-video max-h-[480px]"
        >
          <iframe
            title="VK-and-Co location"
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full min-h-[320px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
