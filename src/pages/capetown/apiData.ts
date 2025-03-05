import { PersonData } from "../../utils/utils";

export class CapeTownApiData {
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
          profileCode: "DEG",
          data: {
            enrolmentnumber: `${personData.enrolmentNumber}`,
            academicprogram: "Industry Insights",
            degreenumber: "1254552",
            degreetext: "Bachelor of Business Science in Actuarial Science",
            fullname: "Auto Testing",
          },
          children: [
            {
              recordTypeCode: "cert",
              profileCode: "DEG",
              data: {
                enrolmentnumber: `${personData.enrolmentNumber}`,
                academicprogram: "Industry Insights",
                degreenumber: "1254552",
              },
            },
            {
              recordTypeCode: "indlet",
              profileCode: "DEG",
              data: {
                enrolmentnumber: `${personData.enrolmentNumber}`,
                academicprogram: "Industry Insights",
                degreenumber: "1254552",
              },
            },
          ],
        },
      ],
    };
  }
}
