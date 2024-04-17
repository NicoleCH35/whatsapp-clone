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
      state.attemptedSignIn = true;
    },
    attemptedLogin: (state, action) => {
      state.attemptedSignIn = true;
    },
    // login(state, action) {
    //   state.user = action.payload.user;
    //   state.token = action.payload.token;
    // },
    logout(state, action) {
      state.user = null;
      state.token = null;
      state.attemptedSignIn = false;
    },
    updateUserData(state, action) {
      const { payload } = action;
      state.user = { ...state.user, ...payload.user };
    },
  },
});

export const { authenticate, attemptedLogin, logout } = authSlice.actions;

export default authSlice.reducer;
