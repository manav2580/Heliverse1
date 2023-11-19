import { combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore} from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {userLoginReducer, userRegisterReducer, userDetailsreducer, userUpdateProfileReducer, userListReducer} from "./reducers/userReducer"

const reducer = combineReducers({
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsreducer,
    userUpdateProfile : userUpdateProfileReducer,
    userList: userListReducer,
});


const initialState = {}
const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;