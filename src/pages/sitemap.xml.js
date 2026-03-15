import { stat } from 'node:fs/promises';
import path from 'node:path';

export const prerender = true;

const pageModules = import.meta.glob('./**/*.{astro,md,mdx}');
const getConfiguredSite = (site) => {
  const configured = site ?? new URL(process.env.SITE_URL || import.meta.env.SITE_URL || 'http://localhost:4321');
  const hostname = configured.hostname.toLowerCase();
  const isProductionHost = !['localhost', '127.0.0.1'].includes(hostname);
  return {
    url: configured,
    isProductionHost
  };
};

const toRoute = (page) => {
  let route = page.replace(/^\.\//, '/').replace(/\.(astro|md|mdx)$/, '');
  if (route.endsWith('/index')) {
    route = route.slice(0, -'/index'.length) || '/';
  }
  if (!route.endsWith('/')) route += '/';
  return route;
};

const resolveSourcePath = (page) => {
  if (page.startsWith('/src/pages/')) {
    return path.join(process.cwd(), page.slice(1));
  }
  if (page.startsWith('src/pages/')) {
    return path.join(process.cwd(), page);
  }
  const normalized = page.replace(/^\.\//, '');
  return path.join(process.cwd(), 'src', 'pages', normalized);
};

const toLastmod = async (page) => {
  try {
    const filePath = resolveSourcePath(page);
    const { mtime } = await stat(filePath);
    return mtime.toISOString().split('T')[0];
  } catch (error) {
    return null;
  }
};

export async function GET({ site }) {
  const indexingEnabled = (
    import.meta.env.PUBLIC_ALLOW_INDEXING === 'true' ||
    process.env.PUBLIC_ALLOW_INDEXING === 'true'
  );
  const { url: base, isProductionHost } = getConfiguredSite(site);
  const allowIndexing = indexingEnabled && isProductionHost;

  if (!allowIndexing) {
    return new Response('', {
      headers: {
        'Content-Type': 'application/xml'
      }
    });
  }

  const pages = Object.keys(pageModules).filter((page) => toRoute(page) !== '/404/');
  const entries = await Promise.all(
    pages.map(async (page) => ({
      route: toRoute(page),
      lastmod: await toLastmod(page)
    }))
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    entries
      .map(({ route, lastmod }) => {
        const loc = new URL(route, base).href;
        const lastmodTag = lastmod ? `<lastmod>${lastmod}</lastmod>` : '';
        return `<url><loc>${loc}</loc>${lastmodTag}</url>`;
      })
      .join('') +
    `</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
