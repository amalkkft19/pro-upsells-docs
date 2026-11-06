/**
 * Runs after `astro build`. Fails the build (and so the Vercel deploy) if:
 *   - any internal link, image or #anchor points at something that doesn't exist, or
 *   - any page the app links to is missing.
 * Run it alone with:  npm run check-links
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

// Pages that must always exist (the app links to these, so the addresses are stable).
const REQUIRED = [
  '/',
  '/getting-started/',
  '/getting-started/enable-app-embed/',
  '/getting-started/first-offer/',
  '/getting-started/check-your-store/',
  '/widgets/upsell-cross-sell/',
  '/widgets/frequently-bought-together/',
  '/widgets/volume-discount/',
  '/widgets/ai-recommendations/',
  '/widgets/automatic-free-gift/',
  '/slide-cart/',
  '/slide-cart/customize/',
  '/slide-cart/cart-goals/',
  '/slide-cart/cart-offers/',
  '/slide-cart/live-cart/',
  '/web-push/',
  '/web-push/send-notification/',
  '/guides/offer-settings/',
  '/guides/add-block-to-theme/',
  '/guides/checkout-thank-you-blocks/',
  '/guides/analytics/',
  '/grow-revenue/raise-average-order-value/',
  '/grow-revenue/sell-more-units/',
  '/grow-revenue/reward-bigger-carts/',
  '/grow-revenue/bring-shoppers-back/',
  '/troubleshooting/',
  '/faq/',
  '/contact/',
];

if (!existsSync(DIST)) {
  console.error('No dist/ folder. Run "npm run build" first.');
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === 'pagefind') continue; // search index, not pages
      out.push(...walk(p));
    } else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

function pageFileFor(urlPath) {
  const clean = decodeURIComponent(urlPath);
  const candidates = [];
  if (clean.endsWith('/')) candidates.push(join(DIST, clean, 'index.html'));
  else {
    candidates.push(join(DIST, clean));
    candidates.push(join(DIST, clean, 'index.html'));
    candidates.push(join(DIST, clean + '.html'));
  }
  return candidates.find((c) => existsSync(c) && statSync(c).isFile());
}

const idCache = new Map();
function idsIn(file) {
  if (!idCache.has(file)) {
    const html = readFileSync(file, 'utf8');
    const ids = new Set();
    for (const m of html.matchAll(/\sid=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) ids.add(m[1] ?? m[2] ?? m[3]);
    idCache.set(file, ids);
  }
  return idCache.get(file);
}

const problems = [];
const files = walk(DIST);

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const pageUrl = '/' + relative(DIST, file).replace(/index\.html$/, '').replace(/\\/g, '/');
  for (const m of html.matchAll(/\s(?:href|src)=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    const raw = (m[1] ?? m[2] ?? m[3] ?? '').trim();
    if (!raw || /^(https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(raw)) continue;

    const [beforeHash, hash = ''] = raw.split('#');
    const [pathOnly] = beforeHash.split('?');
    let target;
    if (!pathOnly) target = file; // "#anchor" on this page
    else {
      const abs = pathOnly.startsWith('/') ? pathOnly : new URL(pathOnly, 'http://x' + pageUrl).pathname;
      target = pageFileFor(abs);
    }
    if (!target) {
      problems.push(`${pageUrl}  ->  ${raw}  (target not found)`);
      continue;
    }
    if (hash && extname(target) === '.html' && !idsIn(target).has(decodeURIComponent(hash))) {
      problems.push(`${pageUrl}  ->  ${raw}  (no element with that #anchor)`);
    }
  }
}

for (const slug of REQUIRED) {
  if (!pageFileFor(slug)) problems.push(`Required page missing: ${slug}`);
}

if (problems.length) {
  console.error(`\nLink check failed: ${problems.length} problem(s)\n`);
  for (const p of [...new Set(problems)]) console.error('  - ' + p);
  console.error('');
  process.exit(1);
}
console.log(`Link check passed: ${files.length} pages, ${REQUIRED.length} required pages present.`);
