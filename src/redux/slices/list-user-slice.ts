import { IMember } from "@/api/member";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IListUserState {
  listUser: IMember[]
}

const initState: IListUserState = {
  listUser: []
};

const listUserSlice = createSlice({
  name: "listUser",
  initialState: initState,
  reducers: {
    setListUser: (state, action: PayloadAction<IMember[]>) => {
      return { ...state, listUser: action.payload };
    },
  },
});
export const { setListUser } = listUserSlice.actions;
export default listUserSlice;
