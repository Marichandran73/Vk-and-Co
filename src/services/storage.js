const STORAGE_KEYS = {
  PRODUCTS: 'vk-products',
  COMPANY: 'vk-company',
  LEADS: 'vk-leads',
  ADMIN_TOKEN: 'vk-admin-token',
};

export function getProducts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (stored) return JSON.parse(stored);
  } catch (_) {}
  return null;
}

export function setProducts(data) {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(data));
}

export function getCompany() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.COMPANY);
    if (stored) return JSON.parse(stored);
  } catch (_) {}
  return null;
}

export function setCompany(data) {
  localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(data));
}

export function getLeads() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LEADS);
    if (stored) return JSON.parse(stored);
  } catch (_) {}
  return [];
}

export function addLead(lead) {
  const leads = getLeads();
  leads.unshift({ ...lead, id: Date.now(), createdAt: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
}

export function getAdminToken() {
  return sessionStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
}

export function setAdminToken(token) {
  sessionStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, token);
}

export function clearAdminToken() {
  sessionStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
}
