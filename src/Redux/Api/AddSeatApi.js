
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addSeatApi = createApi({
  reducerPath: "addSeatApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://library-1-xu20.onrender.com",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    addSeats: builder.mutation({
      query: (seats) => ({
        url: "/admin/add-seats",
        method: "POST",
        body: seats, 
      }),
    }),
  }),
});

export const { useAddSeatsMutation } = addSeatApi;
