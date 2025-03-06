import { combineReducers } from "redux";
import userSlice from "./slices/user-slice";
import listUserSlice from "./slices/list-user-slice";
import messageSlice from "./slices/message-slice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  listUser: listUserSlice.reducer,
  message: messageSlice.reducer
});

export default rootReducer;
