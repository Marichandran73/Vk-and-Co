import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiLogout, HiHome, HiPhotograph, HiPencil, HiViewList } from 'react-icons/hi';
import { logout, isAuthenticated } from '../../services/auth';
import { getProducts, setProducts, getCompany, setCompany, getLeads } from '../../services/storage';
import productsData from '../../data/products.json';
import companyData from '../../data/company.json';

function TabContent({ tab, products, company, leads, onSaveProducts, onSaveCompany, savingProducts, savingCompany }) {
  const [editProducts, setEditProducts] = useState(products);
  const [editCompany, setEditCompany] = useState(company);

  useEffect(() => {
    setEditProducts(products);
  }, [products]);
  useEffect(() => {
    setEditCompany(company);
  }, [company]);

  if (tab === 'products') {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Edit Products</h2>
        <p className="text-slate-600 text-sm">Update product details and image URLs. For new images, use a full URL or replace file in public/images.</p>
        {editProducts.map((p, i) => (
          <div key={p.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
            <input
              type="text"
              value={p.name}
              onChange={(e) => {
                const next = [...editProducts];
                next[i] = { ...next[i], name: e.target.value };
                setEditProducts(next);
              }}
              className="w-full px-3 py-2 rounded-lg border border-slate-300"
              placeholder="Product name"
            />
            <input
              type="text"
              value={p.image}
              onChange={(e) => {
                const next = [...editProducts];
                next[i] = { ...next[i], image: e.target.value };
                setEditProducts(next);
              }}
              className="w-full px-3 py-2 rounded-lg border border-slate-300"
              placeholder="Image URL or path"
            />
            <textarea
              value={p.description}
              onChange={(e) => {
                const next = [...editProducts];
                next[i] = { ...next[i], description: e.target.value };
                setEditProducts(next);
              }}
              className="w-full px-3 py-2 rounded-lg border border-slate-300"
              rows={2}
              placeholder="Description"
            />
            <input
              type="text"
              value={(p.features || []).join(', ')}
              onChange={(e) => {
                const next = [...editProducts];
                next[i] = { ...next[i], features: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) };
                setEditProducts(next);
              }}
              className="w-full px-3 py-2 rounded-lg border border-slate-300"
              placeholder="Features (comma separated)"
            />
          </div>
        ))}
        <button
          onClick={() => onSaveProducts({ products: editProducts })}
          disabled={savingProducts}
          className="px-4 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {savingProducts ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            'Save Products'
          )}
        </button>
      </div>
    );
  }

  if (tab === 'company') {
    const c = editCompany || {};
    const owner = c.owner || {};
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Edit Company Info</h2>
        <div className="space-y-3">
          <input
            type="text"
            value={c.name || ''}
            onChange={(e) => setEditCompany({ ...editCompany, name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-300"
            placeholder="Company name"
          />
          <input
            type="text"
            value={c.tagline || ''}
            onChange={(e) => setEditCompany({ ...editCompany, tagline: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-300"
            placeholder="Tagline"
          />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Hero background image (behind “VK-and-Co” banner)</label>
            <input
              type="text"
              value={c.heroImage || ''}
              onChange={(e) => setEditCompany({ ...editCompany, heroImage: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300"
              placeholder="Image URL e.g. /images/company-hero.jpg or full URL"
            />
          </div>
          <textarea
            value={c.description || ''}
            onChange={(e) => setEditCompany({ ...editCompany, description: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-300"
            rows={3}
            placeholder="Company description"
          />
          <hr className="border-slate-200" />
          <p className="font-medium text-slate-700">Owner</p>
          <input
            type="text"
            value={owner.name || ''}
            onChange={(e) => setEditCompany({ ...editCompany, owner: { ...owner, name: e.target.value } })}
            className="w-full px-3 py-2 rounded-lg border border-slate-300"
            placeholder="Owner name"
          />
          <input
            type="text"
            value={owner.address || ''}
            onChange={(e) => setEditCompany({ ...editCompany, owner: { ...owner, address: e.target.value } })}
            className="w-full px-3 py-2 rounded-lg border border-slate-300"
            placeholder="Address"
          />
          <input
            type="text"
            value={owner.phone || ''}
            onChange={(e) => setEditCompany({ ...editCompany, owner: { ...owner, phone: e.target.value } })}
            className="w-full px-3 py-2 rounded-lg border border-slate-300"
            placeholder="Phone"
          />
          <input
            type="text"
            value={owner.email || ''}
            onChange={(e) => setEditCompany({ ...editCompany, owner: { ...owner, email: e.target.value } })}
            className="w-full px-3 py-2 rounded-lg border border-slate-300"
            placeholder="Email"
          />
          <input
            type="text"
            value={c.location?.mapsEmbedUrl || ''}
            onChange={(e) => setEditCompany({
              ...editCompany,
              location: { ...(editCompany?.location || {}), mapsEmbedUrl: e.target.value },
            })}
            className="w-full px-3 py-2 rounded-lg border border-slate-300"
            placeholder="Google Maps embed URL"
          />
        </div>
        <button
          onClick={() => onSaveCompany(editCompany)}
          disabled={savingCompany}
          className="px-4 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {savingCompany ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            'Save Company'
          )}
        </button>
      </div>
    );
  }

  if (tab === 'leads') {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Customer Leads</h2>
        <p className="text-slate-600 text-sm">Leads collected from the popup form (also sent via email if EmailJS is configured).</p>
        {leads.length === 0 ? (
          <p className="text-slate-500">No leads yet.</p>
        ) : (
          <div className="space-y-3">
            {leads.map((lead) => (
              <div key={lead.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="font-semibold text-slate-900">{lead.name}</p>
                <p className="text-sm text-slate-600">{lead.phone} · {lead.email}</p>
                {lead.message && <p className="mt-2 text-slate-700 text-sm">{lead.message}</p>}
                <p className="mt-1 text-xs text-slate-400">{lead.createdAt}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('products');
  const [products, setProductsState] = useState([]);
  const [company, setCompanyState] = useState(null);
  const [leads, setLeadsState] = useState([]);
  const [savingProducts, setSavingProducts] = useState(false);
  const [savingCompany, setSavingCompany] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin');
      return;
    }
    const p = getProducts();
    setProductsState(p?.products ?? productsData.products ?? []);
    const c = getCompany();
    setCompanyState(c ?? companyData);
    setLeadsState(getLeads());
  }, [navigate]);

  const handleSaveProducts = async (data) => {
    setSavingProducts(true);
    try {
      setProducts(data);
      setProductsState(data.products);
      toast.success('Products saved successfully');
    } catch (err) {
      toast.error('Failed to save products');
    } finally {
      setSavingProducts(false);
    }
  };

  const handleSaveCompany = async (data) => {
    setSavingCompany(true);
    try {
      setCompany(data);
      setCompanyState(data);
      toast.success('Company info saved successfully');
    } catch (err) {
      toast.error('Failed to save company info');
    } finally {
      setSavingCompany(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const tabs = [
    { id: 'products', label: 'Products', icon: HiPhotograph },
    { id: 'company', label: 'Company', icon: HiPencil },
    { id: 'leads', label: 'Leads', icon: HiViewList },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-bold text-primary-600 flex items-center gap-2">
              <HiHome className="w-5 h-5" /> VK-and-Co
            </Link>
            <span className="text-slate-500 text-sm">Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <HiLogout className="w-5 h-5" /> Logout
          </button>
        </div>
        <div className="max-w-5xl mx-auto px-4 flex gap-2 border-t border-slate-100">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <motion.div
          key={tab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm"
        >
          <TabContent
            tab={tab}
            products={products}
            company={company}
            leads={leads}
            onSaveProducts={handleSaveProducts}
            onSaveCompany={handleSaveCompany}
            savingProducts={savingProducts}
            savingCompany={savingCompany}
          />
        </motion.div>
      </main>
    </div>
  );
}
