import {createSlice} from '@reduxjs/toolkit';
const INITIAL_STATE = {
  uploadedImage: {},
  downloadUrl: '',
};
const uploadReducer = createSlice({
  name: 'Upload Reducer',
  initialState: INITIAL_STATE,
  reducers: {
    addUploadedData: (state, action) => {
      state.uploadedImage = action.payload;
    },
    addDownloadURL: (state, action) => {
      state.downloadUrl = action.payload;
    },
    cleanUpload: (state, action) => {
      state.uploadedImage = {};
      state.downloadUrl = {};
    },
  },
});
export const {addUploadedData,cleanUpload, addDownloadURL} = uploadReducer.actions;
export default uploadReducer.reducer;
