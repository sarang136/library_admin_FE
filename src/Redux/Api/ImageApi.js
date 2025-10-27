import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const imageApi = createApi({
  reducerPath: "imageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-1-xu20.onrender.com",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Images"],
  endpoints: (builder) => ({
    getImages: builder.query({
      query: () => "/admin/get-images",
      providesTags: ["Images"],
    }),
    addImage: builder.mutation({
      query: (formData) => ({
        url: "/admin/add-image",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Images"],
    }),
    editImage: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/edit-image/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Images"],
    }),
    deleteImage: builder.mutation({
      query: (imageId) => ({
        url: `/admin/delete-image/${imageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Images"],
    }),
  }),
});

export const {
  useGetImagesQuery,
  useAddImageMutation,
  useEditImageMutation,
  useDeleteImageMutation,
} = imageApi;
