import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    postData: [],
  },

  reducers: {
    setPostData: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.postData = action.payload;
      } else {
        state.postData = [action.payload, ...state.postData];
      }
    },
    updatePost: (state, action) => {
      state.postData = state.postData.map(p => p._id === action.payload._id ? action.payload : p)
    }
  },
});

export const { setPostData, updatePost } = postSlice.actions;
export default postSlice.reducer;
