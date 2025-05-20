import { test, expect } from "@playwright/test";

test("Магазин Magento - додавання товару до кошика", async ({ page }) => {
  // Відкрити головну сторінку
  await page.goto("https://magento.softwaretestingboard.com/");
  await expect(page.locator("header").first()).toBeVisible();
  // Навести курсор на меню "Women"
  const womenMenu = page.locator('a:has-text("Women")');
  await womenMenu.hover();

  // Дочекатися і навести на пункт "Tops" у випадаючому меню під "Women"
  const womenTops = page.locator('ul[role="menu"] a:has-text("Tops")').first();
  await womenTops.waitFor({ state: "attached" });
  await page.waitForTimeout(500);
  await womenTops.hover();

  // Натиснути на підкатегорію "Jackets"
  const jacketsLink = page
    .locator('ul[role="menu"] a:has-text("Jackets")')
    .first();
  await jacketsLink.waitFor({ state: "visible" });
  await jacketsLink.click();

  // Перевірити, що відкрилася сторінка з товарами
  await expect(page.locator("h1")).toContainText("Jackets");

  // Натиснути на перший товар у списку
  const firstProduct = page.locator(".product-item-link").first();
  await firstProduct.click();

  // Перевірити, що відкрилася сторінка товару
  await expect(page.locator("h1.page-title")).toBeVisible();

  // Вибрати розмір (наприклад, M) та колір (перший доступний)
  await page.locator('div[option-label="M"]').click();
  await page.locator("div.swatch-option.color").first().click();

  // Натиснути "Add to Cart"
  await page.locator('button:has-text("Add to Cart")').click();

  // Перевірити, що з'явилося повідомлення про додавання
  await expect(page.locator(".message-success")).toContainText("You added");

  // Перевірити, що товар додано до кошика (індикатор оновився)
  const cartCount = page.locator(".counter-number");
  await expect(cartCount).not.toHaveText("0");
});
