import { test as base } from "@playwright/test";
import { LoginPage } from "../pageObjects/adminPortal/login/login.page";
import { DashboardPage } from "../pageObjects/adminPortal/dashboard/dashboard.page";
import { AllUser } from "../pageObjects/adminPortal/usersAndRoles/allUsers.page";
import { CreateUser } from "../pageObjects/adminPortal/usersAndRoles/createUser.page";
import { API } from "../pageObjects/adminPortal/api/api";
import { EditUser } from "../pageObjects/adminPortal/usersAndRoles/editUser.page";

interface BaseFixture {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  allUsers: AllUser;
  createUser: CreateUser;
  api: API;
  editUser: EditUser;
}

export const test = base.extend<BaseFixture>({
  logSteps: async ({}, use) => {
    await use();
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  allUsers: async ({ page }, use) => {
    await use(new AllUser(page));
  },
  createUser: async ({ page }, use) => {
    await use(new CreateUser(page));
  },
  api: async ({}, use) => {
    await use(new API());
  },
  editUser: async ({ page }, use) => {
    await use(new EditUser(page));
  },
});

export { expect } from "@playwright/test";
