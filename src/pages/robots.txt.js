export const prerender = true;

const getConfiguredSite = (site) => {
  const configured = site ?? new URL(process.env.SITE_URL || import.meta.env.SITE_URL || 'http://localhost:4321');
  const hostname = configured.hostname.toLowerCase();
  const isProductionHost = !['localhost', '127.0.0.1'].includes(hostname);
  return {
    url: configured,
    isProductionHost
  };
};

export async function GET({ site }) {
  const indexingEnabled = (
    import.meta.env.PUBLIC_ALLOW_INDEXING === 'true' ||
    process.env.PUBLIC_ALLOW_INDEXING === 'true'
  );
  const { url: base, isProductionHost } = getConfiguredSite(site);
  const allowIndexing = indexingEnabled && isProductionHost;
  const body = allowIndexing
    ? [
        'User-agent: *',
        'Allow: /',
        `Sitemap: ${new URL('/sitemap.xml', base).href}`
      ].join('\n')
    : [
        'User-agent: *',
        'Disallow: /'
      ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
}
