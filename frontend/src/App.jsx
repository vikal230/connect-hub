import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import { useAuth } from "./hooks/useAuth";
import Loader from "./components/Loader";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Upload from "./pages/Upload";
import { usePostStoryReelHook } from "./hooks/usePostStoryReelHook";
import Reels from "./pages/Reels";
import Story from "./pages/Story";
import Messages from "./pages/Messages";
import MessageArea from "./pages/MessageArea";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setSocketIo } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/socketSlice";
import { useMessageHooks } from "./hooks/useMessageHooks";
import { updatePost } from "./redux/postSlice";
import { updateReel } from "./redux/reelSlice";
import Search from "./pages/Search";
import NotificationPage from "./pages/NotificationPage";
import { addRealtimeNotification } from "./redux/notificationSlice";

const App = () => {
  const location = useLocation();
  const [toast, setToast] = useState(null);
  const [bootLoading, setBootLoading] = useState(true);
  const { getPrevChatUsersApiHook } = useMessageHooks();
  const dispatch = useDispatch();
  const { handleGetCurrentUser } = useAuth();
  const {
    handleFetchedAllpost,
    handleGetAllReels,
    handleAllstory,
    handleGetFollowingList,
  } = usePostStoryReelHook();
  const { handleSuggestedUser, handleAllNotification } = useAuth();

  const { userData, loading } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);
  const publicRoutes = ["/signin", "/signup", "/forgot-password"];
  const isPublicRoute = publicRoutes.includes(location.pathname);
  const isAuthEntryRoute = isPublicRoute || (!userData && location.pathname === "/");

  useEffect(() => {
    handleGetCurrentUser().catch(() => {});
  }, []);

  useEffect(() => {
    if (isAuthEntryRoute) {
      setBootLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setBootLoading(false);
    }, 350);

    return () => clearTimeout(timer);
  }, [isAuthEntryRoute]);

  // useEffect(() => {
  //   if (!userData) {
  //     return;
  //   }

  //   handleSuggestedUser();
  //   handleFetchedAllpost();
  //   handleGetAllReels();
  //   handleAllstory();
  //   handleGetFollowingList();
  //   getPrevChatUsersApiHook();
  // }, [userData]);

  // useEffect(() => {
  //   if (userData) {
  //     handleAllNotification();
  //   }
  // }, [userData]);

  useEffect(() => {
  if (!userData) return;

  Promise.all([
    handleFetchedAllpost(),
    handleAllstory(),
    handleSuggestedUser(),
    handleAllNotification(),
    handleGetAllReels(),
    handleGetFollowingList(),
    getPrevChatUsersApiHook(),
  ]);
}, [userData]);

  useEffect(() => {
    if (userData) {
      const socketIo = io(import.meta.env.VITE_API_URL, {
        query: {
          userId: userData._id,
        },
      });
      dispatch(setSocketIo(socketIo));
      socketIo.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });
      socketIo.on("likedPost", (updatedPost) => {
        dispatch(updatePost(updatedPost));
      });
      socketIo.on("CommentedPost", (updatedPost) => {
        dispatch(updatePost(updatedPost));
      });
      socketIo.on("likedReel", (updatedReel) => {
        dispatch(updateReel(updatedReel));
      });
      socketIo.on("CommentedOnReel", (updatedReel) => {
        dispatch(updateReel(updatedReel));
      });
      socketIo.on("newNotification", (notification) => {
        dispatch(addRealtimeNotification(notification));
      });

      return () => {
        socketIo.close();
      };
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocketIo(null));
      }
    }
  }, [userData]);

  useEffect(() => {
    let timeoutId;

    const handleToastEvent = (event) => {
      const detail = event.detail;
      clearTimeout(timeoutId);
      setToast(detail);

      if (!detail?.sticky) {
        timeoutId = setTimeout(() => {
          setToast(null);
        }, 3000);
      }
    };

    window.addEventListener("app-toast", handleToastEvent);

    return () => {
      window.removeEventListener("app-toast", handleToastEvent);
      clearTimeout(timeoutId);
    };
  }, []);

  if ((!isAuthEntryRoute && bootLoading) || (loading && !userData && !isAuthEntryRoute)) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <>
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[999] w-[92%] max-w-[380px]">
          <div
            className={`w-full rounded-2xl border px-4 py-3 text-sm font-medium shadow-xl backdrop-blur-sm ${
              toast.type === "success"
                ? "bg-zinc-900/95 border-zinc-700 text-zinc-100"
                : toast.type === "error"
                  ? "bg-red-950/95 border-red-800 text-red-100"
                  : "bg-zinc-900/95 border-sky-700 text-zinc-100"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to={"/signin"} />}
        />

        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signin"
          element={!userData ? <SignIn /> : <Navigate to={"/"} />}
        />
        <Route
          path="/forgot-password"
          element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
        />

        <Route
          path="/profile/:userName"
          element={userData ? <Profile /> : <Navigate to={"/signin"} />}
        />
      
        <Route
          path="/notificationpage"
          element={
            userData ? <NotificationPage /> : <Navigate to={"/signin"} />
          }
        />
        <Route
          path="/messagearea"
          element={userData ? <MessageArea /> : <Navigate to={"/signin"} />}
        />

        <Route
          path="/search"
          element={userData ? <Search /> : <Navigate to={"/signin"} />}
        />

        <Route
          path="/messages"
          element={userData ? <Messages /> : <Navigate to={"/signin"} />}
        />

        <Route
          path="/story/:userName"
          element={userData ? <Story /> : <Navigate to={"/signin"} />}
        />

        <Route
          path="/editprofile"
          element={userData ? <EditProfile /> : <Navigate to={"/signin"} />}
        />

        <Route
          path="/upload"
          element={userData ? <Upload /> : <Navigate to={"/signin"} />}
        />

        <Route
          path="/reels"
          element={userData ? <Reels /> : <Navigate to={"/signin"} />}
        />
      </Routes>
    </>
  );
};

export default App;
