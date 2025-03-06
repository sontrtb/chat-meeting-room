import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../store";
import {  setListUser } from "../slices/list-user-slice";
import { IMember } from "@/api/member";

const useSetListUser = (): ((listUser: IMember[]) => void) => {
  const dispatch = useDispatch();
  const setListUsertStore = (listUser: IMember[]): void => {
    dispatch(setListUser(listUser));
  };
  return setListUsertStore;
};

const useGetListUser = (): IMember[] => {
  const listUser = useSelector((state: RootState) => state.listUser);
  return listUser.listUser;
};


export { useSetListUser, useGetListUser };
 