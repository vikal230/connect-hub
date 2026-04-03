import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notificationData: [],
  },

  reducers: {
    setNotifications: (state, action) => {
      state.notificationData = action.payload;
    },
    addRealtimeNotification: (state, action) => {
      if (Array.isArray(state.notificationData)) {
        state.notificationData.unshift(action.payload);
      } else {
        state.notificationData = [action.payload];
      }
    }
  }
})

export const {setNotifications, addRealtimeNotification} = notificationSlice.actions
export default notificationSlice.reducer;