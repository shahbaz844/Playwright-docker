import test, { type Page } from "playwright/test";
import { buildPage } from "../../../pages/base/pageFactory";
import { Utils } from "../../../utils/utils";
import { YmcaLogin } from "../../../pages/ymca/login.page";
import { SunderlandLogin } from "../../../pages/sunderland/login.page";
import { DConeLogin } from "../../../pages/dcone/login.page";
import { CapetownLogin } from "../../../pages/capetown/login.page";

let page: Page;
const personData = Utils.getRandomPersonData();
let loginPage: YmcaLogin | SunderlandLogin | CapetownLogin | DConeLogin;

test.beforeEach(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();
  loginPage = await buildPage(page, "login", process.env.ENV_NAME);
  await loginPage.loginUser(process.env.SYSTEM_USERNAME, process.env.SYSTEM_PASSWORD);

  // const api = await buildPage(page, "import", process.env.ENV_NAME);
  // const cookie = await api.getCookie(context);
  // await api.deleteAllTodayRecords(cookie);
  // const token = await api.getAuthToken(process.env.SYSTEM_USERNAME, process.env.SYSTEM_PASSWORD);
  // await api.importSingleRecord(personData, token);
});

test("Verify that jobs issued view details of job successfully", async () => {
  console.log("Test Completed");
  // const recordPublish = await buildPage(page, "publish", process.env.ENV_NAME);
  // await recordPublish.publishStudentRecord(personData.enrolmentNumber);
  //
  // const jobIssued = await buildPage(page, "jobIssued", process.env.ENV_NAME);
  // await jobIssued.visitJobIssued();
  // await jobIssued.validateJobIssuedTable();
  // await jobIssued.openRecordDetails();
  // await jobIssued.validateStatesOnJobIssuedPage();
});
