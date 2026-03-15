import { useState, useEffect } from 'react';
import productsData from '../data/products.json';
import companyData from '../data/company.json';
import { getProducts, getCompany } from '../services/storage';
import { resolveImagePath } from '../utils/imagePath';

function normalizeProducts(products) {
  if (!Array.isArray(products)) return [];
  return products.map((p) => ({
    ...p,
    image: resolveImagePath(p?.image),
  }));
}

function normalizeCompany(company) {
  if (!company) return null;
  return {
    ...company,
    heroImage: company.heroImage ? resolveImagePath(company.heroImage) : '',
  };
}

export function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = getProducts();
    if (stored?.products?.length) {
      setProducts(normalizeProducts(stored.products));
    } else {
      setProducts(normalizeProducts(productsData.products || []));
    }
  }, []);

  return products;
}

export function useCompany() {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const stored = getCompany();
    if (stored) {
      setCompany(normalizeCompany(stored));
    } else {
      setCompany(normalizeCompany(companyData));
    }
  }, []);

  return company;
}
