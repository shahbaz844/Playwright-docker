import { BasePage } from "../basePage";
import { recordTestData } from "../../../testData/adminPortal/recordTestData/recordTestData";
import { expect } from "@playwright/test";

export class JobIssued extends BasePage {
  private readonly jobsIssuedList: string = "[data-field='createdByName']";
  private readonly recordDetailBtn: string = "[title='Details']";
  private readonly states: string = "h2[class*='title']";
  private readonly tableHeader: string = "[class='kt-datatable__head']";

  async visitJobIssued() {
    await this.page.goto(recordTestData.jobsIssuePage);
  }

  async getJobsIssuedListCount(): Promise<number> {
    await this.waitForVisible(this.jobsIssuedList);
    return this.page.locator(this.jobsIssuedList).count();
  }

  async validateJobIssuedTable() {
    await expect(await this.getJobsIssuedListCount()).toBeGreaterThan(1);
  }

  async openRecordDetails(): Promise<void> {
    await this.page.locator(this.recordDetailBtn).first().click();
    await this.waitForVisible(this.tableHeader);
  }

  async validateStatesOnJobIssuedPage() {
    const states = ["Pending", "Failed", "Completed"];
    const statesOnPage = await this.page.locator(this.states).allInnerTexts();
    expect(statesOnPage).toEqual(states);
  }
}
