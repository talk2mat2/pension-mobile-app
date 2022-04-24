import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  atk: null,
  rtk: null,
  onboardingCompleted: false,
  emailStart: "",
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.data = action.payload;
    },
    logOut: (state) => {
      state.data = {};
    },
    setOnboardingCompleted: (state, action) => {
      state.onboardingCompleted = action.payload;
    },
    setAtk: (state, action) => {
      state.atk = action.payload;
    },

    setRtk: (state, action) => {
      state.rtk = action.payload;
    },
    setU: (state, action) => {
      state.user = action.payload;
    },
    setEmailStart: (state, action) => {
      state.emailStart = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logOut } = userSlice.actions;
export default userSlice.reducer;
