import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../store";
import {  IMemberStore, setListUser } from "../slices/list-user-slice";

const useSetListUser = (): ((listUser: IMemberStore[]) => void) => {
  const dispatch = useDispatch();
  const setListUsertStore = (listUser: IMemberStore[]): void => {
    dispatch(setListUser(listUser));
  };
  return setListUsertStore;
};

const useGetListUser = (): IMemberStore[] => {
  const listUser = useSelector((state: RootState) => state.listUser);
  return listUser.listUser;
};


export { useSetListUser, useGetListUser };
 