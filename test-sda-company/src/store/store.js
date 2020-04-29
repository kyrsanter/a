import {createStore, applyMiddleware, combineReducers} from "redux";
import {userReducer, postReducer, messagesReducer} from "../reducers";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    message: messagesReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

window.st = store.getState;

export default store;