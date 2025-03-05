import { PersonData } from "../../utils/utils";

export class ApiData {
  static singleRecordData(personData: PersonData): any {
    return {
      recordTypeCode: "stud",
      data: {
        enrolmentnumber: `${personData.enrolmentNumber}`,
        firstname: `${personData.firstName}`,
        lastname: `${personData.lastName}`,
        fullname: `${personData.fullName}`,
        email: `${personData.email}`,
        dateofbirth: "1991-04-18",
      },
      children: [
        {
          recordTypeCode: "qual",
          profileCode: "PCERTHE",
          data: {
            enrolmentnumber: `${personData.enrolmentNumber}`,
            coursecode: "PCERTIFPT",
            recordimportdate: "2025-01-01",
            fullname: `${personData.fullName}`,
          },
          children: [
            {
              recordTypeCode: "cert",
              profileCode: "PCERTHE",
              data: {
                enrolmentnumber: `${personData.enrolmentNumber}`,
                coursecode: "PCERTIFPT",
              },
            },
            {
              recordTypeCode: "trans",
              profileCode: "PCERTHE",
              data: {
                enrolmentnumber: `${personData.enrolmentNumber}`,
                coursecode: "PCERTIFPT",
              },
            },
          ],
        },
      ],
    };
  }
}
