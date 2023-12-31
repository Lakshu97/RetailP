import {createSlice} from '@reduxjs/toolkit';
const INITIAL_STATE = {
  userStoreList: {},
  storeListApi: {},
  stores: [],
  noOfStores:0
};
const homeReducer = createSlice({
  name: 'HomeReducer',
  initialState: INITIAL_STATE,
  reducers: {
    addStoreList: (state, action) => {
      state.storeListApi = require('../../API/mockData.json').stores;
      state.userStoreList = action.payload;
      state.noOfStores = action.payload.length
    },
    filterStores: (state, action) => {
      state.stores = action.payload;
    },
  },
});
export const {addStoreList, filterStores} = homeReducer.actions;
export default homeReducer.reducer;
