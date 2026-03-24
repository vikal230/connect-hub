import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
  name: "story",
  initialState: {
    storyData: []
  },

  reducers: {
    setStoryData: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.storyData = action.payload;
      } else {
        state.storyData = [action.payload, state.storyData];
      }
    },
  },
});

export const { setStoryData } = storySlice.actions;
export default storySlice.reducer;
