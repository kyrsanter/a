import {createStore, applyMiddleware, combineReducers} from "redux";
import {userReducer, postReducer, messagesReducer} from "../reducers";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    message: messagesReducer
});

export type RootStateType = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

