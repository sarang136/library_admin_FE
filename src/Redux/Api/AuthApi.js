import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-1-xu20.onrender.com",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: ({ contact }) => ({
        url: "/admin/send-otp",
        method: "POST",
        body: { contact },
        headers: { "Content-Type": "application/json" },
      }),
    }),
    loginAdmin: builder.mutation({
      query: ({ contact, otp }) => ({
        url: "/admin/login",
        method: "POST",
        body: { contact, otp },
        headers: { "Content-Type": "application/json" },
      }),
    }),
    logoutAdmin: builder.mutation({
      query: () => ({
        url: "/admin/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginAdminMutation, useSendOtpMutation, useLogoutAdminMutation } = authApi;
