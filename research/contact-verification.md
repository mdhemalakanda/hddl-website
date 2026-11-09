# Contact Detail Verification — Hyperion Design & Development Ltd. (HDDL)

- **Date checked:** 2026-11-08
- **Rule applied:** a detail is VERIFIED only if a credible public source shows it. Partial numbers stay partial. Nothing below is inferred or invented.

## Key primary sources (fetched directly)
- **[FB-ABOUT]** https://www.facebook.com/hddlbd/about — the company's own Facebook page, About tab (fetched logged out)
- **[SITE]** https://hddlbd.com/site/contact.html — the company's own website contact page (fetched; listed on the FB page)
- **[BDH-PROFILE]** https://www.bdhousing.com/Hyperion-Design-DevelopmentLtd — REHAB marketplace developer profile
- **[BDH-248497]** https://www.bdhousing.com/details/248497/under-construction-flats-sale-banasree (Hyperion Park View Building -3 listing; raw HTML)
- **[BDH-243796]** https://www.bdhousing.com/details/243796/1500-sqft-3-beds-apartment-flats-sale-banasree (Hyperion Mozibur Tower listing; raw HTML)
- **[BDH-236777]** https://www.bdhousing.com/details/236777/hyperion-samad-tower-1350-sqft-3-beds-ready-apartment-for-sale-at-mirpur-10 (raw HTML)
- **[REHAB-DIR]** https://goproperty365.com/directory/Rehab?page=18 — REHAB members directory (entry #8)
- **[BDTALIKA]** https://bdtalika.com/details/hyperion-design-development-ltd
- **[FB-POST]** https://www.facebook.com/hddlbd/posts/1536959208445710 (fetched)
- **[FB-REEL]** https://www.facebook.com/hddlbd/videos/2764481050602398 (fetched)

## Verification table

