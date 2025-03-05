import { RecordTypesEditPage } from "../base/configuration/recordTypesEdit.page";
import { Timeout } from "../../utils/enums";

export class SunderlandRecordTypesEdit extends RecordTypesEditPage {
  async isPublishRecordOptionEnabled(recordType: string = "trans"): Promise<boolean> {
    await this.navigateToRecordTypes();
    await this.waitForReadiness(Timeout.TWO_SECOND);
    await this.editRecordType(recordType);
    await this.waitForReadiness(Timeout.TWO_SECOND);
    await this.openConfigOptions();
    return this.isPublishToggleEnabled();
  }
}
