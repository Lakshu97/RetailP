import {createSlice} from '@reduxjs/toolkit';
const INITIAL_STATE = {
  loginData: {},
  loggedInUser: {},
};

const loginReducer = createSlice({
  name: 'LoginReducer',
  initialState: INITIAL_STATE,
  reducers: {
    getLoginData: (state, action) => {
      const data = require('../../API/mockData.json');
      state.loginData = data.users;
    },
    sendLoginData: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
});

export const {sendLoginData, getLoginData} = loginReducer.actions;
export default loginReducer.reducer;
