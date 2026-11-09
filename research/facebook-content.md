# Facebook Page Research — Hyperion Design & Development Ltd. (HDDL)

- **Page URL:** https://www.facebook.com/hddlbd/
- **Date checked:** 2026-11-08
- **Method:** public logged-out fetching only (mcp webReader + WebFetch) and public web-search results. No login tricks, no scraping proxies, no third-party Facebook mirrors were used (per research rules).

---

## 1. What WAS accessible

All of the following was read directly from facebook.com while logged out, via the
web-reader tool (WebFetch was title-blocked; see Access limitations):

| Field | Value | Where seen |
|---|---|---|
| Page name | Hyperion Design & Development Ltd. (title suffix "\| Mirpur") | page title / og:title |
| Page ID | **100063949368562** | deep-link metadata `fb://profile/100063949368562` |
| Followers | **171** followers · **4** following | /about and page header |
| "Talking about" | 2 | meta description |
| Category | **Property developer** | /about → Categories |
| Address (page-level) | Mirpur, Bangladesh, **1216** | /about → Contact info |
| Service area | Dhaka, Dhaka Division, Bangladesh | /about |
| Mobile | **+880 1701-287501** | /about → Contact info |
| Email | **info@hddlbd.com** | /about → Contact info |
| Website | **https://hddlbd.com/site/contact.html** | /about → Websites and social links |
| Rating | Not yet rated (0 reviews) | /about → Basic info |
| Hours widget | Present ("Closing soon" state observed — hours are configured) | /about |
| Intro (meta/og description) | "Hyperion Design & Development Ltd., Mirpur. 171 followers · 2 talking about this. Hyperion Design and development Ltd. Is one of the leading real estate Companies in Bangladesh Speci…" (truncated by Facebook at "Speci…") | og:description |
| Canonical URL | https://www.facebook.com/hddlbd/ | link rel=canonical |
| Mobile alternate | https://m.facebook.com/hddlbd | link alternate |
| og:type | video.other | metadata |

### Images (see facebook-media.json for full signed URLs)
- **Profile picture file:** `302044249_472148258260149_9184621476511570089_n.jpg` (fbcdn t39.30808-1, _nc_cat=104)
- **Cover photo file:** `481255436_1100145868793715_4004077990563989079_n.jpg` (rendered at the classic 820x312 cover size, _nc_cat=100)
- Facebook CDN URLs are **signed and expire** (the `oe=` parameter decodes to ≈ 2026-11-12, days after this research). Grab fresh URLs or the actual image files before building if they are needed.

