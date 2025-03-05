import * as path from "path";
import { Page } from "@playwright/test";

export async function buildPage(page: Page, pageName: string, environment: string = "dcone") {
  const modulePath = path.resolve(`src/pages/${environment}/${pageName}.page.ts`);

  const module = require(modulePath);

  const className = Object.keys(module)[0];

  const ClassRef = module[className];
  if (typeof ClassRef !== "function") {
    throw new Error(`Class ${className} not found or invalid in module ${modulePath}`);
  }
  return new ClassRef(page);
}
