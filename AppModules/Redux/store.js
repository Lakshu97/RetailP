import loginReducer from './Reducers/LoginReducer';
import {configureStore} from '@reduxjs/toolkit';
import homeReducer from './Reducers/HomeReducer';
import AppReactotron from '../Dev/ReactotronConfig';
import uploadReducer from './Reducers/UploadReducer';

const rootReducer = {
  login: loginReducer,
  home: homeReducer,
  upload: uploadReducer,
};
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({thunk: false}),
  devTools: true, // <- Comment this line for taking build
  enhancers: [AppReactotron.createEnhancer()],
});
export default store;
