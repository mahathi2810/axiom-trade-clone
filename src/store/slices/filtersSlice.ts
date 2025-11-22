import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FiltersState = {
  activeTab: string;
};

const initialState: FiltersState = {
  activeTab: "all",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<string>) {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = filtersSlice.actions;
export default filtersSlice.reducer;
