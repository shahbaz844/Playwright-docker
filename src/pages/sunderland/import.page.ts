import { API } from "../base/api/api";
import { ImportRecordResponse } from "../base/api/api.in";
import { ApiData } from "./apiData";
import { endpoints } from "../base/api/apiEndpoints";
import { PersonData } from "../../utils/utils";

export class SunderlandApi extends API {
  async importSingleRecord(personData: PersonData, token: string): Promise<ImportRecordResponse> {
    const data = ApiData.singleRecordData(personData);
    return this.sendRequest(
      `${endpoints.baseURI}${endpoints.importRecordEndpoint}`,
      "POST",
      data,
      token,
      undefined,
    );
  }
}
