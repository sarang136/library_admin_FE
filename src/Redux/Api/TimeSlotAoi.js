import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const timeSlotApi = createApi({
  reducerPath: "timeSlotApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-1-xu20.onrender.com",
    credentials: "include",
  }),
  tagTypes: ["TimeSlots"], 
  endpoints: (builder) => ({
    addTimeSlot: builder.mutation({
      query: ({ fromTime, toTime }) => ({
        url: "/admin/add-time-slot",
        method: "POST",
        body: { fromTime, toTime },
      }),
      invalidatesTags: ["TimeSlots"], 
    }),
    getTimeSlots: builder.query({
      query: () => "/admin/get-time-slots",
      providesTags: ["TimeSlots"], 
    }),
  }),
});

export const { useAddTimeSlotMutation, useGetTimeSlotsQuery } = timeSlotApi;
