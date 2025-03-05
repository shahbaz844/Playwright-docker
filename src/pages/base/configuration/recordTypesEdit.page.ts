import { RecordTypes } from "./recordTypes";
import { Timeout } from "../../../utils/enums";

export class RecordTypesEditPage extends RecordTypes {
  private readonly optionsTab: string = "a[href='#tab_options']";
  private readonly publishToggle: string = "[id='CanPublish']";

  async openConfigOptions(): Promise<void> {
    await this.page.locator(this.optionsTab).click();
  }

  async isPublishToggleEnabled(): Promise<boolean> {
    return await this.page.locator(this.publishToggle).isEnabled();
  }

  async isPublishRecordOptionEnabled(recordType: string = "cert"): Promise<boolean> {
    await this.navigateToRecordTypes();
    await this.waitForReadiness(Timeout.TWO_SECOND);
    await this.editRecordType(recordType);
    await this.waitForReadiness(Timeout.TWO_SECOND);
    await this.openConfigOptions();
    return this.isPublishToggleEnabled();
  }
}
