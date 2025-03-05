import { BasePage } from "../basePage";
import { recordTestData } from "../../../testData/adminPortal/recordTestData/recordTestData";

export class RecordTypes extends BasePage {
  private readonly recordRows: string = "[id='recordTypesTable'] tbody tr";
  private readonly rowActions: string = "[data-field='Actions']";
  private readonly dataField: string = "[data-field='code']";
  private readonly editAction: string = "a.btn-edit";

  async navigateToRecordTypes() {
    await this.page.goto(recordTestData.recordTypesUrl);
  }

  async editRecordType(recordType: string): Promise<void> {
    const recordTypeRow = await this.page
      .locator(this.recordRows)
      .filter({
        has: this.page.locator(this.dataField).filter({ hasText: recordType })
      });
    await recordTypeRow.locator(this.rowActions).locator(this.editAction).click();
  }
}
