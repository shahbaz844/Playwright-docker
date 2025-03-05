import { Locator } from "playwright";
import { expect } from "playwright/test";
import { BasePage } from "../basePage";
import { dashboardTestData } from "../../../testData/adminPortal/dashboardTestData/dashboardTestData";
import { Timeout } from "../../../utils/enums";

export class DashboardPage extends BasePage {
  private readonly pageHeading: string = "[class*='subheader__title']";
  private readonly headerMenu: string = "[id*='header_menu_wrapper']";
  private readonly userStats: string = ".user-breakdown-chart [class*='stats']";
  private readonly referenceNumberTextField: string = "[id='reference']";
  private readonly checkButton: string = "[data-form='ValidateForm']";
  private readonly validateRecord: string = "[class*='modal'] [class*='title']:visible";
  private readonly userChart: string = "[id*='chart_users_registered']";
  private readonly thirdPartyOptBanner = "[id='ThirdPartyOptInBanner'] [class='alert-heading']";
  private readonly optInFromDashboard = "[id='ThirdPartyOptInBanner'] [id='OptIn']";

  get userRegisteredChart(): string {
    return this.userChart;
  }

  async getDashboardPageHeading(): Promise<void> {
    await this.waitForVisible(this.pageHeading);
    await expect(this.page.locator(this.pageHeading)).toContainText(dashboardTestData.pageHeading);
  }

  async getHeaderMenu(): Promise<Locator> {
    return this.page.locator(this.headerMenu);
  }

  async getUsersCount(userType: string): Promise<number> {
    const stats: string = await this.page
      .locator(this.userStats, { hasText: userType })
      .innerText();
    return parseInt(stats.replace(/,/g, "").split(" ")[0]);
  }

  async enterReferenceNumberToValidateRecord(ReferenceNumber: string): Promise<any> {
    const referenceNumber: Locator = this.page.locator(this.referenceNumberTextField);
    await referenceNumber.fill(ReferenceNumber);
    await this.page.locator(this.checkButton).click({ force: true });
  }

  async getValidateRecordMessage(): Promise<string> {
    return this.page.locator(this.validateRecord).last().innerText();
  }
  async isThirdPartyOptBannerHeadingExist(): Promise<boolean> {
    await this.waitForVisible(this.thirdPartyOptBanner);
    return this.page.locator(this.thirdPartyOptBanner).isVisible();
  }
  async selectOptIn(): Promise<void> {
    await this.waitForVisible(this.optInFromDashboard);
    await this.page.locator(this.optInFromDashboard).click({ force: true });
    await this.waitForReadiness(Timeout.ONE_SECOND);
  }
}
