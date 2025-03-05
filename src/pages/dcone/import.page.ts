import { API } from "../base/api/api";
import { PersonData } from "../../utils/utils";
import { ImportRecordResponse } from "../base/api/api.in";
import { endpoints } from "../base/api/apiEndpoints";
import { DcApiData } from "./apiData";

export class DcApi extends API {
  async importSingleRecord(personData: PersonData, token: string): Promise<ImportRecordResponse> {
    const data = DcApiData.getImportRecordData(
      personData.firstName,
      personData.lastName,
      personData.fullName,
      personData.email,
      personData.enrolmentNumber,
    );
    return this.sendRequest(
      `${endpoints.baseURI}${endpoints.importRecordEndpoint}`,
      "POST",
      data,
      token,
      undefined,
    );
  }
}
