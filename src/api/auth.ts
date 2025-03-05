import { IUser } from "@/types/user";
import rootApi from "./api";
import { ISignUpData } from "@/pages/auth/sign-up/validation";
import { ILoginData } from "@/pages/auth/login/validation";


const path = {
  login: "/auth/signin",
  signup: "/auth/signup",
  logout: "/auth/logout"
};

const login = async (data: ILoginData): Promise<IUser> => {
  return await rootApi(
    {
      url: path.login,
      method: "post",
      data,
    },
    { withToken: false },
  );
};

const signUp = async (data: ISignUpData): Promise<unknown> => {
  return await rootApi(
    {
      url: path.signup,
      method: "post",
      data,
    },
    { withToken: false },
  );
};

const logout = async (): Promise<unknown> => {
  return await rootApi(
    {
      url: path.logout,
      method: "post",
    },
    { withToken: false },
  );
};

export { login, signUp, logout };
