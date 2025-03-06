import { IUser } from "@/types/user";
import rootApi from "./api";


const path = {
  login: "/u/login-guest",
};

const login = async (): Promise<IUser> => {
  return await rootApi(
    {
      url: path.login,
      method: "post",
    },
    { withToken: false },
  );
};


export { login };
