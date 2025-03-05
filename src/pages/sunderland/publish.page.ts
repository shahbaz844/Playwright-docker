import { PublishRecord } from "../base/publishing/publish.page";
import { RecordTypesEditPage } from "../base/configuration/recordTypesEdit.page";

export class SunderlandPublishRecord extends PublishRecord {
  private readonly masterOfQualCheckbox: string = "[id*='cfe-08dd30c68048_anchor']";

  recordTypeEdit: RecordTypesEditPage = new RecordTypesEditPage(this.page);

  async selectMasterOfQualCheckbox(): Promise<void> {
    await this.page.locator(this.masterOfQualCheckbox).click({ force: true });
  }

  async publishStudentRecord(enrolmentNumber: string, document = "Transcript") {
    const isPublishConfigEnabled = await this.recordTypeEdit.isPublishRecordOptionEnabled("trans");
    if (isPublishConfigEnabled) {
      await this.publishRecord(enrolmentNumber, document);
    }
  }
}
