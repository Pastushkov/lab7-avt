import { BasePage } from '../basePage';

export class PromResultsPage extends BasePage {
  readonly firstProduct = this.page.locator('[data-qaid="product_name"]').first();

  async openFirstProduct() {
    await this.firstProduct.waitFor();
    await this.firstProduct.click({ force: true });
  }
}
