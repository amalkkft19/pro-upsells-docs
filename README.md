# Pro Upsells Docs

The public help site for the Pro Upsells Shopify app, published at **https://docs.seloapps.com**.

Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build). Every page is one Markdown (`.mdx`) file. The site is plain static HTML, and search is built in.

---

## Preview the site on your computer

You need **Node.js 22.23.4 or newer** ([download](https://nodejs.org)). Check with `node -v`.

```bash
npm install        # first time only
npm run dev        # opens a live preview at http://localhost:4321
```

The preview reloads as you save files. Search doesn't work in this mode. To try search, run the real build:

```bash
npm run build      # builds the site into dist/ and checks every link
npm run preview    # serves dist/ at http://localhost:4321
```

---

## Edit a page

Pages live in `src/content/docs/`. The file path is the web address:

| File | Address |
|---|---|
| `src/content/docs/faq.mdx` | `/faq/` |
| `src/content/docs/widgets/volume-discount.mdx` | `/widgets/volume-discount/` |
| `src/content/docs/slide-cart/index.mdx` | `/slide-cart/` |

Every page starts with a short header:

```mdx
---
title: Volume Discount
description: One sentence for Google and search results. About 150 characters.
---
```

Write the rest in normal Markdown. Bold the exact words merchants see in the app, like `**Create**`. Don't put them in quotes or code style.

> **Don't rename or move existing pages.** The app's "View docs" links point to them (see `APP_LINKS.md`). If you must, add a redirect in `astro.config.mjs` under `redirects`, for example `'/old/address/': '/new/address/'`. Also update the list in `scripts/check-links.mjs`.

---

## Add a new page

1. Create a file, for example `src/content/docs/guides/my-new-guide.mdx`, with a `title` and `description`.
2. To show it in the sidebar, open `astro.config.mjs` and add one line in the right group:
   ```js
   { label: 'My new guide', slug: 'guides/my-new-guide' },
   ```
3. Run `npm run dev` to check it.

You don't need import lines. The components below work in every `.mdx` file.

---

## Components you can use

**Steps.** Wrap a numbered list:

```mdx
<Steps>

1. Go to **Upsells** and click **Create**.
2. Click **Save**.

</Steps>
```

**Callouts.** There are four types, each with an icon and a label:

```mdx
<Callout type="note">Something worth knowing.</Callout>
<Callout type="tip">A helpful shortcut.</Callout>
<Callout type="warning">Something that can go wrong.</Callout>
<Callout type="plus">Needs Shopify Plus.</Callout>
```

**Widget summary box.** This goes at the top of each widget page. Use `**double asterisks**` for bold:

```mdx
<WidgetFacts
  bestFor="Products usually bought as a set."
  showsOn="Home, product and cart pages."
  needsBlock="Only for **Embedded** offers."
/>
```

**Next steps.** Put this under a `## Next steps` heading at the end of a page:

```mdx
<NextSteps
  links={[
    { title: 'Read your analytics', href: '/guides/analytics/', description: 'Optional short line.' },
  ]}
/>
```

You can also use `<LinkButton>`, `<CardGrid>`, `<Card>` and `<LinkCard>` from Starlight.

---

## Add a screenshot

1. Save the image in `public/images/`, for example `public/images/storefront-upsell.png`. Use a short, descriptive file name.
2. Add it to a page:
   ```mdx
   <Screenshot
     src="storefront-upsell.png"
     alt="Describe what the merchant sees in the image."
     caption="Optional short caption."
   />
   ```

The `alt` text is required, and the build stops without it. Clicking a screenshot enlarges it.

**Missing images are safe.** If a page points to an image that isn't in `public/images/` yet, the live site shows nothing. While you run `npm run dev`, you'll see a labelled box saying which file is needed. Several pages already point to screenshots from the brief that haven't been captured yet; see `TODO.md`.

Tips for screenshots:
- Crop to the part that matters.
- Hide Shopify's Sidekick bar and the chat bubble.
- Keep files under about 200 KB.
- Check the alt text still matches the image when you replace one.

---

## Settings you may need to change

`src/site.config.ts` holds:

- the support email address
- the Privacy policy link
- the App Store link

The footer and the FAQ pick these up automatically. A link left empty is hidden.

Colours and fonts are in `src/styles/custom.css`. The logo is `src/assets/logo.png`. The social sharing image is `public/og-image.png` (1200 × 630).

---

## Publish

The site deploys on **Vercel**. Pushing to the `main` branch publishes it.

First-time setup:

1. Create a new GitHub repository, separate from the app, and push this folder to it.
2. In Vercel, click **Add New > Project** and import the repository. Vercel detects Astro, and `vercel.json` already sets the build command.
3. In the Vercel project, go to **Settings > Domains** and add `docs.seloapps.com`.
4. Add the DNS record Vercel shows you at your domain provider.

Every build runs a link check (`scripts/check-links.mjs`). If any internal link, image or `#anchor` is broken, or a page the app links to is missing, the build fails and nothing is published. The error lists exactly what to fix.

---

## Project layout

```
astro.config.mjs        Site settings and the sidebar
src/content/docs/       All pages (.mdx)
src/components/         Callout, Screenshot, WidgetFacts, NextSteps and others
src/components/overrides/  Header title, header link, mobile menu, footer
src/styles/custom.css   Colours, type and layout
src/site.config.ts      Support email and footer links
public/images/          Screenshots
scripts/check-links.mjs Link check that runs after every build
APP_LINKS.md            Docs address for each "View docs" link in the app
TODO.md                 Things the owner needs to confirm
```
