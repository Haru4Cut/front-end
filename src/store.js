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

// 캐릭터 생성 여부
let isCharacterCreated = createSlice({
  name: "isCharacterCreated",
  initialState: false,
  reducers: {
    setIsCharacterCreated: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCutNum } = cutNum.actions;
export const { setDate } = date.actions;
export const { setCharacterData } = characterData.actions;
export const { setNickName } = nickName.actions;
export const { setIsCharacterCreated } = isCharacterCreated.actions;

export default configureStore({
  reducer: {
    cutNum: cutNum.reducer,
    date: date.reducer,
    characterData: characterData.reducer,
    nickName: nickName.reducer,
    isCharacterCreated: isCharacterCreated.reducer,
  },
});
