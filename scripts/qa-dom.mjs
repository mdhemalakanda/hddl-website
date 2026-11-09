#!/usr/bin/env node
/* HDDL QA — loads every page in headless Chromium, reports:
   console/page errors, failed requests, 4xx responses, broken images,
   section visibility, rendered card counts, horizontal overflow.
   Run: node scripts/qa-dom.mjs   (server must be running on :8135)   */
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("/Users/mdhemalakhand/.npm/_npx/e41f203b7505f1fb/node_modules/playwright");

const BASE = "http://127.0.0.1:8135";
const PAGES = [
  ["index", "index.html"],
  ["about", "about.html"],
  ["projects", "projects.html"],
  ["properties", "properties.html"],
  ["property-247334", "properties/property-247334.html"],
  ["property-243796", "properties/property-243796.html"],
  ["property-241776", "properties/property-241776.html"],
  ["project-chayapallab", "projects/project-chayapallab.html"],
  ["gallery", "gallery.html"],
  ["videos", "videos.html"],
  ["news", "news.html"],
  ["contact", "contact.html"],
  ["404", "404.html"],
];
const VIEWPORTS = [
  { name: "d", width: 1440, height: 900 },
  { name: "m", width: 390, height: 844 },
];

const browser = await chromium.launch();
const report = {};

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  for (const [name, path] of PAGES) {
    const page = await ctx.newPage();
    const entry = { consoleErrors: [], pageErrors: [], failedRequests: [], badResponses: [] };
    page.on("console", (m) => { if (m.type() === "error") entry.consoleErrors.push(m.text().slice(0, 160)); });
    page.on("pageerror", (e) => entry.pageErrors.push(String(e).slice(0, 160)));
    page.on("requestfailed", (r) => entry.failedRequests.push(r.url().replace(BASE, "") + " :: " + (r.failure() && r.failure().errorText || "")));
    page.on("response", (r) => { if (r.status() >= 400 && r.url().startsWith(BASE)) entry.badResponses.push(r.status() + " " + r.url().replace(BASE, "/")); });
    try {
      await page.goto(BASE + "/" + path, { waitUntil: "load", timeout: 30000 });
    } catch (e) {
      entry.pageErrors.push("goto: " + String(e).slice(0, 120));
    }
    await page.waitForTimeout(1500);
    const metrics = await page.evaluate(() => {
      const bad = [];
      document.querySelectorAll("img").forEach((im) => {
        if (im.complete && im.naturalWidth === 0) bad.push(im.getAttribute("src"));
      });
      const vis = (sel) => { const el = document.querySelector(sel); return el ? getComputedStyle(el).display !== "none" : null; };
      return {
        brokenImages: bad,
        propCards: document.querySelectorAll(".prop-card").length,
        projectCards: document.querySelectorAll(".project-card").length,
        videoCards: document.querySelectorAll(".video-card").length,
        galleryItems: document.querySelectorAll(".gallery-item").length,
        filtersVisible: vis(".filters"),
        videosPanelVisible: vis("#videosPanel"),
        mapPanelVisible: vis("#mapPanel"),
        specsPanelVisible: vis("#specsPanel"),
        relatedCount: document.querySelectorAll("#dRelated .prop-card").length,
        waFloat: !!document.querySelector(".wa-float"),
        horizOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        docWidth: document.documentElement.scrollWidth,
      };
    });
    report[`${name}-${vp.name}`] = { ...entry, ...metrics };
    await page.close();
  }
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(report, null, 1));
