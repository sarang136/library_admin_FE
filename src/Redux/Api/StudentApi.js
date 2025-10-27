
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-1-xu20.onrender.com",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: () => "/admin/get-students",
    }),
  }),
});

export const { useGetAllStudentsQuery } = studentApi;
