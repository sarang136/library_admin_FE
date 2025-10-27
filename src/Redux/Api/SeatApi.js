// src/Redux/Api/SeatApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const seatApi = createApi({
  reducerPath: "seatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-1-xu20.onrender.com/admin",
    credentials: "include",
  }),
  tagTypes: ["Seats"],
  endpoints: (builder) => ({
    getAvailableSeats: builder.query({
      query: () => "get-available-seats",
      providesTags: ["Seats"],
    }),
    addSeats: builder.mutation({
      query: (seats) => ({
        url: "add-seats",
        method: "POST",
        body: seats,
      }),
      invalidatesTags: ["Seats"],
    }),
    editSeat: builder.mutation({
      query: ({ seat, status }) => ({
        url: "edit-seat",
        method: "PATCH",
        body: { seat, status },
      }),
      invalidatesTags: ["Seats"],
    }),
    deleteSeat: builder.mutation({
      query: (seat) => ({
        url: `delete-seat/${seat}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Seats"],
    }),
  }),
});

export const {
  useGetAvailableSeatsQuery,
  useAddSeatsMutation,
  useEditSeatMutation,
  useDeleteSeatMutation,
} = seatApi;
