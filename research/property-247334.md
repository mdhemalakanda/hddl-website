# Property Research Report — bdHousing Listing 247334

- **Project (listing name):** Hyperion Chayapallab
- **Developer:** Hyperion Design & Development Ltd. (Builder) — seller user ID 1230
- **Source URL:** https://www.bdhousing.com/details/247334/4-beds-under-construction-apartment-flats-sale-pallabi
- **Fetched:** 2026-11-08 (webReader render + raw HTML via curl; both cross-checked)
- **Page `<title>`:** `Under Construction Flat for Sale at Pallabi ` (trailing space as shown)
- **Breadcrumb:** Home / details / 4 beds under construction apartment flats sale pallabi

---

## 1. Headline

H1 (verbatim): **2000 sqft, 4 Beds Under Construction Apartment/Flats for Sale at Pallabi** — followed by an orange badge: **Sale**

## 2. Core Facts (all shown on page)

| Field | Value (verbatim) |
|---|---|
| Property ID | 247334 |
| Property Name | Hyperion Chayapallab |
| Property Type | Apartment/Flats |
| Property For | Sale |
| Price | **Call for price** (no numeric price anywhere on the page) |
| Location | Pallabi , Dhaka (summary field); "Pallabi, Dhaka." in the header |
| Construction Status | Under Construction |
| Property Size | 2000 sqft |
| Transaction Type | New |
| Floor Avaiable On *(sic — site's own typo)* | 4th Floor, 6th Floor |
| Bedroom | 04 |
| Baths | 04 |
| Balconies | 3 |
| Garages | Parking 1 |
| Furnishing | Unfurnished |
| Facing | N/A |
| Land Area | N/A |
| Handover Date | **Not shown** (see §7 — hidden in source as "December 30, 2026") |
| Total floors in building | not shown on page |
| Video | none on page |

## 3. Description — VERBATIM

**The "Property Description" section is EMPTY.** The heading is rendered, but the paragraph body contains only an empty HTML comment (`<!--  -->`) in the delivered HTML. There is no description text whatsoever.

The only narrative text that exists is the SEO **meta description** (verbatim):

> Hyperion Chayapallab developed by Hyperion Design & Development Ltd.  2000 sqft 4 bed Under Construction Apartment/Flats for sale on 7,9 handover on December 30, 2026 at Pallabi view details bdHousing

Note the meta text says "for sale on **7,9** handover on **December 30, 2026**" — which conflicts with the visible summary "4th Floor, 6th Floor". Transcribed as-is; do not "fix" without client confirmation.

## 4. Property Features (all 18 checkboxes, in page order)

1. Security
2. Lift
3. Fire exit
4. WASA connection
5. Self Water supply
6. Hot water
7. Titas Gas
8. Electricity
9. Generator
10. Telephone line
11. Intercom
12. CCTV
13. Wi-Fi connectivity
14. Security Alarm System
15. Electronic security
16. Solar panels
17. Servant Toilet
18. Fire Protection

## 5. Media List (absolute URLs)

**Gallery photos (3):**

| # | Image URL | Thumbnail (74X74) |
|---|---|---|
| 1 (main) | https://www.bdhousing.com/api/list/listings/100X100/247334/2240d37b5367c77862abe54dc2b07cab.jpeg | https://www.bdhousing.com/api/thum/listings/74X74/247334/2240d37b5367c77862abe54dc2b07cab.jpeg |
| 2 | https://www.bdhousing.com/api/list/images/100X100/34063/2a4666a088fe2af6aa36d5646d6b13af.jpg | https://www.bdhousing.com/api/thum/images/74X74/34063/2a4666a088fe2af6aa36d5646d6b13af.jpg |
| 3 | https://www.bdhousing.com/api/list/images/100X100/34064/b6cac0db1535b9ed1ed0b9fb5509afd1.jpg | https://www.bdhousing.com/api/thum/images/74X74/34064/b6cac0db1535b9ed1ed0b9fb5509afd1.jpg |

Anchor "full-size" targets wrapped around photos 2 and 3 point to the same hashes under `/api/list/floors/100X100/34063/...` and `/api/list/floors/100X100/34064/...` respectively.

**Floor plans (2):**

| # | Display (150X150) | Link target (100X100) |
|---|---|---|
| 1 | https://www.bdhousing.com/api/list/floors/150X150/12531/2a4666a088fe2af6aa36d5646d6b13af.jpg | https://www.bdhousing.com/api/list/floors/100X100/12531/2a4666a088fe2af6aa36d5646d6b13af.jpg |
| 2 | https://www.bdhousing.com/api/list/floors/150X150/12532/b6cac0db1535b9ed1ed0b9fb5509afd1.jpg | https://www.bdhousing.com/api/list/floors/100X100/12532/b6cac0db1535b9ed1ed0b9fb5509afd1.jpg |

**og:image:** https://www.bdhousing.com/api/list/listings/100X100/247334/2240d37b5367c77862abe54dc2b07cab.jpeg (declared og dimensions 600x315 despite being a 100X100 asset)

**Not property media (site ads captured in renders — do not reuse):**
- https://www.bdhousing.com/api/list/advertisements/image/54/809fa0db0e0ff4a057a458afaa2217de.jpg (top banner, alt "Ryan")
- https://www.bdhousing.com/api/list/advertisements/image/27/cd6896c7e69785857715d6da42fd277b.jpeg (sidebar, alt "Imagine Properties Ltd")

**Videos:** none. **Map/embed/coordinates:** none anywhere in the page source (no iframe, no lat/lng).

## 6. Contact Info — exactly as shown

- Always-visible masked number next to "Call Owner" button: **`+8801817158xxx`**
- Sidebar "Property Owner Details" masked number: **`01817158 xxx`** (markup splits it as `01817158` + `xxx`) with button **"Click to show phone number"**
- "Get Phone No." button (`data-count="117"`, `data-adv="247334"`)
- Contact person named in the reveal modal: **Md. Ziaul Haque**
- **Full number present in raw HTML without interaction:** `+8801817158095` (in the "Property Owner Details" modal and `tel:` hrefs)
- Contact flow: name/email/phone form + 6-digit SMS/email verification code required before owner details are revealed
- Site-wide (not this listing): bdHousing hotline 01730583483; missed-call (+88)09611 888 222; JSON-LD org contact +8801730583483 / info@bdHousing.com
- Seller profile link: https://www.bdhousing.com/Hyperion-Design-DevelopmentLtd ("view more properties of this seller...")

## 7. Masked / Hidden Data (exact record of what the page hides)

1. **Street address — hidden (commented out in HTML).** Source contains, inside `<!-- ... -->` in the summary list: `Address: plot : 05, road :08, main pallabi. Near juvenile English medium school pallabi.` Not rendered to visitors. This is the ONLY block/road-level location data in existence on the page.
2. **Handover Date — hidden (commented out in HTML).** Source contains `Handover Date : December 30, 2026` inside a commented-out summary row. Also echoed in the meta description.
3. **Floors "7,9" — meta only.** The og/meta description phrase "for sale on 7,9 handover on December 30, 2026" contradicts the visible "4th Floor, 6th Floor".
4. **Full phone number in source.** `+8801817158095` is present in the delivered HTML (modal + tel: links) even though the visible UI shows only masked variants. The visible masks are `+8801817158xxx` and `01817158 xxx`.
5. **"Property By: Hyperion Design & Development Ltd. (Builder)"** exists but sits inside a `display:none` div.
6. **Description left blank** by the advertiser (see §3).
7. **Not shown on page at all:** numeric price, total floors, facing ("N/A"), land area ("N/A"), block/road in visible fields, map/coordinates, posting date (no Last-Modified header either), view counter (only `data-count="117"` on contact buttons).

## 8. Company Profile Presentation (https://www.bdhousing.com/Hyperion-Design-DevelopmentLtd)

- Hyperion Chayapallab appears as the 4th property card: **"Hyperion Chayapallab Sale — Apartment/Flats — Pallabi, Dhaka — Bedrooms 04 — Baths 04 — Size 2000 — Call For Price"**.
- Price shown on profile: **Call For Price** (same as details page; no numeric price).
- Profile thumbnail (larger 564X394 variant of the same hash): https://www.bdhousing.com/api/list/listings/564X394/247334/2240d37b5367c77862abe54dc2b07cab.jpeg
- Profile page title: "Hyperion Design & Development Ltd in bangladesh"; profile og:image: https://www.bdhousing.com/uploads/users/12308d6a07a8cdcd2710256d6b7427fa6207.jpg
- Other Hyperion listings on profile page 1: Hyperion pride (247442, Pallabi, 3/3, 1350 sqft, **TK. 1.46 Cr.**), Hyperion Park View Building -3 (248497, Banasree, 3/3, 1695), Hyperion Mozibur Tower (243796, Banasree, 3/3, 1500), Hyperion Park View Building -2 (241776, Banasree, 3/3, 1560) — all "Call For Price" except Hyperion pride.

## 9. Notes for the Website Build

- No price exists anywhere for this unit — the site must use "Price on request"-style copy, never a made-up figure.
- Only 3 photos + 2 floor plans exist; the plan images are tiny (150X150 display / 100X100 link). New/larger photography will be needed for the HDDL site.
- The floors conflict (4th & 6th visible vs "7,9" in meta) and the hidden address/handover need client confirmation before publishing.
- Structured data on the listing page is site-wide Organization JSON-LD only; no property schema, no posting date, no map data.
