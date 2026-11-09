#!/usr/bin/env node
/* Header nav probe: checks the nav CTA button is never squeezed/clipped at any width. */
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("/Users/mdhemalakhand/.npm/_npx/e41f203b7505f1fb/node_modules/playwright");

const BASE = "http://127.0.0.1:8135";
const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();

for (const w of [1600, 1440, 1366, 1280, 1241, 1150, 1024, 900, 768, 390]) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto(BASE + "/index.html", { waitUntil: "load", timeout: 30000 });
  await page.waitForTimeout(400);
  const r = await page.evaluate(() => {
    const cta = document.querySelector(".nav-cta");
    const ul = document.querySelector(".main-nav > ul");
    const header = document.getElementById("siteHeader");
    const visible = !!cta && getComputedStyle(cta).display !== "none";
    const squeezed = visible ? cta.scrollWidth - cta.clientWidth : null;
    const ulOverflow = ul ? ul.scrollWidth - ul.clientWidth : null;
    const headerH = header ? header.offsetHeight : null;
    const docOverflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
    return { visible, squeezed, ulOverflow, headerH, docOverflow };
  });
  console.log(w + "px:", JSON.stringify(r));
  if (w === 1280 || w === 1366) {
    await page.screenshot({ path: `qa-shots/header-${w}.png`, clip: { x: 0, y: 0, width: w, height: 130 } });
  }
}
await browser.close();
console.log("header probe done");
