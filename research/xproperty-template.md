# Xproperty — Real Estate Property Listing HTML Template — Research Record

Researched: 2026-11-08 (public information only; no purchase, no package download)
Item: ThemeForest #59505035 — https://themeforest.net/item/xproperty-modern-property-listing-real-estate-html-template/59505035
Author: **laralink** (Elite Author, ~2,452 Envato sales)
Category: ThemeForest > Site Templates > Corporate > Business
Method note: direct `curl` to themeforest.net is blocked by Cloudflare (HTTP 403 challenge); item page was read via a reader proxy, an April 2026 Wayback snapshot, and the live demo server itself.

---

## 1. Marketplace facts

| Field | Value |
|---|---|
| Regular license price | **$24** (incl. buyer fee) |
| Extended license price | **$700** |
| Current version | **v2.0.0** (changelog: "October 07, 2026: Xproperty v2.0.0"; v1.0.0 "September 25, 2025 — Initial release") |
| Last update | **7 October 2026** (marked "Recently Updated") |
| Created | ~1 September 2025 (item shows "Created 1 year ago"; a Sep 3, 2025 cached copy said "Created 2 days ago"; exact day — unverified) |
| Sales | 18 (as of 2026-11-08) |
| Comments | 2 (congratulatory only) |
| Rating | none shown |
| Compatible browsers | IE9, IE10, IE11, Firefox, Safari, Opera, Chrome, Edge (marketplace claim) |
| Compatible with | Bootstrap 5.x (demo ships **Bootstrap 5.3.8**, verified from served CSS header) |
| Files included | HTML Files, CSS Files, SCSS Files, JS Files |
| Download contents | "HTML File" + "Documentation File" (offline HTML documentation; no external docs URL published) |
| Layout | Responsive, 4+ columns, High Resolution: Yes |
| Support | 6 months included (extend to 12 months: $7.50 promo / $17.50 regular) |

Alternative purchase channels (same author/product):
- Author's own store: https://laralink.com/product/xproperty-modern-property-listing-real-estate-html-template — **$12** (product JSON price), lifetime updates claim.
- Envato Elements: "Xproperty – Modern Real Estate HTML Template" (elements.envato.com/xproperty-modern-real-estate-html-template-F5DMWH2) via Elements subscription; file types HTML/CSS/SASS/JS/AI.

## 2. Technology stack (verified against live demo assets)

**CSS/JS libraries served by the demo:**
- Bootstrap 5.3.8 (bootstrap.min.css banner comment)
- jQuery (jquery.min.js)
- Slick Slider (slick.min.js/.css) — carousels
- AOS (aos.min.js/.css) — scroll animations
- Lenis (lenis.min.js) — smooth scrolling
- LightGallery (light-gallery.min.js/.css) — galleries/lightbox
- Odometer (odometer.min.js/.css) — animated stat counters
- Tom Select (tom-select.min.js/.css) — search/select dropdowns (location autocomplete)
- Flatpickr (flatpickr.min.js/.css) — date/time pickers (tour scheduling)
- Leaflet + leaflet-markercluster — half-map property listing page (open-source maps, NOT Google Maps)
- Font Awesome 6 (icons), flag-icon (language/currency flags)
- SCSS sources included in the package (marketplace attribute); custom classes use `cs_` prefix (e.g. `cs_card`, `cs_hero`, `cs_sidebar`)

**Isotope** is listed in the ThemeForest "jQuery Plugins" credits but was NOT observed in the demo's homepage asset list — unverified whether it ships in v2 (may be used on specific pages or dropped in v2.0.0).

**Design system (from style.css `:root`):**
- `--primary-color: #1D1D1D` (near-black), `--accent-color: #00CC61` (green accent), `--secondary-color: #434343`, `--border-color: #D1D1D1`, `--gray-color: #E2E2E2`, glassmorphism tokens (`--cs-glass-bg: rgba(255,255,255,.55)`, large soft shadows)
- Fonts (Google Fonts `@import`): **Cabin** (primary, 400–700), **Raleway** (secondary), **Carattere** (cursive decorative accent)
- **Dark mode** supported (`cs_dark` theme persisted in localStorage) and **RTL support** (`--cs-dir` switcher) — language switcher on the homepage offers ENG / BAN / ESP / ARB / ZHC / GER
- Rounded design language (`cs_radius_20` cards, radius-10 price badges), big rounded imagery, pill badges

## 3. Page inventory (from demo nav + link extraction, 2026-11-08)

Marketing claims: **10 unique home demos, 32+ inner pages, 200+ components** (v1 numbers; v2.0.0 adds agency directory, half-map search, and **four role dashboards**).

