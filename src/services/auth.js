const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || 'admin';
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || 'admin123';

import { getAdminToken, setAdminToken, clearAdminToken } from './storage';

const DEMO_TOKEN = 'vk-admin-demo-token';

export function login(username, password) {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    setAdminToken(DEMO_TOKEN);
    return true;
  }
  return false;
}

export function logout() {
  clearAdminToken();
}

export function isAuthenticated() {
  return getAdminToken() === DEMO_TOKEN;
}
