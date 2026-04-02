import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import postSlice from "./postSlice";
import storySlice from "./storySlice";
import reelSlice from "./reelSlice";
import messageSlice from "./messageSlice";
import socketSlice from "./socketSlice";
import notificationSlice from "./notificationSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    story: storySlice,
    reel: reelSlice,
    message: messageSlice,
    socket: socketSlice,
    notification: notificationSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["socket/setSocketIo"],
        ignoredPaths: ["socket.socket"],
      },
    }),
});