**Home/demo variants (10, per nav "Home" dropdown):**
1. `index.html` — Property Search (main demo home)
2. `home-v2.html` — Luxury Homes
3. `home-v3.html` — Real Estate Agency
4. `home-v4.html` — Property Finder
5. `home-v5.html` — Property Broker
6. `home-v6.html` — Rental Homes
7. `commercial-residence.html` (Commercial Residence)
8. `apartment-complex.html` (Apartment Complex)
9. `single-property-v1.html` (Single Property V1)
10. `single-property-v2.html` (Single Property V2)

**Inner pages (root-level, 37):** property-listing-buy / property-listing-rent / property-listing-search / property-listing-map / property-details / projects / open-house / neighborhoods / compare / mortgage-calculator / about-us / services / sell-property / agents-list / agent-details / agencies / agency-details / testimonials / careers / pricing / faq / gallery / rental-application / register / login / verify-email / privacy-policy / terms-condition / error (404) / coming-soon / maintenance / blog / blog-grid / blog-list / blog-details / contact / owner/submit-property

**Role dashboards (v2.0.0):**
- **Owner dashboard** (`owner/`): index, analytics, applications, billing, documents, edit-property, leads, maintenance, messages, my-properties, notifications, offers, profile-settings, reviews, submit-property, tenants, tour-requests (~17 pages)
- **Admin dashboard** (`admin/`): index, agents, all-properties, blog-posts, coupons, financials, listing-settings, messages, notifications, property-approvals, reports, reviews, roles, site-settings, subscriptions, support-tickets, user-management (~17 pages)
- **Agent dashboard** (`agent/index.html` exists; page count unverified)
- **Buyer dashboard** (`buyer/index.html` exists; page count unverified)
- Dashboards have dark-mode toggle + collapsible sidebar (persisted), stat counters, approval queues, message/notification panels

Total: roughly **80+ HTML files** (47 root-level incl. 10 homes, ~34 dashboard pages across 4 roles). Count is approximate; "32+ inner pages" is the author's v1 figure.

## 4. Live preview

- Demo URL: **https://html.laralink.com/xproperty/** — **REACHABLE** (HTTP 200; served via Cloudflare, last-modified Oct 7, 2026 = v2.0.0 build)
- Note: requests without browser-like headers get 403/404 (bot protection); browser headers succeed.
- False positive to avoid: `https://xproperty.vercel.app/` is an **unrelated** PHP "XProperty Property Management Portal" (different product, same name). Do not use it as the design reference.

### Homepage (index.html) layout, top to bottom
1. Skip-link + page loader ("Loading…")
2. Header: logo (SVG light/dark variants), main nav (Home, Listing, About, Pages, Blog, Contact), language switcher, Login, CTA button "List Your Property" (`owner/submit-property.html`)
3. Hero: full-width property photo (`hero-bg-1.webp`), "New Listing" tag, featured property "Golden Meadows" $50,000, "100% Verified" badge, claim "Over 15,000+ verified properties listed"
4. **Search card directly in the hero**: Buy/Rent toggle tabs; Property Type select (Apartment, House, Villa, Office, Commercial, Land); Location input with city autocomplete suggestions (New York, London, Paris, Dubai, Tokyo, Sydney, Toronto, Berlin, Singapore, Mumbai); "Advanced" expander + Search button; popular-search tags (Villa, Apartment, Office, Dubai, London)
5. Featured properties — 4-card grid/slider (Golden Meadows $50k, Evergreen Estates $70k, Maple Ridge Apartments $85k, Lakeside Manor $50k)
6. "Prime Locations, Exceptional Living" — city tiles with listing counts (Tokyo 20, Dubai 11, Jakarta 08, New York 18, Hanoi 36)
7. About section — 3 value props (Trusted Partner, Personalized Service, Experienced Team) + animated Odometer stats
8. Rental listings section (Blue Sky Homes $800/mo, etc.)
9. "How It Works" — video banner (YouTube embed) + 3 steps: Explore Listings, Connect with Experts, Close the Deal
10. Testimonials — 4 cards
11. Contact CTA ("Have a Question?")
12. Blog — 3 article cards with read-time labels
13. Footer: logo, newsletter signup, link columns (Discover / Quick Links / Contact Us), social icons, **currency selector ($ USD, € EUR, £ GBP, AED)**, copyright
14. Hidden advanced filter panel (expandable): Bedroom 1–4+, Bathroom 1–4+, Amenities checkboxes (Garden, Play Ground, Swimming Pool, Fitness Center, Parking, 24/7 Security, Elevator, Rooftop Terrace, Garage, Bike Storage), Price, Square Feet

