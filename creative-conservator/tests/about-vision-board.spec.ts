import { test, expect } from '@playwright/test';

test.describe('About page — Founder Vision Board', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('vision board section exists between definition block and purpose/mission', async ({ page }) => {
    const sections = page.locator('section.section');
    const texts = await sections.allTextContents();

    // Find indices by unique content
    const defIdx = texts.findIndex(t => t.includes('Conserve'));
    const visionIdx = texts.findIndex(t => t.includes('Vision Board'));
    const purposeIdx = texts.findIndex(t => t.includes('Purpose') && t.includes('Mission'));

    expect(visionIdx).toBeGreaterThan(defIdx);
    expect(visionIdx).toBeLessThan(purposeIdx);
  });

  test('renders 6 vision cards', async ({ page }) => {
    const cards = page.locator('.vision-card');
    await expect(cards).toHaveCount(6);
  });

  test('vision cards have correct titles', async ({ page }) => {
    const expectedTitles = [
      'Our Vision',
      'Why We Exist',
      'Our Approach',
      'Who We Partner With',
      'What We Believe',
      'Our Commitment',
    ];

    for (const title of expectedTitles) {
      await expect(page.locator('.vision-card h3', { hasText: title })).toBeVisible();
    }
  });

  test('"What We Believe" card renders bullet list', async ({ page }) => {
    const believeCard = page.locator('.vision-card', { hasText: 'What We Believe' });
    const beliefs = believeCard.locator('.vision-beliefs li');
    await expect(beliefs).toHaveCount(5);
    await expect(beliefs.first()).toContainText('Trust is built before conversion');
  });

  test('"Our Vision" card spans full width (bento wide)', async ({ page }) => {
    const wideCard = page.locator('.vision-card--wide');
    await expect(wideCard).toHaveCount(1);
    await expect(wideCard.locator('h3')).toHaveText('Our Vision');

    const grid = page.locator('.vision-board');
    const gridColumns = await grid.evaluate(el =>
      window.getComputedStyle(el).gridTemplateColumns
    );
    const cardCol = await wideCard.evaluate(el =>
      window.getComputedStyle(el).gridColumn
    );
    // Should span from column 1 to the end
    expect(cardCol).toBe('1 / -1');
  });

  test('"What We Believe" card is tall (bento tall)', async ({ page }) => {
    const tallCard = page.locator('.vision-card--tall');
    await expect(tallCard).toHaveCount(1);
    await expect(tallCard.locator('h3')).toHaveText('What We Believe');
  });

  test('bento grid uses uneven columns on desktop', async ({ page }) => {
    const grid = page.locator('.vision-board');
    const columns = await grid.evaluate(el =>
      window.getComputedStyle(el).gridTemplateColumns
    );
    // 3fr 2fr produces two unequal pixel values (e.g. "600.5px 400.33px")
    const colWidths = columns.split(' ').map(parseFloat);
    expect(colWidths).toHaveLength(2);
    expect(colWidths[0]).toBeGreaterThan(colWidths[1]);
  });

  test('single column on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const grid = page.locator('.vision-board');
    const columns = await grid.evaluate(el =>
      window.getComputedStyle(el).gridTemplateColumns
    );
    const colCount = columns.split(' ').length;
    expect(colCount).toBe(1);
  });

  test('section header has correct eyebrow and title', async ({ page }) => {
    const visionSection = page.locator('section', { hasText: 'Vision Board' }).filter({ has: page.locator('.vision-board') });
    await expect(visionSection.locator('.eyebrow')).toHaveText('The Founder');
    await expect(visionSection.locator('h2')).toHaveText('Vision Board');
  });
});
