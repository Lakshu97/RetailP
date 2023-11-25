import loginReducer from './Reducers/LoginReducer';
import {configureStore} from '@reduxjs/toolkit';
import homeReducer from "./Reducers/HomeReducer";

const rootReducer = {
  login: loginReducer,
  home: homeReducer,
};
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({thunk: false}),
});
export default store;
