import { Link } from 'react-router-dom';
import { useCompany } from '../hooks/useData';

export default function Footer() {
  const company = useCompany();
  const name = company?.name || 'VK-and-Co';
  const tagline = company?.tagline || 'Quality Construction Materials & Industrial Products';

  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link to="/" className="text-xl font-bold text-white">
              {name}
            </Link>
            <p className="mt-1 text-sm">{tagline}</p>
          </div>
          <div className="flex gap-6">
            <a href="#products" className="hover:text-white transition-colors">Products</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#location" className="hover:text-white transition-colors">Location</a>
            <Link to="/admin" className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
