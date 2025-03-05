import { PublishRecord } from "../base/publishing/publish.page";
import { RecordTypesEditPage } from "../base/configuration/recordTypesEdit.page";

export class YmcaPublishRecord extends PublishRecord {
  recordTypeEdit: RecordTypesEditPage = new RecordTypesEditPage(this.page);

  async publishStudentRecord(enrolmentNumber: string, document = "Transcript") {
    const isPublishConfigEnabled = await this.recordTypeEdit.isPublishRecordOptionEnabled("trans");
    if (isPublishConfigEnabled) {
      await this.publishRecord(enrolmentNumber, document);
    }
  }
}
