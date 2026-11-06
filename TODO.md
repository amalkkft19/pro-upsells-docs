# Owner to-do before launch

Nothing here blocks the build. Work through it before you share the site with merchants.

---

## 1. Conflicts between the brief and the app screenshots

I compared the brief with the 10 app screenshots supplied. Where they disagree, the docs still use the **brief's** wording, as the brief asked. Check each item in the app, then fix the page if needed.

| # | Where in the docs | Brief says | Screenshots show | Suggested fix |
|---|---|---|---|---|
| A | Turn on the app embed, Set up the Slide Cart, Troubleshooting | Theme editor embeds are called **Pro Upsells** and **Pro Upsells: Slide Cart** | The app's **App status** lists them as "Upsell App Embed" and "Slide Cart App Embed" | Check the names in the theme editor's **App embeds** panel. These may be status labels only, but the steps must match what merchants see in the theme editor. |
| B | Set up Web Push | Turn on **Enable web push notifications** in **Web Push > Settings** | **App status** lists a third app embed, "Web Push Notifications", marked **Enabled** | Confirm whether Web Push also needs an app embed turned on in the theme editor. If it does, add that step to `/web-push/` and to the "Shoppers aren't seeing the notification prompt" troubleshooting answer. |
| C | Every offer page | Last step is "Click **Save**" | On the Create offer screen for Volume Discount and AI Recommendations, the top-right button says **Create** | Confirm the button label for a new offer, which may differ from editing an existing one. If it's **Create**, update the last step on the first-offer and widget pages. |
| D | Cart Offers | "Save the offer." | The Create Cart Offer window's button is **Create** | Change step 5 to "Click **Create**." |
| E | Create your first offer, widget pages | "Open **Upsells & Cross-sell** and click **Create**" | Each widget card on the Upsells page has a **Customize** button | Probably fine: **Customize** opens the widget, then **Create** starts an offer. Confirm, and consider "click **Customize** on **Upsells & Cross-sell**". |
| F | Getting started | Three setup steps: app embed, first offer, check your store | The Upsells page's **How It Works** shows: Enable Web Push, Create Upsell Offer, Send Notification | Decide which order you want merchants to follow. The docs and the app should tell the same story. |
| G | Slide Cart pages | Menu item and page are both **Slide Cart Drawer** | The page heading says "Slide Cart". The Customize breadcrumb says "Slide Cart Drawer". | Confirm the menu label. The docs use **Slide Cart Drawer** throughout. |
| H | Add a block to checkout, thank you or order status | Select **Upsell & Cross-sell** or **Volume Discount** in the checkout editor | **App status** lists them as "Upsell & Cross-sell (checkout)" and "Volume Discount (checkout)" | Check the block names in the checkout editor's **Add block** menu. |
| I | Customize the Slide Cart | Product name is always "Pro Upsells" | The Floating Cart **Icon type** option is called "Upsell Pro Cart Icon" | App-side naming fix, if you want it consistent. |
| J | Getting started | The home page has a **Setup progress** card | Not visible in the screenshots supplied | Confirm it exists and is named **Setup progress**. |

## 2. Things I added from the screenshots

These come from what the screenshots show, not from the brief. Remove any you don't want.

- **Read your analytics:** "The app's home page shows an overview for the last 30 days, including **Revenue**, **Impressions** and **Active offers**."
- **Turn on the app embed:** "In the app, the **App status** section on the home page shows each embed as **Enabled** once it's on."
- **Customize the Slide Cart:** the list of tabs (**Settings**, **Translations**, **Design**, **Announcements**, **Cart Goals**, **Fields**) and the live preview.
- **Customize the Slide Cart, Empty Cart:** "You can also turn on **Show action button** and set a **Redirection URL** for where the button goes."
- **Cart Offers, Tips:** "Use `{TIMER}` in the **Description** to show a countdown timer." This comes from the hint shown in the Create Cart Offer window.
- **Contact support:** a short "Before you write" section pointing to Troubleshooting and the FAQ.
- **Header:** shows the logo with "Pro Upsells Docs". The brief says logo plus "Docs", but the logo is an icon with no wordmark, so "Docs" alone wouldn't name the product. To change it, edit `src/components/overrides/SiteTitle.astro`.

**Not added, please clarify:** the Create Cart Offer window has a **Schedule** field (Start Date - End Date) as well as **Validity**. The docs only mention **Validity**. What's the difference?

## 3. Items from the brief (section 10)

