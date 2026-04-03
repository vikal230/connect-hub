import {
  getCurrentUser,
  isVerify,
  LogOut,
  resetPassword,
  sendOtp,
  signIn,
  signup,
  suggestedUser,
  searchUserApi,
  getProfile,
  editProfile,
  getAllNotificationsApi,
  markAsReadNotificationsApi,
} from "../services/api.services";
import { useDispatch } from "react-redux";
import {
  setsuggestedUsers,
  setUserData,
  setProfileData,
  setFollowing,
  setSearchData,
} from "../redux/userSlice";
import { setNotifications } from "../redux/notificationSlice";
import { useNavigate } from "react-router-dom";
import { setCurentUserStory } from "../redux/storySlice";
import { useSelector } from "react-redux";
import { setLoading } from "../redux/userSlice";


export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notificationData } = useSelector((state) => state.notification);

  const handleSignup = async ({ name, userName, email, password }) => {
    try {
      const data = await signup({ name, userName, email, password });
      // console.log(data);
      return data;
    } catch (error) {
      console.log("handleSignup error aa rha hai!", error);
      throw error;
    }
  };

  const handleSignIn = async ({ userName, password }) => {
    try {
      await signIn({ userName, password });
      return await handleGetCurrentUser();
    } catch (error) {
      console.log("handleSignIn error", error);
      throw error;
    }
  };

  const handleSendOtp = async ({ email }) => {
    try {
      const data = await sendOtp({ email });
      // console.log(data);
      return data;
    } catch (error) {
      console.log("hooks otpsend error!", error);
      throw error;
    }
  };

  const handleIsVerify = async ({ email, otp }) => {
    try {
      const data = await isVerify({ email, otp });
      // console.log(data);
      return data;
    } catch (error) {
      console.log("hooks verify error!", error);
      throw error;
    }
  };

  const handleResetPassword = async ({ email, password }) => {
    try {
      const data = await resetPassword({ email, password });
      // console.log(data);
      return data;
    } catch (error) {
      console.log("hooks resetPassword error!", error);
      throw error;
    }
  };

  const handleGetCurrentUser = async () => {
    try {
      const data = await getCurrentUser();
      dispatch(setUserData(data.user));
      dispatch(setFollowing(data.user.following));
      dispatch(setCurentUserStory(data.user.story));
      return data;
    } catch (error) {
      console.log(error);
      dispatch(setUserData(null));
      if (error.response && error.response.status === 401) {
        navigate("/signin");
      }
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogOut = async () => {
    try {
      const data = await LogOut();
      // console.log(data);
      dispatch(setUserData(null));
      navigate("/signin");
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleSuggestedUser = async () => {
    try {
      const data = await suggestedUser();
      dispatch(setsuggestedUsers(data.users));
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleGetProfile = async (userName) => {
    try {
      const data = await getProfile(userName);
      if (data.success) {
        dispatch(setProfileData(data.user));
      }
      return data.user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleSearchUser = async (keyword) => {
    try {
      const trimmedKeyword = keyword.trim();

      if (!trimmedKeyword) {
        dispatch(setSearchData([]));
        return { success: true, users: [] };
      }

      const data = await searchUserApi(trimmedKeyword);
      dispatch(setSearchData(data.users || []));
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleEditProfile = async ({
    name,
    userName,
    profession,
    gender,
    bio,
    file,
  }) => {
    try {
      const data = await editProfile({
        name,
        userName,
        profession,
        gender,
        bio,
        file,
      });
      if (data?.success) {
        dispatch(setUserData(data.user));
        dispatch(setProfileData(data.user));
      }
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleAllNotification = async () => {
    try {
      const result = await getAllNotificationsApi();
      dispatch(setNotifications(result.notifications));
      console.log(result.notifications);
      return result.notifications;
    } catch (error) {
      return error;
    }
  };

  const markAllUnreadAsRead = async () => {
    if (!notificationData || !Array.isArray(notificationData)) {
      return;
    }

    const unreadIds = notificationData
      .filter((noti) => noti && noti.isRead === false)
      .map((noti) => noti._id);

    if (unreadIds.length === 0) {
      return;
    }

    try {
      const data = await markAsReadNotificationsApi({
        notificationId: unreadIds,
      });
      dispatch(setNotifications(data.notifications));
      
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    handleSignup,
    handleSignIn,
    handleSendOtp,
    handleIsVerify,
    handleResetPassword,
    handleGetCurrentUser,
    handleLogOut,
    handleSuggestedUser,
    handleSearchUser,
    handleGetProfile,
    handleEditProfile,
    handleAllNotification,
    markAllUnreadAsRead,
  };
};
