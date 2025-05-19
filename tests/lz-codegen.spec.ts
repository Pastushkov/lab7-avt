import { test, expect } from "@playwright/test";

test("Пошук товару на Prom.ua", async ({ page }) => {
  // 1.1 Відкриваємо сайт
  await page.goto("https://prom.ua/");
  await expect(page).toHaveURL(/prom\.ua/);

  // 1.2 Вводимо запит у пошукове поле
  const searchBox = page.getByRole("searchbox", { name: "Я шукаю" });
  await searchBox.click();
  await searchBox.fill("ноутбук леново");

  // Клікаємо кнопку "Знайти"
  const searchButton = page.getByRole("button", {
    name: "Знайти",
    exact: true,
  });
  await searchButton.click();

  // Очікуємо на результати
  const firstProduct = page.locator('[data-qaid="product_name"] >> nth=0');
  await expect(firstProduct).toContainText(/lenovo/i);

  // 1.3 Переходимо на сторінку товару
  await firstProduct.click({ force: true });

  // Перевіряємо, що є заголовок з назвою товару
  const productTitle = page.locator("h1");
  await expect(productTitle).toContainText(/lenovo/i);

  // Перевіряємо, що є ціна
  const price = page.locator('[data-qaid="product_price"]').first();
  await expect(price).toBeVisible();

  // Перевіряємо, що товар "в наявності" або "готово до відправки"
  const availability = page.locator(
    'div:has-text("в наявності"), div:has-text("готово до відправки")'
  );
  await expect(availability.first()).toBeVisible();
});
