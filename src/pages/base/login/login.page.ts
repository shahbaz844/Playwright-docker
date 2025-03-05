import { BasePage } from "../basePage";
import { DashboardPage } from "../dashboard/dashboard.page";
import { loginTestData } from "../../../testData/adminPortal/loginTestData/loginTestData";

export class LoginPage extends BasePage {
  private readonly username: string = "[id='usernameOrEmailAddress']";
  private readonly password: string = "[id='password']";
  private readonly loginBtn: string = "[id='m_login_signin_submit']";
  private readonly errorAlert: string = ".alert-danger";

  dashboardPage: DashboardPage = new DashboardPage(this.page);

  get error(): string {
    return this.errorAlert;
  }

  async addUsername(username: string): Promise<void> {
    await this.waitForVisible(this.username);
    await this.page.locator(this.username).fill(username);
  }

  async addPassword(password: string): Promise<void> {
    await this.page.locator(this.password).fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.page.locator(this.loginBtn).click();
  }

  async loginUser(username: string, password: string): Promise<void> {
    const url = `${process.env.BASE_URL}${loginTestData.endpoint}`;
    await this.page.goto(url);
    await this.addUsername(username);
    await this.addPassword(password);
    await this.clickLogin();
    await this.dashboardPage.getDashboardPageHeading();
  }

  async login(username: string, password: string): Promise<void> {
    await this.addUsername(username);
    await this.addPassword(password);
    await this.clickLogin();
  }
}
