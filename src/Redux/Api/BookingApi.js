import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-1-xu20.onrender.com",
    credentials: "include", 
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => "/admin/get-all-bookings",
    }),
  }),
});

export const { useGetAllBookingsQuery } = bookingApi;
