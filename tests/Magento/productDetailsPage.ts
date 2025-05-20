import { BasePage } from "../basePage";

export class ProductDetailsPage extends BasePage {
  readonly productLink = this.page.locator(".product-item-link").first();
  readonly productTitle = this.page.locator("h1.page-title");
  readonly sizeM = this.page.locator('div[option-label="M"]');
  readonly firstColor = this.page.locator("div.swatch-option.color").first();
  readonly addToCartButton = this.page.locator(
    'button:has-text("Add to Cart")'
  );
  readonly successMessage = this.page.locator(".message-success");
  readonly cartCount = this.page.locator(".counter-number");

  async selectFirstProduct() {
    await this.productLink.click();
    await this.productTitle.waitFor();
  }

  async configureAndAddToCart() {
    await this.sizeM.click();
    await this.firstColor.click();
    await this.addToCartButton.click();
  }

  async isProductAdded(): Promise<boolean> {
    await this.successMessage.waitFor();
    return !(await this.cartCount.textContent())?.includes("0");
  }
}
