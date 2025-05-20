import { BasePage } from "../basePage";

export class CategoryPage extends BasePage {
  readonly header = this.page.locator("header").first();
  readonly womenMenu = this.page.locator('a:has-text("Women")');
  readonly womenTops = this.page
    .locator('ul[role="menu"] a:has-text("Tops")')
    .first();
  readonly jacketsLink = this.page
    .locator('ul[role="menu"] a:has-text("Jackets")')
    .first();
  readonly pageTitle = this.page.locator("h1");

  async navigateToJackets() {
    await this.navigate("https://magento.softwaretestingboard.com/");
    await this.header.waitFor();
    await this.womenMenu.hover();
    await this.womenTops.waitFor({ state: "attached" });
    await this.womenTops.hover();
    await this.jacketsLink.waitFor({ state: "visible" });
    await this.jacketsLink.click();
    await this.pageTitle.waitFor();
  }

  getPageTitleLocator(locator: string) {
    return this.page.locator(locator);
  }
}
