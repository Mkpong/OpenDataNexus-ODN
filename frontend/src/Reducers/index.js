import { combineReducers } from "redux";
import currentUser from "./UserReducers";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const rootReducer = combineReducers({currentUser});

export default rootReducer;