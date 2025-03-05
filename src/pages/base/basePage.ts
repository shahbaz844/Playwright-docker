import { Locator, Page } from "@playwright/test";
import { Timeout } from "../../utils/enums";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForReadiness(number = Timeout.MINI_WAIT): Promise<void> {
    return await this.page.waitForTimeout(number);
  }

  async clickElement(selector: string): Promise<void> {
    await this.waitForVisible(selector);
    await (await this.getElement(selector)).click();
  }

  async getElement(selector: string): Promise<Locator> {
    return this.page.locator(selector);
  }

  /**
   * Waits for an element to be visible within the given timeout.
   *
   * @param selector - The selector for the element to wait for.
   * @param timeout - The time in milliseconds to wait for the element to be visible (default is 30000ms or 30 seconds).
   * @returns A promise that resolves when the element is visible or rejects if the timeout is reached.
   */
  async waitForVisible(selector: string, timeout = 30000): Promise<void> {
    try {
      await this.page.waitForSelector(selector, { state: "visible", timeout });
    } catch (error) {
      console.error(
        `Failed to find visible element with selector "${selector}" within ${timeout / 1000} seconds`,
      );
      throw error;
    }
  }
}