| # | Item | Value (exactly as found) | Status | Source(s) | Notes |
|---|---|---|---|---|---|
| 1 | Facebook page | https://www.facebook.com/hddlbd/ | **VERIFIED** | [FB-ABOUT] | Page name: "Hyperion Design & Development Ltd." |
| 2 | Facebook page ID | 100063949368562 | **VERIFIED** | [FB-ABOUT] metadata | `fb://profile/100063949368562` |
| 3 | Mobile / primary hotline | **+880 1701-287501** (also written 01701287501) | **VERIFIED** | [FB-ABOUT], [FB-POST], [FB-REEL] | FB About "Mobile" field; quoted verbatim in the company's own post and reel captions |
| 4 | Hotline | **+88-01817146188** | **VERIFIED** | [SITE] | Shown as "Hotline: +88-01817146188, 01817158096" on the company's own site; single source |
| 5 | Hotline | **01817158096** | **VERIFIED** | [SITE]; post text "0817158096" via search snippet | Company's own website lists it |
| 6 | Hotline | **+8801817158095** | **VERIFIED (listed contact)** | [BDH-248497], [BDH-243796] | Unmasked `tel:` link inside bdhousing listings posted by this developer. ⚠ Conflicts with #5 only in the last digit (…095 vs …096). Both are attested by credible sources — confirm with the client which is canonical before publishing |
| 7 | Landline | **+88-02-9011422** | **VERIFIED** | [SITE]; "9011422" also in demo-site footer | Company's own website: "Phone Contact: +88-02-9011422, +88-02-9039418" |
| 8 | Landline | **+88-02-9039418** | **VERIFIED** | [SITE] | Single source (own site) |
| 9 | Fax | **+88-02-8058884** | **VERIFIED** | [SITE] | Single source (own site) |
| 10 | Email | **info@hddlbd.com** | **VERIFIED** | [FB-ABOUT], [SITE], [REHAB-DIR] | Three independent credible sources |
| 11 | Office address | **Hyperion Tower, House #02, Block #A, Road #04, Section #10, Mirpur, Dhaka-1216, Bangladesh** | **VERIFIED** | [SITE], [REHAB-DIR], [BDTALIKA] | FB page itself shows only city level: "Mirpur, Bangladesh, 1216" |
| 12 | Website | **hddlbd.com** (contact page: https://hddlbd.com/site/contact.html) | **VERIFIED** | [FB-ABOUT] lists it; site fetched live | |
| 13 | WhatsApp | — | **NOT FOUND** | — | No public WhatsApp number anywhere; the unofficial demo site has a WhatsApp button that does not expose a number |
| 14 | REHAB membership | Active member, Real Estate & Housing Association of Bangladesh | **VERIFIED** | [REHAB-DIR] (dedicated member entry), [BDH-PROFILE] bio text | |
| 15 | Chairman | Mrs. Sharfun Nahar Arju | **VERIFIED** | [REHAB-DIR] | REHAB directory entry: "Chairman, Hyperion Design and Development Ltd." |
| 16 | Founding year | **2000** | **VERIFIED** | [BDH-PROFILE] company bio ("Hyperion started its journey in 2000"; bio written ~2013: "During the last 13 years") | ⚠ The unofficial vercel demo site says "since 2010" — treat 2000 (company's own bdhousing bio) as authoritative |
| 17 | Track record | 102 apartment buildings completed & handed over; 21 ongoing projects | Self-reported, consistent across [BDH-PROFILE] bio and FB page description snippets | Verified as *claims*, not independently audited | |
| 18 | Google rating | 4.3 / 5 from 32 reviews | **VERIFIED as displayed** | [BDTALIKA] (embeds Google reviews) | Reviewer quotes: "Best developer in mirpur area. Along with bonosree." |
| 19 | Business hours | Mon–Sun 09:00–18:00 | **PARTIAL / conflicting** | [BDTALIKA] directory hours; unofficial demo claims "9:00 AM – 10:00 PM" | Confirm with client |

## bdhousing masked-phone patterns (recorded exactly)

- **[BDH-PROFILE] (company profile page):** displays **NO phone number at all** — no full number and no masked pattern anywhere in the page HTML.
- **Listing detail pages of this developer** ([BDH-248497], [BDH-243796]) display the masked pattern:
  - `+8801817158xxx` (i.e. visible digits **01817158**, last 3 masked) — also rendered as `01817158 xxx`.
  - However, the click-to-call `tel:` link on the same pages contains the **unmasked** number `+8801817158095` (#6 above).
- **[BDH-236777] (Hyperion Samad Tower listing)** displays `01767062xxx` (visible **01767062**, last 3 masked) and an unmasked `tel:` link `+8801767062090`.

| # | Item | Value | Status | Source(s) | Notes |
|---|---|---|---|---|---|
| 20 | Masked pattern (Hyperion's own bdhousing listings) | `01817158xxx` — visible: 0,1,8,1,7,1,5,8; masked: last 3 | **PARTIAL (display) / full number exposed in tel: link** | [BDH-248497], [BDH-243796] raw HTML | Full number from tel: link recorded as #6 |
| 21 | Samad Tower listing phone | `+8801767062090` (masked as `01767062xxx`) | **UNVERIFIED as a company number** | [BDH-236777] raw HTML | Likely the listing/agent's number, not the company's official line (does not match any official number). Do not publish as HDDL's contact |

## Numbers and emails that must NOT be used (found only in unreliable places)

| # | Item | Where seen | Status | Why rejected |
|---|---|---|---|---|
| 22 | `01817158095` as stated by Yandex Maps | Search-engine summary of the Yandex Maps listing | Superseded | Same digits as #6 (which has a stronger primary source, the bdhousing `tel:` link); Yandex was not directly fetchable |
| 23 | `01865015371` / `01865015372` ("for property viewings") | One search-engine AI summary only; no primary page found | **UNVERIFIED** | No credible primary source; do not use |
| 24 | `01713018405` / `01713186944` / hotline `16687` | One search-engine AI summary | **UNVERIFIED / likely misattributed** | 16687 is a property-portal hotline; likely confusion with another developer |
| 25 | `hyperiondevltd@gmail.com` | One search-engine AI summary | **UNVERIFIED** | No primary source shows this email; official email is info@hddlbd.com |
| 26 | "42 Gulshan Avenue, Gulshan Circle-1, Dhaka-1212" | Search-engine AI summary attributed it to HDDL's REHAB entry | **DEBUNKED** | Direct fetch of [REHAB-DIR] shows that address belongs to **Icon Housing & Builders Ltd.** HDDL's REHAB address is the Mirpur one (#11) |

## Other findings (projects, extras)

- **Projects listed on [BDH-PROFILE]** (5 active listings): Hyperion Pride (Pallabi, 3bd/3ba, 1350 sqft) · Hyperion Park View Building-2 (Banasree, 3bd, 1560 sqft) · Hyperion Park View Building-3 (Banasree, 3bd, 1695 sqft, **TK 1.46 Cr**) · Hyperion Mozibur Tower (Banasree, 3bd, 1500 sqft) · Hyperion Chayapallab (Pallabi, 4bd/4ba, 2000 sqft). (bdhousing's own detail slug for Park View B-2 says 1690 sqft — minor internal inconsistency on their side.)
- **Other projects surfaced by search:** Hyperion Mannan Tower (Pallabi, 4bd, 1950 sqft upcoming, bdhousing /details/236713; 8-passenger Hyundai lift) · Hyperion Samad Tower (Mirpur-10, 3bd, 1350 sqft ready, /details/236777) · Hyperion Condominium (Banasree, Titash Road, ready 1560–1695 sqft) · Hyperion Tulip (Mirpur-2, 3bd, 1600 sqft ready; search summary only) · a ~3,300 sqft luxury 4-bed at Niketan (FB promo). "Hyperion Heights II (2026 launch)" appears **only on the unofficial vercel demo site** — do not treat as a real announced project.
- **Amenities named in listings:** swimming pool, gymnasium, community space, prayer room.
- **Unofficial demo site found:** https://hddl-real-estate.vercel.app ("HDDL – Hyperion Design & Development Ltd.", © 2024) — its contact footer matches official numbers (#3, #5, #7) and email (#10), but its copy ("since 2010", "25+ handovers", "Hyperion Heights II") is unverified and conflicts with the company's own 2000/102-buildings bio. Treat as a prior design demo, not an official source.

## Same-name companies — do not confuse

- **Hyperion Builders Ltd.** (Mirpur DOHS; REHAB member, Chairman Md. Shamsul Alam, salamhyperion@gmail.com) — a different company that appeared repeatedly in the same searches.
- **Hyperion Design & Development** (North Bend, WA, USA — hyperiondd.com) — unrelated US contractor.
- **Hazera Design & Development Ltd.** (Dhaka) — different company that appeared adjacent to HDDL in search results.
