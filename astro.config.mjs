// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import AutoImport from 'astro-auto-import';

const SITE = 'https://docs.seloapps.com';

export default defineConfig({
  site: SITE,
  // Slugs in the app's "View docs" links all end in a slash. Keep it that way.
  trailingSlash: 'always',
  build: { format: 'directory' },

  // If you ever rename or move a page, keep the old address working here:
  //   '/old/address/': '/new/address/',
  redirects: {},

  integrations: [
    // Makes these components available in every .mdx page without an import line.
    AutoImport({
      imports: [
        {
          '@astrojs/starlight/components': ['Steps', 'CardGrid', 'Card', 'LinkCard', 'LinkButton'],
        },
        './src/components/Callout.astro',
        './src/components/Screenshot.astro',
        './src/components/WidgetFacts.astro',
        './src/components/NextSteps.astro',
        './src/components/HomeCards.astro',
        './src/components/SupportEmail.astro',
        './src/components/PrivacyLink.astro',
      ],
    }),
    starlight({
      title: 'Pro Upsells Docs',
      description:
        'Set up offers, the Slide Cart and Web Push in Pro Upsells, and get more from every order.',
      favicon: '/favicon.png',
      customCss: ['@fontsource-variable/inter/index.css', './src/styles/custom.css'],
      credits: false,
      lastUpdated: false,
      pagefind: true, // built-in search, indexed at build time
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      components: {
        SiteTitle: './src/components/overrides/SiteTitle.astro',
        SocialIcons: './src/components/overrides/SocialIcons.astro',
        MobileMenuFooter: './src/components/overrides/MobileMenuFooter.astro',
        Footer: './src/components/overrides/Footer.astro',
      },
      head: [
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } },
        { tag: 'meta', attrs: { property: 'og:image', content: `${SITE}/og-image.png` } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        {
          tag: 'meta',
          attrs: { property: 'og:image:alt', content: 'Pro Upsells Docs' },
        },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: `${SITE}/og-image.png` } },
      ],
      // The sidebar order and labels live here. To add a page, create the file
      // and (if you want it in the sidebar) add one `{ slug: '...' }` line.
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'Docs home', link: '/' },
            { label: 'Getting started', slug: 'getting-started' },
            { label: 'Turn on the app embed', slug: 'getting-started/enable-app-embed' },
            { label: 'Create your first offer', slug: 'getting-started/first-offer' },
            { label: 'Check it on your store', slug: 'getting-started/check-your-store' },
          ],
        },
        {
          label: 'Widgets',
          items: [
            { label: 'Upsell & Cross-sell', slug: 'widgets/upsell-cross-sell' },
            { label: 'Frequently Bought Together', slug: 'widgets/frequently-bought-together' },
            { label: 'Volume Discount', slug: 'widgets/volume-discount' },
            { label: 'AI Recommendations', slug: 'widgets/ai-recommendations' },
            { label: 'Automatic Free Gift', slug: 'widgets/automatic-free-gift' },
          ],
        },
        {
          label: 'Slide Cart',
          items: [
            { label: 'Set up the Slide Cart', slug: 'slide-cart' },
            { label: 'Customize the Slide Cart', slug: 'slide-cart/customize' },
            { label: 'Cart Goals', slug: 'slide-cart/cart-goals' },
            { label: 'Cart Offers', slug: 'slide-cart/cart-offers' },
            { label: 'Live Cart and notifications', slug: 'slide-cart/live-cart' },
          ],
        },
        {
          label: 'Web Push',
          items: [
            { label: 'Set up Web Push', slug: 'web-push' },
            { label: 'Send a notification', slug: 'web-push/send-notification' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Offer settings explained', slug: 'guides/offer-settings' },
            { label: 'Add a widget block to your theme', slug: 'guides/add-block-to-theme' },
            {
              label: 'Add a block to checkout, thank you or order status',
              slug: 'guides/checkout-thank-you-blocks',
            },
            { label: 'Read your analytics', slug: 'guides/analytics' },
          ],
        },
        {
          label: 'Grow revenue',
          items: [
            { label: 'Raise average order value', slug: 'grow-revenue/raise-average-order-value' },
            { label: 'Sell more units per order', slug: 'grow-revenue/sell-more-units' },
            { label: 'Reward bigger carts', slug: 'grow-revenue/reward-bigger-carts' },
            { label: 'Bring shoppers back', slug: 'grow-revenue/bring-shoppers-back' },
          ],
        },
        {
          label: 'Help',
          items: [
            { label: 'Troubleshooting', slug: 'troubleshooting' },
            { label: 'FAQ', slug: 'faq' },
            { label: 'Contact support', slug: 'contact' },
          ],
        },
      ],
    }),
    // Order matters: AutoImport, then Starlight, then MDX.
    mdx(),
  ],
});
