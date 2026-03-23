import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name:"user",
  initialState:{
    userData: null,
    loading: true,
    suggestedUsers:null,
    profileData:null
  },

  reducers:{
    setUserData:(state, action) => {
      state.userData = action.payload
      state.loading = false
    },
     setsuggestedUsers:(state, action) => {
      state.suggestedUsers = action.payload
      state.loading = false
    },
    setProfileData:(state, action) => {
      state.profileData = action.payload
      state.loading = false
    }
  }
})

export const {setUserData, setsuggestedUsers, setProfileData} = userSlice.actions
export default userSlice.reducer;