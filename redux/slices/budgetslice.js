import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  budgetData: {},
};

export const budgetSlice = createSlice({
  name: "budgetSlice",
  initialState,
  reducers: {
    setBudgetData: (state, action) => {
      state.budgetData = action.payload;
    },
  },
});

export const { setBudgetData } = budgetSlice.actions;
export default budgetSlice.reducer;
