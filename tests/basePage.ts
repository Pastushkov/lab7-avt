import { Page } from "@playwright/test";

export class BasePage {
  constructor(public readonly page: Page) {}

  async navigate(url: string) {
    await this.page.goto(url);
  }
}