### Property card design (`cs_card cs_style_1`)
- Thumbnail link (`cs_card_thumbnail cs_radius_20`) with **two stacked images** (`cs_card_img_front` / `cs_card_img_back`) that swap on hover; lazy-loaded WebP
- Price pill overlaid on image (`cs_property_price`, primary-bg, radius-10, white semibold)
- Content block: title → feature row of inline SVG icon chips — Bed / Bath / Sqft (`cs_property_features` list, custom `bed.svg`, `bathtab.svg`, `squares.svg` icons) → address → "View Details" CTA
- Listing pages also have "Recently Viewed" strip, newsletter band, and an empty state ("No properties match your filters")

### Listing page (property-listing-buy.html)
- Title "Properties for Sale"; left sidebar filters: Property Type, Offer Type, Location, Bedroom, Bathroom, Price, Square Feet
- Card grid results; map variant (`property-listing-map.html`) = split half-map layout with Leaflet + marker cluster
- Related utility flows: compare, mortgage calculator, rental application, open house

### Property detail page (property-details.html)
- Title + price ($70,000) + type pill ("Appartment" [sic]) + facts row: Built in 2010 / 3 Beds / 3 Baths / 1200 Sqft / 1 Garage
- Gallery (LightGallery + Slick, 6 mentions), Map section
- Sidebar: Schedule A Tour (Flatpickr date/time), Contact Agent
- Tabbed/sectioned content: Description, Location (map), Property Details, Amenities, Floor Plan (tabs), Video & Virtual Tour, Price History, Financial Details
- Area stats: Walk Score / Transit Score / Bike Score; "What's Nearby" POI lists — schools, universities, hospitals, malls, water park, park, airport, financial hub
- Reviews section (32 mentions) + agent card; mortgage widget (10 mentions)

### Dashboards
- Owner: property table cards (Northern Apartment, Blue Seagull Beach House, …), leads/messages/notifications, applications, documents, billing, maintenance requests, tenants, tour requests, offers, reviews, analytics
- Admin: KPI counters (Revenue, New Users), pending approvals queue, user management by role (agent/buyer/owner), property approvals (active/pending/rejected), subscriptions, coupons, financials, reports, roles, site settings, blog posts, support tickets, listing settings

## 5. Sources & credits (published on the item page)
- Fonts: Cabin, Raleway (Google Fonts)
- Preview images: Unsplash, Freepik — **not included in the download package**
- Support: 24/7 claim, answers within 3 business days (author's item page)

## 6. License requirements (Envato standard terms, as shown on the item page)
- **Regular License $24**: use by you or one client, in a **single end product** whose end users are **not** charged for it. One license = one end product; a second project requires a second license.
- **Extended License $700**: same single-end-product scope, but end users **can** be charged (e.g., a paid listing platform/SaaS).
- Includes Envato quality check, future updates, 6 months author support (extendable to 12).
- Template license covers the HTML/CSS/JS/SCSS code; **preview photos must be replaced** (Unsplash/Freepik images are preview-only).

## 7. Source package availability — explicit statement

**The Xproperty source package is NOT available locally.** No purchased/downloaded copy of the template exists on this machine; nothing under this project directory or the user's folders contains the package, and none was downloaded during this research (per task rules: no purchase, no download). Everything documented above comes from public pages (ThemeForest item page via reader proxy and a Wayback snapshot), the author's public demo server (`html.laralink.com/xproperty/`), the author's own product page, and public search results. A licensed purchase is required to obtain the HTML/SCSS source files.

## 8. Third-party coverage / reviews

- No independent editorial reviews found. Aggregator listings are promotional copies of the ThemeForest description: thememag.com (Sep 3, 2025), thememarkets.com, thememarts.com.
- A Colorlib "19 Best Bootstrap Real Estate Templates 2026" roundup (checked) does **not** include Xproperty; earlier search-result claims that it appeared in roundups were unverified/inaccurate.
- Marketplace comments: 2 congratulatory posts ("GLWS") from other authors; no buyer feedback yet (18 sales).
- Caution: a "free download" site (theme-guide.com) surfaced in search — that would be an unlicensed/pirated copy; not used and not to be used.

## 9. Notes for the custom build (design adaptation)
- Reference palette: near-black primary (#1D1D1D) + green accent (#00CC61) on white, glassmorphism cards, radius-20 imagery, pill badges, Cabin/Raleway typography.
- Homepage pattern: hero photo + overlapping search card (Buy/Rent toggle, type + city autocomplete + advanced filters) → featured cards → city tiles → stats → rentals → video/how-it-works → testimonials → blog → newsletter footer.
- Card pattern: hover image swap, price pill overlay, icon chip facts row (bed/bath/area), View Details.
- Detail pattern: gallery + sticky tour/agent sidebar + tabbed floor plans, price history, financials, area scores, nearby POIs.
- If a half-map listing is wanted without Google Maps billing, the template's approach (Leaflet + markercluster) is a free, self-hostable pattern.
- Dark mode + RTL are built in; a custom build can cherry-pick these (CSS custom properties already structured for direction/theme switching).
