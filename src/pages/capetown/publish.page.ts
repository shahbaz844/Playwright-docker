import { PublishRecord } from "../base/publishing/publish.page";
import { RecordTypesEditPage } from "../base/configuration/recordTypesEdit.page";

export class CapetownPublishRecord extends PublishRecord {
  recordTypeEdit: RecordTypesEditPage = new RecordTypesEditPage(this.page);

  async publishStudentRecord(enrolmentNumber: string, document = "Short Courses") {
    const isPublishConfigEnabled = await this.recordTypeEdit.isPublishRecordOptionEnabled("cert");
    if (isPublishConfigEnabled) {
      await this.publishRecord(enrolmentNumber, document);
    }
  }
}
