import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  retireProfile: {},
};

export const rtprofileSlice = createSlice({
  name: "rtprofileSlice",
  initialState,
  reducers: {
    setRetireProfile: (state, action) => {
      state.retireProfile = action.payload;
    },
  },
});

export const { setRetireProfile } = rtprofileSlice.actions;
export default rtprofileSlice.reducer;
