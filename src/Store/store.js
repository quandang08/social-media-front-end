import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {thunk} from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import tweetReducer from "./Twit/Reducer";

const rootReducers = combineReducers({
    auth:authReducer,
    twit:tweetReducer,
});

// ✅ Tạo store với middleware thunk
export const store = legacy_createStore(rootReducers,applyMiddleware(thunk)); 


