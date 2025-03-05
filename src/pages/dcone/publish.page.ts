import { PublishRecord } from "../base/publishing/publish.page";
import { RecordTypesEditPage } from "../base/configuration/recordTypesEdit.page";

export class DCPublishRecord extends PublishRecord {
  recordTypeEdit: RecordTypesEditPage = new RecordTypesEditPage(this.page);

  async selectRecordToPublish() {
    await this.selectQualification("Certificate");
  }

  async publishStudentRecord(enrolmentNumber: string, document = "Certificate") {
    const isPublishConfigEnabled = await this.recordTypeEdit.isPublishRecordOptionEnabled("cert");
    if (isPublishConfigEnabled) {
      await this.publishRecord(enrolmentNumber, document);
    }
  }
}
