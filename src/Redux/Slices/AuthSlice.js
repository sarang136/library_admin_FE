import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null, 
  token: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdminData: (state, action) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
    },
    logoutAdmin: (state) => {
      state.admin = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setAdminData, logoutAdmin } = AuthSlice.actions;
export default AuthSlice.reducer;
