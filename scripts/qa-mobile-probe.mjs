#!/usr/bin/env node
/* Mobile layout probe: exact-width viewports, measures clipping + takes true full-page shots. */
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("/Users/mdhemalakhand/.npm/_npx/e41f203b7505f1fb/node_modules/playwright");

const BASE = "http://127.0.0.1:8135";
const browser = await chromium.launch();

for (const [w, h, tag] of [[390, 844, "390"], [768, 1024, "768"]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  for (const [name, path] of [["index", "index.html"], ["properties", "properties.html"], ["property-243796", "properties/property-243796.html"]]) {
    const page = await ctx.newPage();
    await page.goto(BASE + "/" + path, { waitUntil: "load", timeout: 30000 });
    await page.waitForTimeout(1200);
    const m = await page.evaluate(() => {
      const r = (el) => el ? Math.round(el.getBoundingClientRect().width) : null;
      const over = (el) => el ? el.scrollWidth - el.clientWidth : null;
      const clipped = [];
      document.querySelectorAll(".hero h1, .hero p, .prop-meta, .section-head p, .detail-sub, .video-card-body, .tl-item p").forEach((el) => {
        if (el.scrollWidth > el.clientWidth + 1) clipped.push(el.className.toString().slice(0, 30) + " +" + (el.scrollWidth - el.clientWidth) + "px");
      });
      return {
        innerWidth: window.innerWidth,
        clientWidth: document.documentElement.clientWidth,
        docWidth: document.documentElement.scrollWidth,
        heroContainer: r(document.querySelector(".hero .container")),
        heroH1: r(document.querySelector(".hero h1")),
        h1FontSize: getComputedStyle(document.querySelector(".hero h1") || document.body).fontSize,
        h1ScrollOver: over(document.querySelector(".hero h1")),
        clipped,
      };
    });
    console.log(`[${tag}] ${name}:`, JSON.stringify(m));
    await page.screenshot({ path: `qa-shots/probe-${name}-${tag}.png`, fullPage: true });
    await page.close();
  }
  await ctx.close();
}
await browser.close();
console.log("probe done");
