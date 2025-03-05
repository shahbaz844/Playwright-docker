export interface AuthResponse {
  result: {
    accessToken: string;
  };
}
export interface Order {
  id: string;
  statusType: string;
}

export interface OrdersResponse {
  data: Order[];
}

export interface ImportIdResponse {
  data: Array<{
    id: string;
  }>;
}

interface RecordData {
  enrolmentnumber: string;
  firstname?: string;
  lastname?: string;
  fullname?: string;
  email?: string;
  dateofbirth?: string;
  address?: string;
  coursecode?: string;
  ceremony?: string;
  classification?: string;
  qualificationfullname?: string;
  awarddate?: string;
  coursename?: string;
  status?: string;
  programmetitle?: string;
  modeofstudy?: string;
  campus?: string;
  modules?: string;
  startdate?: string;
  enddate?: string;
  programme?: string;
  coursestartdate?: string;
  coursenddate?: string;
  expirydate?: string;
}

interface ChildRecord {
  recordTypeCode: string;
  profileCode?: string;
  organisationcode?: string;
  data: RecordData;
  children?: ChildRecord[];
  ceremonycode?: string;
  issuepreference?: string;
}

export interface ImportData {
  recordTypeCode: string;
  profileCode?: string;
  organisationcode?: string;
  data: RecordData;
  children?: ChildRecord[];
}

interface DuplicateCheckData {
  [key: string]: any;
}

interface ResultItem {
  reference: string;
  recordTypeCode: string;
  status: number;
  error: string | null;
  enrolmentNumber: string;
  duplicateCheckData: DuplicateCheckData;
}

export interface ImportRecordResponse {
  result: ResultItem[];
  targetUrl: string | null;
  success: boolean;
  error: string | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}
