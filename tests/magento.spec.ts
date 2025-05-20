import { test, expect } from "@playwright/test";
import { CategoryPage } from "./Magento/categoryPage";
import { ProductDetailsPage } from "./Magento/productDetailsPage";

test.describe("Magento з POM", () => {
  let categoryPage: CategoryPage;
  let productPage: ProductDetailsPage;

  test.beforeEach(async ({ page }) => {
    categoryPage = new CategoryPage(page);
    productPage = new ProductDetailsPage(page);
  });

  test("Додавання товару до кошика", async () => {
    await categoryPage.navigateToJackets();
    await expect(
      (categoryPage.page as any).getPageTitleLocator("h1")
    ).toContainText("Jackets");

    await productPage.selectFirstProduct();
    await expect(productPage.productTitle).toBeVisible();

    await productPage.configureAndAddToCart();
    await expect(productPage.successMessage).toContainText("You added");
    expect(await productPage.isProductAdded()).toBeTruthy();
  });
});
