
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const enquiryApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: " https://library-1-xu20.onrender.com", 
    credentials: "include", 
  }),
  endpoints: (builder) => ({
    getAllEnquiries: builder.query({
      query: () => ({
        url: "/admin/get-enquiries",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllEnquiriesQuery } = enquiryApi;
