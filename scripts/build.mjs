#!/usr/bin/env node
/* ============================================================
   HYPERION DESIGN & DEVELOPMENT LTD. — static site builder
   Zero dependencies. Composes site/ from templates/ + src/pages/
   + data/*.json (source of truth). Also generates:
     - properties/property-<id>.html  (one static page per property)
     - projects/project-<slug>.html   (one static page per project)
     - site/assets/data/*.js          (JSON -> window.* bridges)
     - sitemap.xml, robots.txt
   Run:  node scripts/build.mjs
   Serve: bash scripts/serve.sh   (http://localhost:8135)
   ============================================================ */
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const T = (p) => readFileSync(join(ROOT, "templates", p), "utf8");
const P = (p) => readFileSync(join(ROOT, "src", "pages", p), "utf8");
const readJSON = (p) => JSON.parse(readFileSync(join(ROOT, p), "utf8"));
const exists = (p) => { try { readFileSync(join(ROOT, p)); return true; } catch { return false; } };

const company    = exists("data/company.json")    ? readJSON("data/company.json")    : {};
const properties = exists("data/properties.json") ? readJSON("data/properties.json") : [];
const projects   = exists("data/projects.json")   ? readJSON("data/projects.json")   : [];
const newsItems  = exists("data/news.json")       ? readJSON("data/news.json")       : [];

/* Canonical placeholder — replace with the real domain before go-live. */
const SITE = "https://hddl-website.example.com";
const BRAND = "Hyperion Design & Development Ltd.";
const DEFAULT_OG = SITE + "/assets/img/og-default.svg";

function fill(tpl, map) {
  return tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => (map[k] !== undefined && map[k] !== null ? map[k] : ""));
}

/* ---------- company-derived shared vars ---------- */
const phone = company.phone || {};
const phoneDisplay = phone.display || "See contact page";
const phoneTel = phone.intl ? "tel:" + phone.intl : "contact.html";
const mailto = company.email ? "mailto:" + company.email : "contact.html";
const emailDisplay = company.email || "See contact page";
const fbUrl = company.facebook || "https://www.facebook.com/hddlbd/";
const addressDisplay = company.address?.line || "Dhaka, Bangladesh";

const waDigits = (company.phone?.whatsapp || "").replace(/\D/g, "");
const companyVars = {
  PHONE_DISPLAY: phoneDisplay,
  PHONE_TEL: phoneTel,
  MAILTO: mailto,
  EMAIL_DISPLAY: emailDisplay,
  FB_URL: fbUrl,
  ADDRESS_DISPLAY: addressDisplay,
  WHATSAPP_URL: waDigits ? "https://wa.me/" + waDigits : fbUrl,
  WHATSAPP_DISPLAY: waDigits ? "+" + waDigits : "Facebook",
};

/* ---------- project links for footer ---------- */
const projectLinks = projects.length
  ? projects.slice(0, 4).map((pr) => `<li><a href="../projects/project-${pr.slug}.html">${esc(pr.name)}</a></li>`).join("\n        ")
  : `<li><a href="projects.html">View all projects</a></li>`;

