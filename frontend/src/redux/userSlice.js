import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name:"user",
  initialState:{
    userData: null,
    loading: true,
    suggestedUsers:null
  },

  reducers:{
    setUserData:(state, action) => {
      state.userData = action.payload
      state.loading = false
    },
     setsuggestedUsers:(state, action) => {
      state.suggestedUsers = action.payload
      state.loading = false
    }
  }
})

export const {setUserData, setsuggestedUsers} = userSlice.actions
export default userSlice.reducer;