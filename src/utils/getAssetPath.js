export function getAssetPath(path) {
  if (!path) return '';

  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const normalizedPath = path.replace(/^\/+/, '');

  return `${base}${normalizedPath}`;
}

export default getAssetPath;
