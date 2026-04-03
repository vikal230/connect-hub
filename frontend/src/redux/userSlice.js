import { createSlice } from "@reduxjs/toolkit";

const normalizeFollowingIds = (following = []) =>
  following
    .map((item) => {
      if (typeof item === "string") return item;
      return item?._id || null;
    })
    .filter(Boolean);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    loading: true,
    suggestedUsers: [],
    profileData: null,
    following: [],
    searchData: null,
  },

  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    setsuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
     
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    setFollowing: (state, action) => {
      state.following = normalizeFollowingIds(action.payload);
    },
    toggleFollow: (state, action) => {
      const targetUserId = action.payload;
      if (state.following.includes(targetUserId)) {
        state.following = state.following.filter((id) => id != targetUserId);
      } else {
        state.following.push(targetUserId);
      }
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setUserData,
  setsuggestedUsers,
  setProfileData,
  toggleFollow,
  setFollowing,
  setSearchData,
  setLoading
} = userSlice.actions;
export default userSlice.reducer;