function esc(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/* ---------- nav active state ---------- */
const NAV_KEYS = ["HOME", "ABOUT", "PROJECTS", "PROPERTIES", "GALLERY", "VIDEOS", "NEWS", "CONTACT"];
function navActive(nav) {
  const out = {};
  NAV_KEYS.forEach((k) => { out["ACTIVE_" + k] = k.toLowerCase() === nav ? ' aria-current="page"' : ""; });
  return out;
}

/* ---------- root page registry ---------- */
const PAGES = {
  "index.html":     { page: "index.html",     nav: "home",      title: `${BRAND} — Premium Apartments & Developments in Dhaka`, desc: "Apartments and developments by Hyperion Design & Development Ltd. Explore available flats, projects, galleries and verified property details." },
  "about.html":     { page: "about.html",     nav: "about",     title: `About Us — ${BRAND}`, desc: "Learn about Hyperion Design & Development Ltd. — a Dhaka-based real estate developer." },
  "projects.html":  { page: "projects.html",  nav: "projects",  title: `Our Projects — ${BRAND}`, desc: "Building projects by Hyperion Design & Development Ltd. — status, locations and available apartments." },
  "properties.html":{ page: "properties.html",nav: "properties",title: `Available Apartments — ${BRAND}`, desc: "Browse apartments for sale by Hyperion Design & Development Ltd. Filter by location, size, bedrooms, price and construction status." },
  "gallery.html":   { page: "gallery.html",   nav: "gallery",   title: `Gallery — ${BRAND}`, desc: "Photo gallery of Hyperion Design & Development Ltd. buildings and apartments." },
  "videos.html":    { page: "videos.html",    nav: "videos",    title: `Videos — ${BRAND}`, desc: "Project videos and walk-throughs from Hyperion Design & Development Ltd." },
  "news.html":      { page: "news.html",      nav: "news",      title: `News & Updates — ${BRAND}`, desc: "News, announcements and construction updates from Hyperion Design & Development Ltd." },
  "contact.html":   { page: "contact.html",   nav: "contact",   title: `Contact Us — ${BRAND}`, desc: "Contact Hyperion Design & Development Ltd. — phone, WhatsApp, email and office address." },
  "404.html":       { page: "404.html",       nav: null,        title: `Page Not Found — ${BRAND}`, desc: "The page you are looking for was not found." },
};

/* ---------- JSON-LD ---------- */
function orgJsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": BRAND,
    "url": SITE + "/",
    "logo": SITE + "/assets/img/logo.svg",
    "sameAs": [fbUrl],
  };
  if (phone.intl) org.telephone = phone.intl;
  if (company.email) org.email = company.email;
  if (company.address?.line) org.address = { "@type": "PostalAddress", "streetAddress": company.address.line, "addressCountry": "BD" };
  return `<script type="application/ld+json">${JSON.stringify(org)}</script>`;
}

function propertyJsonLd(p) {
  const d = {
    "@context": "https://schema.org",
    "@type": "Apartment",
    "name": p.title,
    "url": `${SITE}/properties/property-${p.id}.html`,
    "numberOfRooms": p.bedrooms ?? undefined,
    "numberOfBathroomsTotal": p.bathrooms ?? undefined,
    "floorSize": { "@type": "QuantitativeValue", "unitCode": "FTK", "value": p.size_sqft ?? undefined },
  };
  if (p.image) d.image = p.image;
  const addr = {};
  if (p.address) addr.streetAddress = p.address;
  if (p.area) addr.addressLocality = p.area;
  addr.addressRegion = "Dhaka";
  addr.addressCountry = "BD";
  d.address = addr;
  if (p.price_amount) {
    d.offers = { "@type": "Offer", "price": p.price_amount, "priceCurrency": "BDT", "availability": "https://schema.org/InStock" };
  }
  return `<script type="application/ld+json">${JSON.stringify(d)}</script>`;
}

/* ---------- page assembly ---------- */
function buildHead(outName, cfg, extra) {
  const vars = {
    TITLE: cfg.title, DESC: cfg.desc,
    OG_TITLE: cfg.title, OG_DESC: cfg.desc,
    OG_TYPE: extra?.ogType || "website",
    OG_IMAGE: extra?.ogImage || DEFAULT_OG,
    CANONICAL: `${SITE}/${outName}`,
    ROOT: extra?.root || "",
    PAGE_ID: extra?.pageId || outName.replace(".html", ""),
    JSONLD: extra?.jsonld || "",
    EXTRA_HEAD: extra?.extraHead || "",
  };
  return fill(T("head.html"), vars);
}

function buildScripts(root, propertyData) {
  return fill(T("scripts.html"), {
    ROOT: root,
    PROPERTY_DATA: propertyData ? `<script>window.HDDL_PROPERTY=${JSON.stringify(propertyData)}</script>` : "",
  });
}

mkdirSync(join(ROOT, "site"), { recursive: true });
mkdirSync(join(ROOT, "site", "properties"), { recursive: true });
mkdirSync(join(ROOT, "site", "projects"), { recursive: true });

let built = 0;

