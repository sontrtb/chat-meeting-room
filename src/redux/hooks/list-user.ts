import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../store";
import {  setListUser } from "../slices/list-user-slice";

const useSetListUser = (): ((listUser: {id: 1; name: string}[]) => void) => {
  const dispatch = useDispatch();
  const setListUsertStore = (listUser: {id: 1; name: string}[]): void => {
    dispatch(setListUser(listUser));
  };
  return setListUsertStore;
};

const useGetListUser = (): {id: 1; name: string}[] => {
  const listUser = useSelector((state: RootState) => state.listUser);
  return listUser.listUser;
};


export { useSetListUser, useGetListUser };
 