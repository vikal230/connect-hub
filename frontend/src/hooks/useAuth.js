import {
  getCurrentUser,
  isVerify,
  LogOut,
  resetPassword,
  sendOtp,
  signIn,
  signup,
  suggestedUser,
  getProfile,
  editProfile,
} from "../services/api.services";
import { useDispatch } from "react-redux";
import {
  setsuggestedUsers,
  setUserData,
  setProfileData,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSignup = async ({ name, userName, email, password }) => {
    try {
      const data = await signup({ name, userName, email, password });
      console.log(data);
      return data;
    } catch (error) {
      console.log("handleSignup error aa rha hai!", error);
      throw error;
    }
  };

  const handleSignIn = async ({ userName, password }) => {
    try {
      const data = await signIn({ userName, password });
      console.log(data);
      return data;
    } catch (error) {
      console.log("handleSignIn error", error);
      throw error;
    }
  };

  const handleSendOtp = async ({ email }) => {
    try {
      const data = await sendOtp({ email });
      console.log(data);
      return data;
    } catch (error) {
      console.log("hooks otpsend error!", error);
      throw error;
    }
  };

  const handleIsVerify = async ({ email, otp }) => {
    try {
      const data = await isVerify({ email, otp });
      console.log(data);
      return data;
    } catch (error) {
      console.log("hooks verify error!", error);
      throw error;
    }
  };

  const handleResetPassword = async ({ email, password }) => {
    try {
      const data = await resetPassword({ email, password });
      console.log(data);
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
      return data;
    } catch (error) {
      console.log(error);
      dispatch(setUserData(null));
    }
  };

  const handleLogOut = async () => {
    try {
      const data = await LogOut();
      console.log(data);
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
      dispatch(setProfileData(data.user));
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
        dispatch(setUserData(data));
        dispatch(setProfileData(data));
      }
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
    handleGetProfile,
    handleEditProfile,
  };
};
