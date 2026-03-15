import { motion } from 'framer-motion';
import { HiLocationMarker, HiPhone, HiUser } from 'react-icons/hi';
import { useCompany } from '../hooks/useData';

export default function AboutSection() {
  const company = useCompany();
  if (!company) return null;

  const { owner, description } = company;

  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">About Us</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">{description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-6">Contact & Owner</h3>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <HiUser className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-slate-500">Owner</p>
                  <p className="font-semibold text-slate-900">{owner?.name}</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <HiLocationMarker className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-slate-500">Address</p>
                  <p className="text-slate-800">{owner?.address}</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <HiPhone className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-slate-500">Contact</p>
                  <a href={`tel:${owner?.phone?.replace(/\s/g, '')}`} className="font-semibold text-primary-600 hover:underline">
                    {owner?.phone}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
