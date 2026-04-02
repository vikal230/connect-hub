import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
  name: "story",
  initialState: {
    storyData: [],
    storyList: [],
    currentUserStory: [],
  },

  reducers: {
    setStoryData: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.storyData = action.payload;
      } else {
        state.storyData = [action.payload, ...state.storyData];
      }
    },
    setStoryList: (state, action) => {
      state.storyList = action.payload;
    },
    setCurentUserStory: (state, action) => {
      state.currentUserStory = action.payload;
    },
  },
});

export const { setStoryData, setStoryList, setCurentUserStory } =
  storySlice.actions;
export default storySlice.reducer;
