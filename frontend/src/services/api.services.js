import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export const signup = async ({ name, userName, email, password }) => {
  try {
    const response = await api.post("/api/auth/signup", {
      name,
      userName,
      email,
      password,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(
      "API Signup Error:",
      error.response?.data?.message || error.message,
    );
    throw error;
  }
};

export const signIn = async ({ userName, password }) => {
  try {
    const response = await api.post("/api/auth/signin", { userName, password });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(
      "API SignIn Error:",
      error.response?.data?.message || error.message,
    );
    throw error;
  }
};

export const sendOtp = async ({ email }) => {
  try {
    const response = await api.post("/api/auth/sendotp", { email });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(
      "API Send OTP Error:",
      error.response?.data?.message || error.message,
    );
    throw error;
  }
};

export const isVerify = async ({ email, otp }) => {
  try {
    const response = await api.post("/api/auth/isverify", { email, otp });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error:", error.response?.data?.message);
  }
};

export const resetPassword = async ({ email, password }) => {
  try {
    const response = await api.post("/api/auth/resetpassword", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log("Error:", error.response?.data?.message);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/api/user/current");
    // console.log(await response.data);
    return response.data;
  } catch (error) {
    console.log("get current user error: ", error);
    throw error;
  }
};

export const LogOut = async () => {
  try {
    const response = await api.get("/api/auth/signout");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error:", error.response?.data?.message);
    throw error;
  }
};

export const suggestedUser = async () => {
  try {
    const response = await api.get("/api/user/suggest");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error:", error.response?.data?.message);
    throw error;
  }
};

export const searchUserApi = async (keyword) => {
  try {
    const response = await api.get("/api/user/search", {
      params: { keyword },
    });
    return response.data;
  } catch (error) {
    console.log("search user api error", error);
    throw error;
  }
};

export const getProfile = async (userName) => {
  try {
    const response = await api.get(`/api/user/getprofile/${userName}`);
    // console.log(response.data);
    return response;
  } catch (error) {
    console.log("frontend api get profile error", error);
    throw error;
  }
};

export const editProfile = async ({
  name,
  userName,
  profession,
  gender,
  bio,
  file,
}) => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("userName", userName);
    formData.append("profession", profession);
    formData.append("gender", gender);
    formData.append("bio", bio);
    if (file) formData.append("profileImage", file);

    const response = await api.post("/api/user/editprofile", formData);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const uploadPostApi = async ({ caption, mediaType, file }) => {
  try {
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("mediaType", mediaType);
    formData.append("media", file);
    const response = await api.post("/api/post/upload", formData);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("upload post error", error);
    throw error;
  }
};

export const uploadStoryApi = async ({ mediaType, file }) => {
  try {
    const formData = new FormData();
    formData.append("mediaType", mediaType);
    formData.append("media", file);
    const response = await api.post("/api/story/upload", formData);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("upload post error", error);
    throw error;
  }
};

export const uploadReelApi = async ({ caption, file }) => {
  try {
    const formData = new FormData();
    formData.append("media", file);
    formData.append("caption", caption);
    // console.log(formData.get("media"));
    const response = await api.post("/api/reel/upload", formData);
    // console.log("file to upload:",file)
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("upload post error", error);
    throw error;
  }
};

export const fetchAllPostApi = async () => {
  try {
    const response = await api.get("/api/post/getall");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("fetch all post error", error);
    throw error;
  }
};

export const updateLikeApi = async (postId) => {
  try {
    const response = await api.get(`/api/post/like/${postId}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("update like error", error);
  }
};

export const CommentOnPostApi = async ({ postId, message }) => {
  try {
    const response = await api.post(`/api/post/comments/${postId}`, {
      message,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const savedPostApi = async (postId) => {
  try {
    const response = await api.get(`/api/post/saved/${postId}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const followApi = async ({ targetUserId }) => {
  try {
    const response = await api.get(`/api/user/follow/${targetUserId}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllReels = async () => {
  try {
    const response = await api.get("/api/reel/all-reels");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllLikesReel = async (reelId) => {
  try {
    const response = await api.get(`/api/reel/like/${reelId}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const CommentOnReelApi = async (reelId, message) => {
  try {
    const response = await api.post(`/api/reel/comments/${reelId}`, {
      message,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchStoryByUserName = async (userName) => {
  try {
    const response = await api.get(`/api/story/user/${userName}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchAllStoryApi = async () => {
  try {
    const response = await api.get(`/api/story/allstories`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const viewStoryApi = async (storyId) => {
  try {
    const response = await api.get(`/api/story/view/${storyId}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sendMessageApi = async ({ receiverId, formData }) => {
  try {
    const response = await api.post(
      `/api/message/send/${receiverId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllMessagesApi = async (receiverId) => {
  try {
    const response = await api.get(`/api/message/getAll/${receiverId}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getConversationApi = async (userId) => {
  try {
    const response = await api.get(`/api/message/conversation/${userId}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getFollowingListApi = async () => {
  try {
    const response = await api.get("/api/user/followinglist");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPrevChatUsersApi = async () => {
  try {
    const response = await api.get("/api/message/prevchats");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllNotificationsApi = async () => {
  try {
    const response = await api.get("/api/user/notifications");
    // console.log(response)
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const markAsReadNotificationsApi = async ({ notificationId }) => {
  try {
    const response = await api.post("/api/user/markasread", { notificationId });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
