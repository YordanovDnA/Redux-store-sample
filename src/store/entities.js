import { combineReducers } from "redux";
import usersReducer from "./users";
import customersReducer from "./customers";

export default combineReducers({
  users: usersReducer,
  customers: customersReducer,
});
