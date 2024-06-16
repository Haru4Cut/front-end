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

let selectedBox = createSlice({
  name: "selectedBox",
  initialState: null,
  reducers: {
    setSelectedBox: (state, action) => {
      return action.payload;
    },
  },
});
let userId = createSlice({
  name: "userId",
  initialState: null,
  reducers: {
    setUserId: (state, action) => action.payload,
  },
});
// 캐릭터 존재 여부
let isCharacterPresent = createSlice({
  name: "isCharacterPresent",
  initialState: false,
  reducers: {
    setCharacterPresence: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCutNum } = cutNum.actions;
export const { setDate } = date.actions;
export const { setCharacterData } = characterData.actions;
export const { setNickName } = nickName.actions;
export const { setSelectedBox } = selectedBox.actions;
export const { setUserId } = userId.actions;
export const { setCharacterPresence } = isCharacterPresent.actions;

export default configureStore({
  reducer: {
    cutNum: cutNum.reducer,
    date: date.reducer,
    characterData: characterData.reducer,
    nickName: nickName.reducer,
    selectedBox: selectedBox.reducer,
    userId: userId.reducer,
    isCharacterPresent: isCharacterPresent.reducer,
  },
});
