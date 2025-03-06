import { IMember } from "@/api/member";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IMemberStore extends IMember {
  time: string,
  color: string
}

export interface IListUserState {
  listUser: IMemberStore[]
}

const initState: IListUserState = {
  listUser: []
};

const listUserSlice = createSlice({
  name: "listUser",
  initialState: initState,
  reducers: {
    setListUser: (state, action: PayloadAction<IMemberStore[]>) => {
      return { ...state, listUser: action.payload };
    },
  },
});
export const { setListUser } = listUserSlice.actions;
export default listUserSlice;
