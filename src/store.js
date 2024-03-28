import { configureStore, createSlice } from "@reduxjs/toolkit";

let cutNum = createSlice({
  name: "cutNum",
  initialState: 1,
  reducers: {
    setCutNum: (state, action) => {
      return action.payload;
    },
  },
});

let date = createSlice({
  name: "date",
  initialState: null,
  reducers: {
    setDate: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCutNum } = cutNum.actions;
export const { setDate } = date.actions;

export default configureStore({
  reducer: {
    cutNum: cutNum.reducer,
    date: date.reducer,
  },
});
