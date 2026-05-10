import { createSlice } from "@reduxjs/toolkit";

const reelSlice = createSlice({
  name: "reel",
  initialState: {
    reelData: []
  },

  reducers: {
    setReelData: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.reelData = action.payload;
      } else {
        state.reelData = [action.payload, ...state.reelData];
      }
    },
     updateReel: (state, action) => {
      state.reelData = state.reelData.map(p => p._id === action.payload._id ? action.payload : p)
    },
    removeReel: (state, action) => {
      state.reelData = state.reelData.filter((reel) => reel._id !== action.payload);
    },
  },
});

export const { setReelData, updateReel, removeReel } = reelSlice.actions;
export default reelSlice.reducer;
