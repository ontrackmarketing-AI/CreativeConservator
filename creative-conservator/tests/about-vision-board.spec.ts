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

  test('cards have green left border', async ({ page }) => {
    const firstCard = page.locator('.vision-card').first();
    const borderLeft = await firstCard.evaluate(el =>
      window.getComputedStyle(el).borderLeftStyle
    );
    expect(borderLeft).toBe('solid');
  });

  test('2-column grid on desktop', async ({ page }) => {
    const grid = page.locator('.vision-board');
    const columns = await grid.evaluate(el =>
      window.getComputedStyle(el).gridTemplateColumns
    );
    // Should have 2 column values (e.g., "400px 400px")
    const colCount = columns.split(' ').length;
    expect(colCount).toBe(2);
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
