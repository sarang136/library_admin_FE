// src/redux/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Chargeapi = createApi({
  reducerPath: "chargeapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-1-xu20.onrender.com",
    credentials: "include",
  }),
  tagTypes: ["Charges"],
  endpoints: (builder) => ({
    getCharges: builder.query({
      query: () => "/admin/get-charges",
      providesTags: ["Charges"],
    }),

    addCharges: builder.mutation({
      query: (charge) => ({
        url: "/admin/add-charges",
        method: "POST",
        body: charge,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Charges"],
    }),

    editCharges: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/admin/edit-charge/${id}`,
        method: "PATCH",
        body: updatedData,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Charges"],
    }),

    deleteCharges: builder.mutation({
      query: (id) => ({
        url: `/admin/delete-charge/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Charges"],
    }),
  }),
});

export const {
  useGetChargesQuery,
  useAddChargesMutation,
  useEditChargesMutation,
  useDeleteChargesMutation,
} = Chargeapi;
