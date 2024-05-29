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
let characterData = createSlice({
  name: "characterData",
  initialState: {},
  reducers: {
    setCharacterData: (state, action) => {
      return action.payload;
    },
  },
});
let nickName = createSlice({
  name: "nickName",
  initialState: {},
  reducers: {
    setNickName: (state, action) => {
      return action.payload;
    },
  },
});
// 새로운 createSlice 추가: userId
let userId = createSlice({
  name: "userId",
  initialState: null,
  reducers: {
    setUserId: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCutNum } = cutNum.actions;
export const { setDate } = date.actions;
export const { setCharacterData } = characterData.actions;
export const { setNickName } = nickName.actions;
export const { setUserId } = userId.actions;
export default configureStore({
  reducer: {
    cutNum: cutNum.reducer,
    date: date.reducer,
    characterData: characterData.reducer,
    nickName: nickName.reducer,
    userId: userId.reducer,
  },
});
