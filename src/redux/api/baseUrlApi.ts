import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseUrlApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://31.97.216.98:5000/api/v1",
    credentials:"include",
    prepareHeaders: (headers) => {

      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Profile',"SaveJob","appliedJobs","JobList"],
  endpoints: () => ({}),
});