1. **Privacy policy URL and App Store listing URL.** Add both to `src/site.config.ts`. Until then the footer hides them, and the FAQ's uninstall answer shows "Privacy policy" as plain text.
2. **Support email.** The site uses support@squidapps.com, set in `src/site.config.ts`. Confirm it's the right public address. It also appears in the consent text inside the app.
3. **Slide Cart Customize.** Partly answered: the screenshots show a **Customize** button at the top of the Slide Cart page. Still confirm how merchants reach the **Live Cart**, **Notifications** and **Offers** tabs. The Slide Cart page shows cards called Cart Upsells, Offer Sections and Personalised Cart Notifications, and the docs don't mention those names.
4. **Cart Goals reward types.** Step 5 currently says "from the options in the form, such as **Free Shipping**, **Order Discount**, **Percentage (%)** or **Fixed Amount**". Replace it with the exact list.
5. **Template theme.** Confirm the option names under **Design**. The docs don't list them yet.
6. **Free gift.** Confirm that a 100% discount produces a free gift on a real store.
7. **Live Cart notifications.** Confirm how shoppers see a sent notification. The docs say it appears in the drawer's Notifications tab the next time they open it.
8. **Theme editor steps.** Check the steps on the current Horizon theme. Block menus vary a little by theme.
9. **Uninstall data answer** in the FAQ. Confirm the privacy policy covers it.
10. **Cart Offers.** Confirm the discount code must already exist in Shopify before it's added to an offer.

## 4. Screenshots

### Already in `public/images/` (from the screenshots supplied, cropped)

I cropped them to remove Shopify's Sidekick bar and the chat bubble.

| File | Shows | Used on |
|---|---|---|
| `app-home-status.png` | App status and Last 30 days | Getting started |
| `upsells-widget-list.png` | Upsell Widgets list | Create your first offer |
| `offer-general.png` | Upsell offer, General tab, with live preview | Create your first offer, Upsell & Cross-sell, Offer settings |
| `offer-volume-discount.png` | Volume Discount offer, General tab | Volume Discount |
| `offer-fbt.png` | FBT offer, General tab | Frequently Bought Together |
| `offer-ai-recommendations.png` | AI Recommendations offer, General tab | AI Recommendations |
| `offer-free-gift.png` | Automatic Free Gift form with the "no storefront widget" banner | Automatic Free Gift |
| `slide-cart-overview.png` | Slide Cart page in the app | Set up the Slide Cart |
| `slide-cart-customize.png` | Customize, Settings tab | Customize the Slide Cart |
| `slide-cart-create-offer.png` | Create Cart Offer window | Cart Offers |

The `offer-*.png` images show the app's **live preview**, not a real storefront, and their captions say so. They show your test store's address (light-house-speed-test.myshopify.com) in the preview bar. Replace them if you'd rather not show it.

### Still needed

The pages already point to these files. Each one appears on the live site as soon as you add it to `public/images/` and push, with no code change. Until then, nothing shows on the live site, and a labelled placeholder shows in `npm run dev`.

| File | Shows | Page |
|---|---|---|
| `app-embeds.png` | Theme editor App embeds with Pro Upsells on | Turn on the app embed |
| `offer-discounts.png` | Discounts section of an offer | Create your first offer |
| `add-block-banner.png` | "Add this widget" banner in the offer form | Add a widget block |
| `theme-editor-block.png` | Block in the theme editor | Add a widget block |
| `storefront-upsell.png` | Upsell widget on a store | Upsell & Cross-sell |
| `storefront-fbt.png` | FBT widget on a store | Frequently Bought Together |
| `storefront-volume.png` | Volume Discount on a store | Volume Discount |
| `storefront-ai.png` | AI Recommendations on a store | AI Recommendations |
| `cart-free-gift.png` | Free gift in a cart | Automatic Free Gift |
| `slide-cart-drawer.png` | Slide Cart open on a store | Set up the Slide Cart |
| `slide-cart-goals.png` | Cart Goals bar in the drawer | Cart Goals |
| `slide-cart-offers.png` | Offers tab in the drawer | Cart Offers |
| `live-cart.png` | Live Cart tab | Live Cart and notifications |
| `web-push-settings.png` | Web Push settings | Set up Web Push |
| `web-push-prompt.png` | Allow / Not now prompt on a store | Set up Web Push |
| `checkout-editor-block.png` | Block in the checkout editor | Checkout blocks guide |

The alt text for these was written before the images exist. When you add one, open the page and check the `alt` still describes the image.

## 5. Launch checklist

- [ ] Push to a new GitHub repository and import it in Vercel (see README).
- [ ] Add `docs.seloapps.com` in Vercel, then add the DNS record.
- [ ] Fill in the two links in `src/site.config.ts`.
- [ ] Work through sections 1 and 3 above.
- [ ] Update the app's links using `APP_LINKS.md`.
