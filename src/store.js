
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import authReducer from './features/auth';
import userReducer from './features/users';

const reducer = combineReducers({
    auth: authReducer,
    user: userReducer,
});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

export default store;

