import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../store";
import {  setMessage } from "../slices/message-slice";
import { IMessage } from "@/api/message";

const useSetMessage = (): ((message: IMessage) => void) => {
  const dispatch = useDispatch();
  const setmessagetStore = (message: IMessage): void => {
    dispatch(setMessage(message));
  };
  return setmessagetStore;
};

const useGetMessage = (): IMessage | undefined => {
  const message = useSelector((state: RootState) => state.message);
  return message.message;
};


export { useSetMessage, useGetMessage };
 