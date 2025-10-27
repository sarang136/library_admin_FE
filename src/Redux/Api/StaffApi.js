import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const staffApi = createApi({
  reducerPath: "staffApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-1-xu20.onrender.com",
    credentials: "include",
  }),
  tagTypes: ["Staff"],
  endpoints: (builder) => ({
    getStaff: builder.query({
      query: () => "/admin/get-staff",
      providesTags: ["Staff"],
    }),
    addStaff: builder.mutation({
      query: (staffData) => ({
        url: "/admin/add-staff",
        method: "POST",
        body: staffData,
      }),
      invalidatesTags: ["Staff"],
    }),
    deleteStaff: builder.mutation({
      query: (staffId) => ({
        url: `/admin/delete-staff/${staffId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Staff"],
    }),
    editStaff: builder.mutation({
      query: ({ staffId, role }) => ({
        url: `/admin/edit-staff/${staffId}`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["Staff"],
    }),
  }),
});

export const {
  useGetStaffQuery,
  useAddStaffMutation,
  useDeleteStaffMutation,
  useEditStaffMutation,
} = staffApi;
