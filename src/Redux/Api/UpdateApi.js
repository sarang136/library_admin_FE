import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const updatesApi = createApi({
  reducerPath: "updatesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-1-xu20.onrender.com",
    credentials: "include",
  }),
  tagTypes: ["Updates"],
  endpoints: (builder) => ({
    getAllUpdates: builder.query({
      query: () => "/admin/get-all-updates",
      providesTags: ["Updates"],
    }),

    addUpdate: builder.mutation({
      query: (data) => ({
        url: "/admin/add-update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Updates"],
    }),

    editUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/edit-update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Updates"],
    }),

    deleteUpdate: builder.mutation({
      query: (id) => ({
        url: `/admin/delete-update/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Updates"],
    }),
  }),
});

export const {
  useGetAllUpdatesQuery,
  useAddUpdateMutation,
  useEditUpdateMutation,
  useDeleteUpdateMutation,
} = updatesApi;
