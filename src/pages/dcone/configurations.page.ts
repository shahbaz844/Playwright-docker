import { RecordTypesEditPage } from "../base/configuration/recordTypesEdit.page";
import { Timeout } from "../../utils/enums";

export class DCRecordTypesEdit extends RecordTypesEditPage {
  async isPublishRecordOptionEnabled(recordType: string = "cert"): Promise<boolean> {
    await this.navigateToRecordTypes();
    await this.waitForReadiness(Timeout.TWO_SECOND);
    await this.editRecordType(recordType);
    await this.waitForReadiness(Timeout.TWO_SECOND);
    await this.openConfigOptions();
    return this.isPublishToggleEnabled();
  }
}
