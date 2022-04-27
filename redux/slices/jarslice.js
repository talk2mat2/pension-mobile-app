import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statePension: {},
  spouseStatePension: {},
  providerJars: [],
  benefitJars: [],
  savingPension: {},
  incomePension: {},
};

export const jarSlice = createSlice({
  name: "jarSlice",
  initialState,
  reducers: {
    updateStatepension: (state, action) => {
      state.statePension = action.payload;
    },
    cleanStatepension: (state) => {
      state.statePension = {};
    },
    updateSpousepension: (state, action) => {
      state.spouseStatePension = action.payload;
    },
    cleanSpousepension: (state) => {
      state.spouseStatePension = {};
    },
    updateProviderJars: (state, action) => {
      state.providerJars = action.payload;
    },
    cleanProviderJars: (state) => {
      state.providerJars = [];
    },
    updateBenefitJars: (state, action) => {
      state.benefitJars = action.payload;
    },
    cleanBenefitJars: (state) => {
      state.benefitJars = [];
    },
    updateSavingPension: (state, action) => {
      state.savingPension = action.payload;
    },
    cleanSavingPension: (state) => {
      state.savingPension = {};
    },
    updateIncomePension: (state, action) => {
      state.incomePension = action.payload;
    },
    cleanIncomePension: (state) => {
      state.incomePension = {};
    },
  },
});

export const {
  updateIncomePension,
  cleanIncomePension,
  updateSavingPension,
  cleanSavingPension,
  updateBenefitJars,
  cleanBenefitJars,
  cleanProviderJars,
  updateProviderJars,
  cleanSpousepension,
  cleanStatepension,
  updateStatepension,
  updateSpousepension,
} = jarSlice.actions;
export default jarSlice.reducer;
