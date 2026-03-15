import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { useProducts } from '../hooks/useData';

export default function ProductsSection() {
  const products = useProducts();

  return (
    <section id="products" className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our Products</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Quality construction materials and industrial products for your projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
