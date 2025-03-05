import { ImportData } from "../base/api/api.in";

export class DcApiData {
  static getImportRecordData(
    firstName: string,
    lastName: string,
    fullName: string,
    email: string,
    enrolmentNumber: string,
  ): ImportData {
    return {
      recordTypeCode: "stud",
      organisationcode: "CTS",
      profileCode: "BCS",
      data: {
        enrolmentnumber: `${enrolmentNumber}`,
        firstname: `${firstName}`,
        lastname: `${lastName}`,
        fullname: `${fullName}`,
        email: `${email}`,
        dateofbirth: "1943-11-07",
        address: "1 testing lane",
      },
      children: [
        {
          recordTypeCode: "qual",
          profileCode: "BCS",
          organisationcode: "CTS",
          data: {
            enrolmentnumber: `${enrolmentNumber}`,
            ceremony: "2023-01-30",
            coursecode: "BCS",
            classification: "Upper First Class",
            qualificationfullname: `${fullName}`,
            awarddate: "2023-10-24",
            coursename: "BSc (Hons) French First Lady",
          },
          children: [
            {
              recordTypeCode: "cert",
              profileCode: "BCS",
              organisationcode: "CTS",
              data: {
                enrolmentnumber: `${enrolmentNumber}`,
                coursecode: "BCS",
              },
            },
            {
              recordTypeCode: "indlet",
              profileCode: "BCS",
              data: {
                enrolmentnumber: `${enrolmentNumber}`,
                coursecode: "BCS",
              },
            },
            {
              recordTypeCode: "trans",
              profileCode: "BCS",
              data: {
                enrolmentnumber: `${enrolmentNumber}`,
                coursecode: "BCS",
              },
            },
            {
              recordTypeCode: "dipsltr",
              profileCode: "BCS",
              data: {
                enrolmentnumber: `${enrolmentNumber}`,
                coursecode: "BCS",
              },
            },
            {
              recordTypeCode: "dcl",
              profileCode: "BCS",
              data: {
                enrolmentnumber: `${enrolmentNumber}`,
                coursecode: "BCS",
                programme: "BSc (Hons) French First Lady",
              },
            },
            {
              recordTypeCode: "veriltr",
              profileCode: "BCS",
              data: {
                enrolmentnumber: `${enrolmentNumber}`,
                coursecode: "BCS",
                status: "TRNP",
                programmetitle: "BSc (Hons) French First Lady",
                modeofstudy: "Full Time",
                campus: "University of Advanced Secure Technology",
                modules:
                  '[{\n\t\t\t\t\t\t\t\t\t"style":"",   \n\t\t\t\t\t\t\t\t\t"Rows":[\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t"type":"content",\n\t\t\t\t\t\t\t\t\t\t"style":"header",\n\t\t\t\t\t\t\t\t\t\t"data":[\n\t\t\t\t\t\t\t\t\t\t\t"FHEQ LEVEL:4"\n\t\t\t\t\t\t\t\t\t\t\t]\n\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t"type":"content",\n\t\t\t\t\t\t\t\t\t\t"style":"moduletitle",\n\t\t\t\t\t\t\t\t\t\t"data":[\n\t\t\t\t\t\t\t\t\t\t\t"Study Year",\n\t\t\t\t\t\t\t\t\t\t\t"Module Code",\n\t\t\t\t\t\t\t\t\t\t\t"Module Title",\n\t\t\t\t\t\t\t\t\t\t\t"Attempt",\n\t\t\t\t\t\t\t\t\t\t\t"Mark",\n\t\t\t\t\t\t\t\t\t\t\t"Grade",\n\t\t\t\t\t\t\t\t\t\t\t"Credits"\n\t\t\t\t\t\t\t\t\t\t\t]\t\t\t\n\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t"type":"content",\n\t\t\t\t\t\t\t\t\t\t"style":"module",\n\t\t\t\t\t\t\t\t\t\t"data":[\n\t\t\t\t\t\t\t\t\t\t\t"2021/2",\n\t\t\t\t\t\t\t\t\t\t\t"EDM187",\n\t\t\t\t\t\t\t\t\t\t\t"INTRODUCTION TO RESEARCH AND SCHOLARSHIP",\n\t\t\t\t\t\t\t\t\t\t\t"1",\n\t\t\t\t\t\t\t\t\t\t\t"60",\n\t\t\t\t\t\t\t\t\t\t\t"Pass",\n\t\t\t\t\t\t\t\t\t\t\t"20"\n\t\t\t\t\t\t\t\t\t\t\t]\t\t\t\n\t\t\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t\t\t"type":"content",\n\t\t\t\t\t\t\t\t\t\t"style":"module",\n\t\t\t\t\t\t\t\t\t\t"data":[\n\t\t\t\t\t\t\t\t\t\t\t"2021/2",\n\t\t\t\t\t\t\t\t\t\t\t"EDM188",\n\t\t\t\t\t\t\t\t\t\t\t"INTRODUCTION TO STEM",\n\t\t\t\t\t\t\t\t\t\t\t"1",\n\t\t\t\t\t\t\t\t\t\t\t"50",\n\t\t\t\t\t\t\t\t\t\t\t"Pass",\n\t\t\t\t\t\t\t\t\t\t\t"30"\n\t\t\t\t\t\t\t\t\t\t\t]\t\t\t\n\t\t\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t\t\t"type":"content",\n\t\t\t\t\t\t\t\t\t\t"style":"module",\n\t\t\t\t\t\t\t\t\t\t"data":[\n\t\t\t\t\t\t\t\t\t\t\t"2021/2",\n\t\t\t\t\t\t\t\t\t\t\t"EDM189",\n\t\t\t\t\t\t\t\t\t\t\t"EXPERIENTIAL PLACEMENT 1",\n\t\t\t\t\t\t\t\t\t\t\t"1",\n\t\t\t\t\t\t\t\t\t\t\t"",\n\t\t\t\t\t\t\t\t\t\t\t"Pass",\n\t\t\t\t\t\t\t\t\t\t\t"30"\n\t\t\t\t\t\t\t\t\t\t\t]\t\t\t\n\t\t\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t\t\t"type":"content",\n\t\t\t\t\t\t\t\t\t\t"style":"module",\n\t\t\t\t\t\t\t\t\t\t"data":[\n\t\t\t\t\t\t\t\t\t\t\t"2021/2",\n\t\t\t\t\t\t\t\t\t\t\t"EDM190",\n\t\t\t\t\t\t\t\t\t\t\t"CURRICULUM STUDIES 1",\n\t\t\t\t\t\t\t\t\t\t\t"1",\n\t\t\t\t\t\t\t\t\t\t\t"50",\n\t\t\t\t\t\t\t\t\t\t\t"Pass",\n\t\t\t\t\t\t\t\t\t\t\t"40"\n\t\t\t\t\t\t\t\t\t\t\t]\t\t\t\n\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t"type":"content",\n\t\t\t\t\t\t\t\t\t\t"style":"subheader",\n\t\t\t\t\t\t\t\t\t\t"data":[\n\t\t\t\t\t\t\t\t\t\t\t"Total FHEQ Credits", "120"\n\t\t\t\t\t\t\t\t\t\t\t]\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t]\n\t\t\t\t\t\t\t\t\t}]',
                startdate: "2021-09-20",
                enddate: "2023-07-13",
              },
            },
          ],
        },
      ],
    };
  }
}
