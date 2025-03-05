import { API } from "../base/api/api";
import { ImportRecordResponse } from "../base/api/api.in";
import { endpoints } from "../base/api/apiEndpoints";
import { PersonData } from "../../utils/utils";
import { YmcaApiData } from "./apiData";

export class YmcaApi extends API {
  async importSingleRecord(personData: PersonData, token: string): Promise<ImportRecordResponse> {
    const data = YmcaApiData.ymcaImportSingleRecordData(
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
