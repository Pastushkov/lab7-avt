  import { test, expect } from "@playwright/test";
  import { PromHomePage } from "./Prom/promHomePage";
  import { PromResultsPage } from "./Prom/promResultsPage";
  import { PromProductPage } from "./Prom/promProductPage";

  test.describe("Пошук на Prom.ua з POM", () => {
    let homePage: PromHomePage;
    let resultsPage: PromResultsPage;
    let productPage: PromProductPage;

    test.beforeEach(async ({ page }) => {
      homePage = new PromHomePage(page);
      resultsPage = new PromResultsPage(page);
      productPage = new PromProductPage(page);
    });

    test("Пошук Lenovo", async () => {
      await homePage.searchForProduct("ноутбук леново");
      await expect(resultsPage.firstProduct).toContainText(/lenovo/i);

      await resultsPage.openFirstProduct();
      await productPage.validateProductInfo();
      await expect(productPage.title).toContainText(/lenovo/i);
      await expect(productPage.price).toBeVisible();
      await expect(productPage.availability.first()).toBeVisible();
    });
  });
