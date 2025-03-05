import { combineReducers } from "redux";
import userSlice from "./slices/user-slice";
import listUserSlice from "./slices/list-user-slice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  listUser: listUserSlice.reducer,
});

export default rootReducer;
