import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    attemptedSignIn: false,
  },
  reducers: {
    authenticate: (state, action) => {
      const { payload } = action;
      state.user = payload.user;
      state.token = payload.token;
    },
    attemptedLogin: (state, action) => {
      state.attemptedSignIn = true;
    },
    // login(state, action) {
    //   state.user = action.payload.user;
    //   state.token = action.payload.token;
    // },
    // logout(state) {
    //   state.user = null;
    //   state.token = null;
    // },
  },
});

export const { authenticate, attemptedLogin } = authSlice.actions;

export default authSlice.reducer;
