import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./Api/AuthApi";
import { timeSlotApi } from "./Api/TimeSlotAoi";
import { seatApi } from "./Api/SeatApi";
import { addSeatApi } from "./Api/AddSeatApi";
import { staffApi } from "./Api/StaffApi";
import { studentApi } from "./Api/StudentApi";
import { imageApi } from "./Api/ImageApi";
import { enquiryApi } from "./Api/EnquiryApi";
import { bookingApi } from "./Api/BookingApi";
import { updatesApi } from "./Api/UpdateApi";

import authReducer from "./Slices/authSlice";
import { Chargeapi } from "./Api/Chargeapi";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    [authApi.reducerPath]: authApi.reducer,
    [timeSlotApi.reducerPath]: timeSlotApi.reducer,
    [seatApi.reducerPath]: seatApi.reducer,
    [addSeatApi.reducerPath]: addSeatApi.reducer,
    [staffApi.reducerPath]: staffApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
    [enquiryApi.reducerPath]: enquiryApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [updatesApi.reducerPath]: updatesApi.reducer,
    [Chargeapi.reducerPath]: Chargeapi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(timeSlotApi.middleware)
      .concat(seatApi.middleware)
      .concat(addSeatApi.middleware)
      .concat(staffApi.middleware)
      .concat(studentApi.middleware)
      .concat(imageApi.middleware)
      .concat(enquiryApi.middleware)
      .concat(updatesApi.middleware)
      .concat(bookingApi.middleware)
      .concat(Chargeapi.middleware), 
});
