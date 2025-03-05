import { BasePage } from "../basePage";
import { expect, Locator } from "@playwright/test";
import { publishingTestData } from "../../../testData/adminPortal/publishingTestData/publishingTestData";

export class PublishRecord extends BasePage {
  private readonly recordsHeading: string = "h1[class*='subheader__title']";
  private readonly recordTypeElement: string = "[id='recordTypeTree']";
  private readonly documentCheckbox: string = "Document";
  private readonly qualificationCheckbox: string =
    "//a[text()='Qualification' or text()='Course']";
  private readonly transcriptCheckbox: string = "[id*='_anchor']";
  private readonly nextBtn: string = "[data-ktwizard-type='action-next']";
  private readonly refineAlertHeading: string = "[class='alert-text']";
  private readonly enrolmentNumberInput: string = "[id='parentCustomData.enrolmentnumber']";
  private readonly emailInput: string = "[id*='Data.email']";
  private readonly notificationsHeading: string = "h4[class='alert-heading']";
  private readonly confirmationHeading: string = "h4[class='alert-heading']";
  private readonly issueBtn: string = "[data-ktwizard-type='action-submit']";
  private readonly issuePopUpHeading: string = "[class='swal-title']";
  private readonly issuePopOkBtn: string = "[class*='swal-button--confirm']";
  protected readonly actionTitle: string = "td[data-field='Actions']";

  async visitDocumentPublishPage(): Promise<void> {
    await this.page.goto(`${process.env.BASE_URL}/Issue/Publish`);
    await this.waitForVisible(this.recordsHeading);
  }

  async clickQualification(): Promise<void> {
    const recordTypeElement = await this.getRecordTypeElement();
    const xpathLocator = recordTypeElement.locator(this.qualificationCheckbox);
    await xpathLocator.click({ force: true });
  }

  async getRecordTypeElement(): Promise<Locator> {
    await this.waitForVisible(this.recordTypeElement);
    return this.page.locator(this.recordTypeElement);
  }

  async clickDocument(): Promise<void> {
    const recordTypeElement = await this.getRecordTypeElement();
    if (await recordTypeElement.locator("a", { hasText: this.documentCheckbox }).isVisible()) {
      await recordTypeElement
        .locator("a", { hasText: this.documentCheckbox })
        .click({ force: true });
    }
  }

  async selectQualification(qualName: string): Promise<void> {
    await this.page
      .locator(this.transcriptCheckbox)
      .filter({ hasText: qualName })
      .first()
      .click({ force: true });
  }

  async pressNextButton(): Promise<void> {
    await this.waitForVisible(this.nextBtn);
    await this.page.locator(this.nextBtn).click({ force: true });
  }

  async isRefinePageOpen() {
    await expect(await this.getRefinePageAlertHeading()).toContainText(
      publishingTestData.refinePageHeading,
    );
  }

  async getRefinePageAlertHeading(): Promise<Locator> {
    return this.page.locator(this.refineAlertHeading).nth(1);
  }

  async enterEnrolmentNumber(enrolmentNumber: string): Promise<void> {
    await this.waitForVisible(this.enrolmentNumberInput);
    await this.page.locator(this.enrolmentNumberInput).fill(enrolmentNumber);
  }

  async enterEmail(email: string): Promise<void> {
    await this.waitForVisible(this.emailInput);
    await this.page.locator(this.emailInput).fill(email);
  }

  async getNotificationsAlertHeading(): Promise<Locator> {
    return this.page.locator(this.notificationsHeading).nth(1);
  }

  async isNotificationsPageOpen() {
    await expect(await this.getNotificationsAlertHeading()).toContainText(
      publishingTestData.notificationsAlertHeading,
    );
  }

  async getConfirmationPageHeading(): Promise<Locator> {
    return this.page.locator(this.confirmationHeading).nth(2);
  }

  async isConfirmationPageOpen() {
    await expect(await this.getConfirmationPageHeading()).toContainText(
      publishingTestData.confirmationAlertHeading,
    );
  }

  async pressIssueButton(): Promise<void> {
    await this.waitForVisible(this.issueBtn);
    await this.page.locator(this.issueBtn).click({ force: true });
  }

  async getIssuePopUpHeading(): Promise<Locator> {
    await this.waitForVisible(this.issuePopUpHeading);
    return this.page.locator(this.issuePopUpHeading);
  }

  async validateRecordIssued() {
    await expect(await this.getIssuePopUpHeading()).toContainText(
      publishingTestData.issuePopUpHeading,
    );
  }

  async confirmDocumentIssued(): Promise<void> {
    await this.waitForVisible(this.issuePopOkBtn);
    await this.page.locator(this.issuePopOkBtn).click();
  }

  async publishRecord(enrolmentNumber: string, document = "cert") {
    await this.visitDocumentPublishPage();
    await this.clickQualification();
    await this.clickDocument();
    await this.waitForReadiness();
    await this.selectQualification(document);
    await this.pressNextButton();
    await this.isRefinePageOpen();
    await this.enterEnrolmentNumber(enrolmentNumber);
    await this.pressNextButton();
    await this.waitForVisible(this.actionTitle);
    await this.pressNextButton();
    await this.isNotificationsPageOpen();
    await this.pressNextButton();
    await this.isConfirmationPageOpen();
    await this.pressIssueButton();
    await this.validateRecordIssued();
    await this.confirmDocumentIssued();
  }
}
