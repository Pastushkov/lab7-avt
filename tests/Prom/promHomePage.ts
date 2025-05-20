import { BasePage } from "../basePage";

export class PromHomePage extends BasePage {
  readonly searchBox = this.page.getByRole("searchbox", { name: "Я шукаю" });
  readonly searchButton = this.page.getByRole("button", {
    name: "Знайти",
    exact: true,
  });

  async searchForProduct(query: string) {
    await this.navigate("https://prom.ua/");
    await this.searchBox.fill(query);
    await this.searchButton.click();
  }
}
