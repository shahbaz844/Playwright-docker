import { API } from "../base/api/api";
import { ImportRecordResponse } from "../base/api/api.in";
import { endpoints } from "../base/api/apiEndpoints";
import { PersonData } from "../../utils/utils";
import { CapeTownApiData } from "./apiData";

export class CapeTownApi extends API {
  async importSingleRecord(personData: PersonData, token: string): Promise<ImportRecordResponse> {
    const data = CapeTownApiData.singleRecordData(personData);
    return this.sendRequest(
      `${endpoints.baseURI}${endpoints.importRecordEndpoint}`,
      "POST",
      data,
      token,
      undefined,
    );
  }
}
