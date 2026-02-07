import { chromium, devices } from '@playwright/test';
import { mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotDir = join(__dirname, 'screenshots');
mkdirSync(screenshotDir, { recursive: true });

const BASE_URL = 'http://localhost:4321';

const pages = [
  { path: '/', name: 'homepage' },
  { path: '/about', name: 'about' },
  { path: '/contact', name: 'contact' },
  { path: '/journal', name: 'journal' },
  { path: '/work', name: 'work' },
  { path: '/services', name: 'services' },
  { path: '/packages', name: 'packages' },
  { path: '/services/brand-strategy', name: 'services-brand-strategy' },
  { path: '/services/identity-development', name: 'services-identity-development' },
  { path: '/services/content-strategy', name: 'services-content-strategy' },
  { path: '/services/content-creation', name: 'services-content-creation' },
  { path: '/services/social-media', name: 'services-social-media' },
  { path: '/services/marketing-campaigns', name: 'services-marketing-campaigns' },
  { path: '/services/paid-advertising', name: 'services-paid-advertising' },
  { path: '/packages/spark', name: 'packages-spark' },
  { path: '/packages/ignite', name: 'packages-ignite' },
  { path: '/packages/amplify', name: 'packages-amplify' },
  { path: '/packages/elevate', name: 'packages-elevate' },
];

const device = devices['iPhone 13'];

async function checkPage(page, pageName) {
  const issues = [];

  // Check horizontal overflow
  const overflowEls = await page.evaluate(() => {
    const vw = window.innerWidth;
    const results = [];
    document.querySelectorAll('*').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width > vw + 1) {
        const tag = el.tagName.toLowerCase();
        const id = el.id ? `#${el.id}` : '';
        const cls = el.className && typeof el.className === 'string'
          ? `.${el.className.trim().split(/\s+/).join('.')}`
          : '';
        results.push({
          selector: `${tag}${id}${cls}`,
          width: Math.round(rect.width),
          viewport: vw,
        });
      }
    });
    return results;
  });
  for (const el of overflowEls) {
    issues.push(`OVERFLOW: ${el.selector} is ${el.width}px wide (viewport: ${el.viewport}px)`);
  }

  // Check small tap targets (interactive elements < 48x48)
  const smallTapTargets = await page.evaluate(() => {
    const results = [];
    const interactive = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
    interactive.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return; // hidden
      if (rect.width < 48 || rect.height < 48) {
        const tag = el.tagName.toLowerCase();
        const text = (el.textContent || '').trim().slice(0, 30);
        results.push({
          selector: `${tag}`,
          text,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        });
      }
    });
    return results;
  });
  for (const el of smallTapTargets) {
    issues.push(`TAP TARGET: <${el.selector}> "${el.text}" is ${el.width}x${el.height}px (min 48x48)`);
  }

  // Check small text (< 12px)
  const smallText = await page.evaluate(() => {
    const results = [];
    const textEls = document.querySelectorAll('p, span, a, li, td, th, label, h1, h2, h3, h4, h5, h6, div');
    textEls.forEach(el => {
      const style = window.getComputedStyle(el);
      const fontSize = parseFloat(style.fontSize);
      if (fontSize < 12 && el.textContent.trim().length > 0) {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) return; // hidden
        const tag = el.tagName.toLowerCase();
        const text = el.textContent.trim().slice(0, 30);
        results.push({
          selector: tag,
          text,
          fontSize: Math.round(fontSize * 10) / 10,
        });
      }
    });
    // Deduplicate by text content
    const seen = new Set();
    return results.filter(r => {
      const key = `${r.selector}:${r.text}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  });
  for (const el of smallText) {
    issues.push(`SMALL TEXT: <${el.selector}> "${el.text}" is ${el.fontSize}px (min 12px)`);
  }

  return issues;
}

async function main() {
  console.log('=== Mobile Responsiveness Audit ===\n');
  console.log(`Device: iPhone 13 (${device.viewport.width}x${device.viewport.height}, ${device.deviceScaleFactor}x)`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Screenshots: ${screenshotDir}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ...device,
  });

  const page = await context.newPage();
  const allIssues = {};

  for (const { path, name } of pages) {
    const url = `${BASE_URL}${path}`;
    process.stdout.write(`Auditing ${name} (${path})... `);

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      // Wait a bit for animations/lazy content
      await page.waitForTimeout(1000);

      // Take full-page screenshot
      const screenshotPath = join(screenshotDir, `${name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });

      // Run checks
      const issues = await checkPage(page, name);
      allIssues[name] = issues;

      if (issues.length > 0) {
        console.log(`${issues.length} issue(s) found`);
      } else {
        console.log('OK');
      }
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      allIssues[name] = [`ERROR: ${err.message}`];
    }
  }

  await browser.close();

  // Print summary
  console.log('\n=== SUMMARY ===\n');
  let totalIssues = 0;
  for (const [pageName, issues] of Object.entries(allIssues)) {
    if (issues.length > 0) {
      console.log(`\n--- ${pageName} (${issues.length} issues) ---`);
      for (const issue of issues) {
        console.log(`  ${issue}`);
      }
      totalIssues += issues.length;
    }
  }

  if (totalIssues === 0) {
    console.log('No programmatic issues detected across all pages.');
  } else {
    console.log(`\nTotal: ${totalIssues} issue(s) across ${Object.values(allIssues).filter(i => i.length > 0).length} page(s)`);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
