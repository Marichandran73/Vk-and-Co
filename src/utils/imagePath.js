/**
 * Resolve image path for display. Public folder images live at /images/.
 * Handles: full URLs, paths like /images/x.jpg, or old paths like ../assets/images/x.jpg
 */
function getBase() {
  try {
    const b = import.meta.env?.BASE_URL ?? '/';
    return b.endsWith('/') ? b : `${b}/`;
  } catch {
    return '/';
  }
}

export function resolveImagePath(path) {
  if (!path || typeof path !== 'string') return '';
  const trimmed = path.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  const filename = trimmed.split(/[/\\]/).pop();
  const segment = trimmed.startsWith('/') ? trimmed.slice(1) : `images/${filename}`;
  return `${getBase()}${segment}`;
}
