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
  },
});

export const { setPostData } = postSlice.actions;
export default postSlice.reducer;
