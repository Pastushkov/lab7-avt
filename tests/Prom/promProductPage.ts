import { BasePage } from '../basePage';

export class PromProductPage extends BasePage {
  readonly title = this.page.locator('h1');
  readonly price = this.page.locator('[data-qaid="product_price"]').first();
  readonly availability = this.page.locator(
    'div:has-text("в наявності"), div:has-text("готово до відправки")'
  );

  async validateProductInfo() {
    await this.title.waitFor();
    await this.price.waitFor();
    await this.availability.first().waitFor();
  }
}