### Sub-pages successfully fetched logged-out
- `/hddlbd/about` — full contact & basic info (table above) + a Reels grid.
- `/hddlbd/photos` — one 8-photo album grid visible (batch of sequentially-ID'd uploads, 2024-era file IDs `1491671802974451` … `1491673099640988`).
- `/hddlbd/videos/2764481050602398` — one reel with stats and 2 related videos.
- Two individual post permalinks (below).

---

## 2. Posts, videos, reels found

### Fetched directly (content verified)
1. **Post 1536959208445710** — text: *"Hyperion Condominium 100 % ready flat for sale @ 1560-1695sft at banasree. For details please call to Hyperion Design & Development Ltd. : 01701287501"* — dated June 14, 2026; 1 reaction. The same permalink also surfaced a **photo-album post dated August 4, 2026** (9 photos, the same batch as the /photos grid).
   - URL: https://www.facebook.com/hddlbd/posts/1536959208445710
2. **Post 1503103181831313** — og:description only: *"1695 -1560 sq-ftf 100 % Exclusive ready apartment available for sale in Hyperion Park View. Hyperion Park View has been built by Hyperion design & development ltd company and it is located in…"* (Facebook truncates logged-out descriptions). 5-image album (file-ID batch `1488084xxxxxxx`).
   - URL: https://www.facebook.com/hddlbd/posts/1695-1560-sq-ftf-100-exclusive-ready-apartment-available-for-sale-in-hyperion-pa/1503103181831313
3. **Reel 2764481050602398** (canonical: https://www.facebook.com/reel/2764481050602398/) — posted Sunday, June 14, 2026, 12:36 PM; **~1K views, 3 reactions, 1 comment** (a Bengali greeting from commenter "Abdul Hannan", ~20 weeks before check). Thumbnail file `719740254_869573518978481_1864991916397987591_n.jpg`.
4. **Related video (June 13):** *"Hyperion 100% ready flat for sale @ 1695-1560sft at banasree. For details please call us : 01701287501."* — duration 3:03, **394 views**. Thumbnail `722035168_1548300850105022_5645773720887346421_n.jpg`.
5. **Related video (June 14):** "Hyperion Design & Development Ltd.'s video" — 3:03, **312 views**. Thumbnail `724276042_1022782400283212_9138637790435683224_n.jpg`.

### Surfaced by web search but NOT fetched
6. Post 1536959245112373 — https://www.facebook.com/hddlbd/posts/1536959245112373
7. Post 1503142961827335 — https://www.facebook.com/hddlbd/posts/7215ee9c/1503142961827335
8. Reels page for a second handle: https://www.facebook.com/hyperionddl/reels — "Hyperion Design & Development Ltd (@hyperionddl)"
9. A third page handle: https://www.facebook.com/hyperiondesignanddevelopmentltd — "Hyperion Design & Development Ltd | Dhaka"

### What search results reveal about page content (search-engine snippets of facebook.com pages)
- Recurring promo theme: **"100% ready" flats for sale in Banasree (Titash Road)**, 1,560–1,695 sqft — the Hyperion Condominium / Hyperion Park View buildings.
- Other promoted units: a 1,700 sqft flat "with modern amenities"; a ~3,300 sqft luxury 4-bed apartment at **Niketan, Dhaka** (with swimming pool, gymnasium, community space); a 1,510 sqft 3-bed under-construction flat (handover Aug 2023); 1,300 sqft 3-bed ready flat in Banasree.
- Amenities named in posts: swimming pool, gymnasium, community space, prayer room.
- Areas the page posts about: **Mirpur, Banasree, Badda, Rampura, Aftabnagar, Bashundhara**.
- Company claims repeated on the page: operating **since 2000**, **100+ apartments delivered**, **21 ongoing projects** (matches the company's own bdhousing profile text).
- Contact lines inside post text: `01701287501` and `0817158096` (the latter, as written in post text, corresponds to 01817158096).

---

## 3. Related pages of the same company (found via search, unverified extent)
- facebook.com/hyperiondesignanddevelopmentltd (long-name page)
- facebook.com/hyperionddl (@hyperionddl — reels/short-video page)

These look like additional or duplicate pages run by the same company; neither was
fetched in this session, so their relationship to hddlbd is not confirmed.

---

## 4. Access limitations (honest account)

1. **Facebook gates logged-out page views.** WebFetch returned nothing but the page
   title on every attempt (main page, /photos, /about). The web-reader tool got
   substantially further but still only sees the public logged-out shell.
2. **Feed browsing is impossible logged out.** The main timeline shows only a
   "See more … / Log in" stub. Only individual post/reel permalinks render content.
3. **Intermittent fetch failures.** The web reader returned `500 network` errors on
   several attempts (main page first try; /photos once; the Park View post permalink
   once — succeeded on retry). Some permalinks could not be fetched at all.
4. **Not retrievable:** full post history/timeline, comment threads (beyond one reel
   comment), events, "Page transparency" details (page creation date, admin country),
   follower history, and the full untruncated intro text (Facebook truncates og
   descriptions at ~160 chars).
5. **Signed CDN URLs expire** (≈ 2026-11-12 for everything captured on 2026-11-08).
   Any URL in facebook-media.json may stop working within days; the *file IDs* are
   stable but require fresh signatures.
6. No login tricks, proxies, or mirror sites were used; everything above came from
   facebook.com itself or from public search-result snippets of facebook.com pages.

---

## 5. Cross-references
- Company website (listed on the page): https://hddlbd.com/site/contact.html — fetched, live. Contact details there match the page's about section exactly.
- bdhousing (REHAB marketplace) developer profile: https://www.bdhousing.com/Hyperion-Design-DevelopmentLtd — 5 project listings, company bio, no phone shown.
- See contact-verification.md for the full verification table.
