// import jsonServerProvider from "ra-data-json-server";


// // export const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
// export const dataProvider = jsonServerProvider(('https://dev-apis.explorebtk.com/api/v1/businesses'));



import jsonServerProvider from "ra-data-json-server";
import { fetchUtils } from "react-admin";

const apiUrl = "https://jsonplaceholder.typicode.com";
const httpClient = fetchUtils.fetchJson;

const jsonServerDataProvider = jsonServerProvider(apiUrl, httpClient);

const dataProvider = {
  ...jsonServerDataProvider,

  // Override the 'getList' method to include authentication headers
  getList: (resource, params) => {
    // Assuming your authProvider.getToken() returns the authentication token
    const token = localStorage.getItem("authToken");
    const headers = new Headers({ Authorization: `Bearer ${token}` });

    return jsonServerDataProvider.getList(resource, {
      ...params,
      headers,
    });
  },
};

export default dataProvider;
