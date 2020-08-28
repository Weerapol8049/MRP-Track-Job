import { combineReducers } from "redux";
import orderReducer from "./main.reducer";
import orderLineReducer from "./line.reducer";
import buReducer from "./bu.reducer";

export default combineReducers({
  orderReducer,
  orderLineReducer,
  buReducer
});
