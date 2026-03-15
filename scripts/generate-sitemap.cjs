const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const siteUrl = process.env.SITE_URL || 'http://localhost:4321';

if (!fs.existsSync(distDir)) {
  console.error('dist directory not found. Run the build first.');
  process.exit(1);
}

const urls = [];

const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;

    const rel = path.relative(distDir, fullPath).replace(/\\/g, '/');
    if (rel === '404.html' || rel.endsWith('/404.html')) continue;

    let urlPath;
    if (rel === 'index.html') {
      urlPath = '/';
    } else if (rel.endsWith('/index.html')) {
      urlPath = `/${rel.replace(/\/index\.html$/, '')}/`;
    } else {
      urlPath = `/${rel.replace(/\.html$/, '')}`;
    }

    const stat = fs.statSync(fullPath);
    const lastmod = stat.mtime.toISOString().split('T')[0];

    urls.push({
      loc: `${siteUrl}${urlPath}`,
      lastmod
    });
  }
};

walk(distDir);

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(({ loc, lastmod }) => `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`),
  '</urlset>'
].join('\n');

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf-8');

const robots = [
  'User-agent: *',
  'Allow: /',
  `Sitemap: ${siteUrl}/sitemap.xml`
].join('\n');

fs.writeFileSync(path.join(distDir, 'robots.txt'), robots, 'utf-8');

console.log(`Wrote ${urls.length} URLs to sitemap.xml and robots.txt.`);
