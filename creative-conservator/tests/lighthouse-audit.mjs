#!/usr/bin/env node
/**
 * Lighthouse audit via Playwright's Chromium + lighthouse node API.
 * Usage: node tests/lighthouse-audit.mjs [url] [--page=about]
 */
import { chromium } from 'playwright';
import lighthouse from 'lighthouse';

const page = process.argv.find(a => a.startsWith('--page='))?.split('=')[1] || '';
const url = process.argv[2] && !process.argv[2].startsWith('--')
  ? process.argv[2]
  : `http://localhost:4321/${page}`;

console.log(`\nAuditing: ${url}\n`);

// Launch Playwright Chromium with remote debugging
const browser = await chromium.launch({
  args: ['--remote-debugging-port=9222', '--no-sandbox', '--disable-gpu'],
  headless: true,
});

// Run Lighthouse connecting to the debugging port
const result = await lighthouse(url, {
  port: 9222,
  output: 'json',
  onlyCategories: ['performance', 'best-practices', 'seo'],
  formFactor: 'desktop',
  screenEmulation: { disabled: true },
  throttling: {
    cpuSlowdownMultiplier: 1,
    requestLatencyMs: 0,
    downloadThroughputKbps: 0,
    uploadThroughputKbps: 0,
  },
});

await browser.close();

const { categories, audits } = result.lhr;

// Print scores
console.log('=== SCORES ===');
for (const [key, cat] of Object.entries(categories)) {
  const score = Math.round(cat.score * 100);
  console.log(`  ${cat.title}: ${score}/100`);
}

// Print failed audits
console.log('\n=== FAILED AUDITS ===');
let failCount = 0;
for (const [key, cat] of Object.entries(categories)) {
  const refs = cat.auditRefs.filter(r => {
    const audit = audits[r.id];
    return audit && audit.score !== null && audit.score < 1;
  });
  if (refs.length) {
    console.log(`\n--- ${cat.title} ---`);
    for (const ref of refs) {
      const audit = audits[ref.id];
      const weight = ref.weight > 0 ? ` (weight: ${ref.weight})` : '';
      console.log(`  [FAIL] ${audit.title}${weight}`);
      if (audit.description) {
        // Trim markdown links for readability
        const desc = audit.description.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').substring(0, 200);
        console.log(`         ${desc}`);
      }
      if (audit.displayValue) {
        console.log(`         Value: ${audit.displayValue}`);
      }
      // Show details for items if available
      if (audit.details?.items?.length) {
        const items = audit.details.items.slice(0, 5);
        for (const item of items) {
          const parts = [];
          if (item.url) parts.push(item.url.substring(0, 100));
          if (item.node?.snippet) parts.push(item.node.snippet.substring(0, 100));
          if (item.description) parts.push(item.description.substring(0, 100));
          if (item.source?.url) parts.push(item.source.url.substring(0, 100));
          if (item.label) parts.push(item.label);
          if (parts.length) console.log(`           - ${parts.join(' | ')}`);
        }
      }
      failCount++;
    }
  }
}

if (failCount === 0) {
  console.log('  None! All audits passed.');
}

console.log(`\nTotal failed audits: ${failCount}`);
process.exit(failCount > 0 ? 1 : 0);