/* root pages */
for (const [out, cfg] of Object.entries(PAGES)) {
  const html =
    buildHead(out, cfg, { pageId: out.replace(".html", "") }) + "\n" +
    fill(T("header.html"), { ...companyVars, ...navActive(cfg.nav), ROOT: "", PAGE_ID: out.replace(".html", "") }) + "\n" +
    fill(P(cfg.page), { ROOT: "", ...companyVars }) + "\n" +
    fill(T("footer.html"), { ...companyVars, ROOT: "", PROJECT_LINKS: projectLinks.replace(/href="\.\.\//g, 'href="') }) + "\n" +
    buildScripts("", null);
  writeFileSync(join(ROOT, "site", out), html);
  console.log("built", out);
  built++;
}

/* property detail pages */
let propPages = 0;
for (const p of properties) {
  if (p.publish === false || !p.id) continue;
  const out = `properties/property-${p.id}.html`;
  const cfg = {
    title: `${p.title} — ${BRAND}`,
    desc: p.meta_description || `${p.title}. ${p.area ? p.area + ", Dhaka." : ""} ${p.size_sqft ? p.size_sqft + " sq ft." : ""} Details, photos and inquiry contact.`,
  };
  const html =
    buildHead(out, cfg, {
      root: "../", pageId: "property-details",
      ogType: "article",
      ogImage: p.image || DEFAULT_OG,
      jsonld: propertyJsonLd(p),
    }) + "\n" +
    fill(T("header.html"), { ...companyVars, ...navActive("properties"), ROOT: "../", PAGE_ID: "property-details" }) + "\n" +
    fill(P("property-details.html"), { ROOT: "../", ...companyVars }) + "\n" +
    fill(T("footer.html"), { ...companyVars, ROOT: "../", PROJECT_LINKS: projectLinks }) + "\n" +
    buildScripts("../", p);
  writeFileSync(join(ROOT, "site", out), html);
  propPages++;
}

/* project detail pages */
let projPages = 0;
for (const pr of projects) {
  if (!pr.slug) continue;
  const out = `projects/project-${pr.slug}.html`;
  const cfg = {
    title: `${pr.name} — ${BRAND}`,
    desc: pr.meta_description || `${pr.name} by Hyperion Design & Development Ltd. ${pr.area ? pr.area + ", Dhaka." : ""}`,
  };
  const html =
    buildHead(out, cfg, {
      root: "../", pageId: "project-details",
      ogImage: pr.cover_image || DEFAULT_OG,
    }) + "\n" +
    fill(T("header.html"), { ...companyVars, ...navActive("projects"), ROOT: "../", PAGE_ID: "project-details" }) + "\n" +
    fill(P("project-details.html"), { ROOT: "../", ...companyVars }) + "\n" +
    fill(T("footer.html"), { ...companyVars, ROOT: "../", PROJECT_LINKS: projectLinks }) + "\n" +
    buildScripts("../", null) + "\n" +
    `<script>window.HDDL_PROJECT=${JSON.stringify(pr)}</script>\n<script>window.HDDL_PROJECT_PROPERTIES=${JSON.stringify(properties.filter((p) => p.project_slug === pr.slug))}</script>`;
  writeFileSync(join(ROOT, "site", out), html);
  projPages++;
}

/* ---------- data bridges (JSON -> window globals, work on file:// too) ---------- */
const dataDir = join(ROOT, "site", "assets", "data");
mkdirSync(dataDir, { recursive: true });
writeFileSync(join(dataDir, "company.js"),    "window.HDDL_COMPANY=" + JSON.stringify(company) + ";\n");
writeFileSync(join(dataDir, "properties.js"), "window.HDDL_PROPERTIES=" + JSON.stringify(properties) + ";\n");
writeFileSync(join(dataDir, "projects.js"),   "window.HDDL_PROJECTS=" + JSON.stringify(projects) + ";\n");

/* ---------- assets ---------- */
cpSync(join(ROOT, "assets"), join(ROOT, "site", "assets"), { recursive: true });

/* ---------- sitemap + robots ---------- */
const today = new Date().toISOString().slice(0, 10);
const urls = Object.keys(PAGES).map((f) => `  <url><loc>${SITE}/${f === "index.html" ? "" : f}</loc><lastmod>${today}</lastmod></url>`);
for (const p of properties) if (p.id && p.publish !== false) urls.push(`  <url><loc>${SITE}/properties/property-${p.id}.html</loc><lastmod>${today}</lastmod></url>`);
for (const pr of projects) if (pr.slug) urls.push(`  <url><loc>${SITE}/projects/project-${pr.slug}.html</loc><lastmod>${today}</lastmod></url>`);
writeFileSync(join(ROOT, "site", "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
writeFileSync(join(ROOT, "site", "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`done: ${built} pages, ${propPages} property pages, ${projPages} project pages`);
