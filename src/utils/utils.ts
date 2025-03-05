import { randomInt } from "crypto";
import { faker } from "@faker-js/faker";
import * as csv from "@fast-csv/parse";
import fs from "fs";
import path from "node:path";
import { ImportRecordResponse } from "../pageObjects/adminPortal/api/api.in";

export class Utils {
  static generateRandomString(length = 100000000): string {
    return `${randomInt(length)}`;
  }

  static getFormattedDate(): string {
    const today = new Date();

    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const year = today.getFullYear();

    return `${month}/${day}/${year}`;
  }

  static getTodayDateWithGivenFormat(format = "-"): string {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}${format}${month}${format}${day}`;
  }

  static getTodayDateWithSlash(format = "/"): string {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}${format}${month}${format}${year}`;
  }

  static async getTodayDate(): Promise<string> {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0"); // Get day with leading zero
    const month = today.toLocaleString("default", { month: "long" }); // Get full month name
    const year = today.getFullYear(); // Get full year
    return `${day} ${month} ${year}`; // Format as "27 October 2024"
  }

  static async getPreviousDate(): Promise<string> {
    const today = new Date();
    today.setDate(today.getDate() - 1); // Subtract 1 day to get the previous date
    const day = today.getDate().toString().padStart(2, "0"); // Get day with leading zero
    const month = today.toLocaleString("default", { month: "long" }); // Get full month name
    const year = today.getFullYear(); // Get full year
    return `${day} ${month} ${year}`; // Format as "04 October 2024"
  }

  static getRandomPersonData(): PersonData {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    const email = `${firstName}.${lastName}@gmail.com`;

    const envNames = ["Leeds", "Hertford", "kent", "hertford"];
    const envName = process.env.ENV_NAME;

    let enrolmentNumber;
    if (envNames.includes(envName)) {
      enrolmentNumber = `${randomInt(0, 100000000)}`;
    } else {
      enrolmentNumber = `${randomInt(0, 1000000000)}`;
    }
    return {
      firstName: firstName,
      lastName: lastName,
      fullName: fullName,
      email: email,
      enrolmentNumber: enrolmentNumber,
    };
  }

  static getRandomPerson1Data(): PersonData {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    const email = `${firstName}.${lastName}@gmail.com`;
    return {
      firstName: firstName,
      lastName: lastName,
      fullName: fullName,
      email: email,
      enrolmentNumber: `${randomInt(0, 100000000)}`,
    };
  }

  static getRandomEnrolmentNumber(): Record<string, string> {
    return {
      enrolmentNumber: `LEB${randomInt(0, 100000000)}`,
    };
  }

  static getRandomPersonDataDate(): PersonData {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    const email = `${firstName}.${lastName}@gmail.com`;
    const date = "2030-11-10";
    const envNames = ["Leeds", "Hertford", "kent", "hertford"];
    const envName = process.env.ENV_NAME;

    let enrolmentNumber;
    if (envNames.includes(envName)) {
      enrolmentNumber = `${randomInt(0, 100000000)}`;
    } else {
      enrolmentNumber = `${randomInt(0, 1000000000)}`;
    }
    return {
      firstName: firstName,
      lastName: lastName,
      fullName: fullName,
      email: email,
      enrolmentNumber: `${enrolmentNumber}`,
      date: date,
    };
  }

  static async getReferenceByRecordTypeCode(
    recordTypeCode: string,
    recordInResponse: ImportRecordResponse,
  ): Promise<string> {
    const record = recordInResponse.result.find((item) => item.recordTypeCode === recordTypeCode);
    if (!record) {
      throw new Error(`No record found with recordTypeCode: ${recordTypeCode}`);
    }

    return record.reference;
  }

  static async getAllReferences(data: ReferenceItem[]): Promise<string[]> {
    return data.map((item) => item.reference);
  }

  static async readCsvFile(filePath: string): Promise<Record<string, string>[]> {
    return new Promise((resolve) => {
      const dataArray: Record<string, string>[] = [];
      csv
        .parseFile(filePath, { headers: true })
        .on("data", (data) => {
          dataArray.push(data as Record<string, string>);
        })
        .on("end", () => {
          resolve(dataArray);
        })
        .on("error", (error) => {
          console.error(error);
        });
    });
  }

  static async emptyFolder(folderPath: string): Promise<void> {
    if (fs.existsSync(folderPath)) {
      fs.readdirSync(folderPath).forEach((file) => {
        const filePath = path.join(folderPath, file);
        fs.statSync(filePath).isFile()
          ? fs.unlinkSync(filePath)
          : fs.rmdirSync(filePath, { recursive: true });
      });
    }
  }

  static async isAllUpperCase(str: string): Promise<boolean> {
    return /^[A-Z\s]+$/.test(str);
  }

  static async updateCsv(csvFilePath: string, updates: Record<string, string>): Promise<void> {
    const fileContent = fs.readFileSync(csvFilePath, "utf-8");
    const rows = fileContent.split("\n");
    const headers = rows[0].split(",");

    const columnIndexMap: Record<string, number> = {};
    headers.forEach((header, index) => {
      columnIndexMap[header.trim()] = index;
    });

    const validColumns = Object.keys(updates);
    for (const column of validColumns) {
      if (!(column in columnIndexMap)) {
        console.error(`Column "${column}" not found in CSV.`);
        return;
      }
    }

    const updatedRows = rows.map((row, index) => {
      if (index === 0) return row;
      const columns = row.split(",");
      validColumns.forEach((column) => {
        const columnIndex = columnIndexMap[column];
        columns[columnIndex] = updates[column];
      });
      return columns.join(",");
    });

    const updatedCsvContent = updatedRows.join("\n");
    fs.writeFileSync(csvFilePath, updatedCsvContent, "utf-8");
  }

  static async updateFirstRecordInCsv(
    csvFilePath: string,
    updates: Record<string, string>,
  ): Promise<void> {
    // Read the CSV file
    const fileContent = fs.readFileSync(csvFilePath, "utf-8");
    const rows = fileContent.split("\n");

    // Extract the headers
    const headers = rows[0].split(",");

    // Map column names to their indices
    const columnIndexMap: Record<string, number> = {};
    headers.forEach((header, index) => {
      columnIndexMap[header.trim()] = index;
    });

    // Validate that the provided columns exist
    const validColumns = Object.keys(updates);
    for (const column of validColumns) {
      if (!(column in columnIndexMap)) {
        console.error(`Column "${column}" not found in CSV.`);
        return;
      }
    }

    // Update only the first record row
    if (rows.length > 1) {
      const firstRecord = rows[1].split(",");
      validColumns.forEach((column) => {
        const columnIndex = columnIndexMap[column];
        firstRecord[columnIndex] = updates[column];
      });
      rows[1] = firstRecord.join(",");
    } else {
      console.error("No record rows found in the CSV.");
      return;
    }

    // Write the updated content back to the file
    const updatedCsvContent = rows.join("\n");
    fs.writeFileSync(csvFilePath, updatedCsvContent, "utf-8");
  }

  static async updateData(
    enrolmentNumber: string,
    firstName: string,
    lastName: string,
  ): Promise<Record<string, string>> {
    return {
      stud_enrolmentnumber: enrolmentNumber,
      uniqueid: enrolmentNumber,
      qual_enrolmentnumber: enrolmentNumber,
      cert_enrolmentnumber: enrolmentNumber,
      indlet_enrolmentnumber: enrolmentNumber,
      trans_enrolmentnumber: enrolmentNumber,
      dcl_enrolmentnumber: enrolmentNumber,
      dipsltr_enrolmentnumber: enrolmentNumber,
      let_enrolmentnumber: enrolmentNumber,
      doc_enrolmentnumber: enrolmentNumber,
      veriltr_enrolmentnumber: enrolmentNumber,
      wlcrt_enrolmentnumber: enrolmentNumber,
      blkcrt_enrolmentnumber: enrolmentNumber,
      book_enrolmentnumber: enrolmentNumber,
      stud_firstname: firstName,
      stud_lastname: lastName,
      stud_email: `${firstName}.${lastName}@yopmail.com`,
      book_email: `${firstName}.${lastName}@yopmail.com`,
      fullname: `${firstName} ${lastName}`,
      qualificationfullname: `${firstName} ${lastName}`,
      blkcrt_studentname: `${firstName} ${lastName}`,
      book_fullname: `${firstName} ${lastName}`,
    };
  }
  static async updateSegData(
    enrolmentNumber: string,
    firstName: string,
    lastName: string,
  ): Promise<Record<string, string>> {
    return {
      stud_enrolmentnumber: enrolmentNumber,
      qual_enrolmentnumber: enrolmentNumber,
      cert_enrolmentnumber: enrolmentNumber,
      indlet_enrolmentnumber: enrolmentNumber,
      trans_enrolmentnumber: enrolmentNumber,
      stud_firstname: firstName,
      stud_lastname: lastName,
      stud_email: `${firstName}.${lastName}@yopmail.com`,
      book_email: `${firstName}.${lastName}@yopmail.com`,
      fullname: `${firstName} ${lastName}`,
      qualificationfullname: `${firstName} ${lastName}`,
    };
  }

  static async updateYmcaData(
    enrolmentNumber: string,
    firstName: string,
    lastName: string,
  ): Promise<Record<string, string>> {
    return {
      enrolmentnumber: enrolmentNumber,
      stud_firstname: firstName,
      stud_lastname: lastName,
      stud_email: `${firstName}.${lastName}@yopmail.com`,
      fullname: `${firstName} ${lastName}`,
      qual_qualificationfullname: `${firstName} ${lastName}`,
    };
  }
  static async updateUniOfLawData(
    enrolmentNumber: string,
    firstName: string,
    lastName: string,
  ): Promise<Record<string, string>> {
    return {
      stud_enrolmentnumber: enrolmentNumber,
      qual_enrolmentnumber: enrolmentNumber,
      cert_enrolmentnumber: enrolmentNumber,
      indlet_enrolmentnumber: enrolmentNumber,
      stud_firstname: firstName,
      stud_lastname: lastName,
      stud_email: `${firstName}.${lastName}@yopmail.com`,
      stud_fullname: `${firstName} ${lastName}`,
      qual_qualificationfullname: `${firstName} ${lastName}`,
    };
  }

  static async countRecordTypes1(
    records: any[],
    recordTypes: string[],
  ): Promise<Record<string, number>> {
    const recordCount: Record<string, number> = {};

    recordTypes.forEach((type) => {
      recordCount[type] = 0;
    });

    function traverseChildren(children: any[]) {
      for (const child of children) {
        const { recordTypeCode, children: nestedChildren } = child;

        if (recordTypes.includes(recordTypeCode)) {
          recordCount[recordTypeCode] = (recordCount[recordTypeCode] || 0) + 1;
        }

        if (nestedChildren && nestedChildren.length > 0) {
          traverseChildren(nestedChildren);
        }
      }
    }

    for (const record of records) {
      const { children } = record;

      if (children && children.length > 0) {
        const qualRecords = children.filter((child: any) => child.recordTypeCode === "qual");

        for (const qualRecord of qualRecords) {
          if (qualRecord.children && qualRecord.children.length > 0) {
            traverseChildren(qualRecord.children);
          }
        }
      }
    }
    return recordCount;
  }

  static async generateYmcaData(
    enrolments: Array<{
      enrolmentNumber: string;
      firstName: string;
      lastName: string;
    }>,
  ): Promise<Array<{ rowIndex: number; updates: Record<string, string> }>> {
    return enrolments.map((enrolment, index) => ({
      rowIndex: index + 1, // Assuming the first row is the header
      updates: {
        enrolmentnumber: enrolment.enrolmentNumber,
        stud_firstname: enrolment.firstName,
        stud_lastname: enrolment.lastName,
        stud_email: `${enrolment.firstName}.${enrolment.lastName}@yopmail.com`,
        fullname: `${enrolment.firstName} ${enrolment.lastName}`,
        qual_qualificationfullname: `${enrolment.firstName} ${enrolment.lastName}`,
      },
    }));
  }

  static async updateMultipleRecordsInCsv(
    csvFilePath: string,
    updatesArray: Array<{ rowIndex: number; updates: Record<string, string> }>,
  ): Promise<void> {
    const fileContent = fs.readFileSync(csvFilePath, "utf-8");
    const rows = fileContent.split("\n");

    const headers = rows[0].split(",");

    const columnIndexMap: Record<string, number> = {};
    headers.forEach((header, index) => {
      columnIndexMap[header.trim()] = index;
    });

    for (const { rowIndex, updates } of updatesArray) {
      if (rowIndex < 1 || rowIndex >= rows.length) {
        console.error(`Row index "${rowIndex}" is out of bounds.`);
        continue;
      }

      const record = rows[rowIndex].split(",");

      for (const column in updates) {
        if (!(column in columnIndexMap)) {
          console.error(`Column "${column}" not found in CSV.`);
          continue;
        }

        const columnIndex = columnIndexMap[column];
        record[columnIndex] = updates[column];
      }

      rows[rowIndex] = record.join(",");
    }

    const updatedCsvContent = rows.join("\n");
    fs.writeFileSync(csvFilePath, updatedCsvContent, "utf-8");
  }

  static async getRecordValueByKeyAtRow(
    data: Record<string, any>[],
    key: string,
    index: number,
  ): Promise<any> {
    if (index >= 0 && index < data.length) {
      const obj = data[index];
      return obj[key];
    }
    return undefined;
  }

  static async countQualificationsWithFieldsAndKey(
    records: Record<string, string>[],
    field: string,
    ...keywords: string[]
  ): Promise<number> {
    let count = 0;

    records.forEach((record) => {
      const fieldValue = record[field] || "";

      if (field === "trans_transcript") {
        const transcriptItems = fieldValue.split("|").map((item) => item.trim().toLowerCase());
        keywords.forEach((keyword) => {
          const lowerCaseKeyword = keyword.toLowerCase().trim();
          transcriptItems.forEach((item) => {
            if (item.includes(lowerCaseKeyword)) {
              count++;
            }
          });
        });
      } else {
        keywords.forEach((keyword) => {
          if (fieldValue.toLowerCase().includes(keyword.toLowerCase().trim())) {
            count++;
          }
        });
      }
    });
    return count;
  }

  static async countFieldOccurrences(
    records: Record<string, string>[],
    field: string,
  ): Promise<number> {
    let count = 0;

    records.forEach((record) => {
      const fieldValue = record[field] || "";

      if (field === "trans_transcript") {
        // Handle `trans_transcript` field specially, as it contains delimited data
        const transcriptItems = fieldValue.split("|").map((item) => item.trim());
        count += transcriptItems.length; // Add the number of transcript items
      } else {
        // For other fields, count if the field has a non-empty value
        if (fieldValue.trim()) {
          count++;
        }
      }
    });
    return count;
  }

  static async getQualifications(
    records: Record<string, string>[],
    qualLength: number,
    type: string,
  ): Promise<any[]> {
    const qualifications: any[] = [];

    for (let i = 0; i < qualLength; i++) {
      const value = await Utils.getRecordValueByKeyAtRow(records, type, i);
      qualifications.push(value); // Append the value to the array
    }
    return qualifications;
  }

  static async updategreenwichData(
    enrolmentNumber: string,
    firstName: string,
    lastName: string,
  ): Promise<Record<string, string>> {
    return {
      enrolmentnumber: enrolmentNumber,
      fullname: `${firstName} ${lastName}`,
      qualificationfullname: `${firstName} ${lastName}`,
      stud_firstname: firstName,
      stud_lastname: lastName,
      stud_email: `${firstName}.${lastName}@yopmail.com`,
    };
  }
  static async verifySortedArray(sortedTitles: string[]): Promise<string[]> {
    const sortedArray = sortedTitles.sort((a, b) => {
      const isANumeric = /^\d/.test(a);
      const isBNumeric = /^\d/.test(b);

      if (isANumeric && !isBNumeric) {
        return -1;
      }
      if (!isANumeric && isBNumeric) {
        return 1;
      }
      return a.localeCompare(b);
    });
    return sortedArray;
  }
}

export interface RecordItem {
  recordTypeCode: string;
  reference: string;
}

export interface RecordResponse {
  result: RecordItem[];
}

export interface PersonData {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  enrolmentNumber: string;
  date?: string;
}

export interface ReferenceItem {
  reference: string;
}
