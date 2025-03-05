
export class YmcaApiData {
  static ymcaImportSingleRecordData(
    firstName: string,
    lastName: string,
    fullName: string,
    email: string,
    enrolmentNumber: string,
  ): any {
    return {
      recordTypeCode: "stud",
      profileCode: "DC",
      organisationcode: "C000513",
      data: {
        enrolmentnumber: `${enrolmentNumber}`,
        firstname: `${firstName}`,
        lastname: `${lastName}`,
        fullname: `${fullName}`,
        email: `${email}`,
        dateofbirth: "1978-03-26",
      },
      children: [
        {
          recordTypeCode: "qual",
          profileCode: "DC",
          organisationcode: "C000513",
          issuepreference: "0",
          data: {
            enrolmentnumber: `${enrolmentNumber}`,
            coursecode: "DC",
            classification: "Upper First Class",
            qualificationfullname: `${fullName}`,
            awarddate: "2023-10-24",
            coursename: "DC (Hons) Strategic Marketing",
          },
          children: [
            {
              recordTypeCode: "cert",
              profileCode: "DC",
              organisationcode: "C000513",
              issuepreference: "0",
              data: {
                enrolmentnumber: `${enrolmentNumber}`,
                coursecode: "DC",
              },
            },
            {
              recordTypeCode: "indlet",
              profileCode: "DC",
              organisationcode: "C000513",
              issuepreference: "0",
              data: {
                enrolmentnumber: `${enrolmentNumber}`,
                coursecode: "DC",
              },
            },
            {
              recordTypeCode: "trans",
              profileCode: "DC",
              organisationcode: "C000513",
              issuepreference: "0",
              data: {
                enrolmentnumber: `${enrolmentNumber}`,
                coursecode: "DC",
              },
            },
          ],
        },
      ],
    };
  }
}
