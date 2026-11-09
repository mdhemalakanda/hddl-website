#!/usr/bin/env node
/* Debug: why doesn't the nav-cta hide at <=1340px? */
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("/Users/mdhemalakhand/.npm/_npx/e41f203b7505f1fb/node_modules/playwright");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto("http://127.0.0.1:8135/index.html", { waitUntil: "load" });
await page.waitForTimeout(500);
const r = await page.evaluate(() => {
  const cta = document.querySelector(".nav-cta");
  const out = {
    matches1340: matchMedia("(max-width: 1340px)").matches,
    innerWidth: window.innerWidth,
    display: getComputedStyle(cta).display,
    sheetCount: document.styleSheets.length,
    found: [],
  };
  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch (e) { continue; }
    for (const rule of rules) {
      if (rule.media && /1340/.test(rule.media.mediaText)) {
        out.found.push("MEDIA " + rule.media.mediaText + " matches=" + rule.media.matches);
        for (const inner of rule.cssRules) out.found.push("   -> " + inner.cssText.slice(0, 80));
      }
    }
  }
  return out;
});
console.log(JSON.stringify(r, null, 1));
await browser.close();
