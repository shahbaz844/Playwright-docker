export const endpoints = {
  baseURI: process.env.BASE_URI,
  authEndpoint: "/api/TokenAuth/Authenticate",
  importRecordEndpoint: "/api/services/import/record/import",
  deleteRecordEndpoint: `${process.env.BASE_URL}/api/services/app/Record/DeleteSelected?ids[0]=`,
  recordTableEndpoint: `${process.env.BASE_URL}/api/services/app/record/DataTable`,
  importIds: `${process.env.BASE_URL}/api/services/app/import/DataTable`,
};
