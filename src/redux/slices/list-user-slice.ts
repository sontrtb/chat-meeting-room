import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IListUserState {
  listUser: {id: 1; name: string}[]
}

const initState: IListUserState = {
  listUser: []
};

const listUserSlice = createSlice({
  name: "listUser",
  initialState: initState,
  reducers: {
    setListUser: (state, action: PayloadAction<{id: 1; name: string}[]>) => {
      return { ...state, listUser: action.payload };
    },
  },
});
export const { setListUser } = listUserSlice.actions;
export default listUserSlice;
