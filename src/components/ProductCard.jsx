import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';
import { resolveImagePath } from '../utils/imagePath';

export default function ProductCard({ product, index }) {
  const imageSrc = resolveImagePath(product?.image);
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={imageSrc}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://placehold.co/600x400/e2e8f0/64748b?text=' + encodeURIComponent(product.name);
          }}
        />
      </div>
      <div className="p-5 md:p-6">
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        <p className="mt-2 text-slate-600 text-sm leading-relaxed">{product.description}</p>
        {product.features?.length > 0 && (
          <ul className="mt-4 space-y-2">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                <HiCheck className="w-4 h-4 text-primary-500 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  );
}
