import { IMessage } from "@/api/message";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IMessageState {
  message?: IMessage
}

const initState: IMessageState = {};

const messageSlice = createSlice({
  name: "message",
  initialState: initState,
  reducers: {
    setMessage: (state, action: PayloadAction<IMessage>) => {
      return { ...state, message: action.payload };
    },
  },
});

export const { setMessage } = messageSlice.actions;
export default messageSlice;
