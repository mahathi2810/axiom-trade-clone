import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import filtersReducer from "./slices/filtersSlice";

/** Small UI slice for theme management */
const uiSlice = createSlice({
  name: "ui",
  initialState: { theme: "light" as "light" | "dark" },
  reducers: {
    setTheme(state, action: { payload: "light" | "dark" }) {
      // eslint-disable-next-line no-param-reassign
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = uiSlice.actions;

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    filters: filtersReducer,
    // add other reducers here
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
