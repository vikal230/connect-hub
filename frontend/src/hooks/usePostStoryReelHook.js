import {
  fetchAllPostApi,
  uploadPostApi,
  uploadReelApi,
  uploadStoryApi,
  updateLikeApi,
  CommentOnPostApi,
  savedPostApi,
  followApi,
  getAllReels,
  getAllLikesReel,
  CommentOnReelApi,
  fetchStoryByUserName,
  fetchAllStoryApi,
  viewStoryApi,
  getFollowingListApi
} from "../services/api.services";
import { useAuth } from "./useAuth";
import { useDispatch } from "react-redux";
import { setPostData } from "../redux/postSlice";
import { setStoryData, setStoryList } from "../redux/storySlice";
import { setReelData, updateReel } from "../redux/reelSlice";
import { updatePost } from "../redux/postSlice";
import { setFollowing, setUserData, toggleFollow } from "../redux/userSlice";
import { setCurentUserStory } from "../redux/storySlice";

export const usePostStoryReelHook = () => {
  const dispatch = useDispatch();
  const { handleGetCurrentUser } = useAuth();


  const handleUploadPost = async ({ caption, mediaType, file }) => {
    try {
      const data = await uploadPostApi({ caption, mediaType, file });
      if (data.success) {
        dispatch(setPostData(data.post));
      }
      return data;
    } catch (error) {
      console.log("handleUploadPost error", error);
      return error;
    }
  };

  const handleUploadStory = async ({ mediaType, file }) => {
    try {
      const result = await uploadStoryApi({ mediaType, file });
      if (result.success) {
        dispatch(setStoryData(result.story));
        dispatch(setCurentUserStory(result.story));
      }
      return result;
    } catch (error) {
      console.log("handleUploadStory error", error);
      return error;
    }
  };

  const handleUploadReel = async ({ caption, mediaType, file }) => {
    try {
      const data = await uploadReelApi({ caption, mediaType, file });
      if (data.success) {
        dispatch(setReelData(data.reel));
      }
      return data;
    } catch (error) {
      console.log("handleUploadStory error", error);
      return error;
    }
  };

  const handleFetchedAllpost = async () => {
    try {
      const data = await fetchAllPostApi();
      // console.log("Hook data:", data.posts);
      if (data.success) {
        dispatch(setPostData(data.posts));
      }
    } catch (error) {
      console.log("handle fetch all post error", error);
    }
  };

  const handleFetchPostLike = async (postId) => {
    try {
      const data = await updateLikeApi(postId);
      if (data.success) {
        dispatch(updatePost(data.post)); // Redux update
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleFetchReelLike = async (postId) => {
    try {
      const data = await getAllLikesReel(postId);
      if (data?.success) {
        dispatch(updateReel(data.post));
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleCommentOnPost = async (postId, message) => {
    try {
      const data = await CommentOnPostApi({ postId, message });
      // console.log(data);
      if (data.success) {
        dispatch(updatePost(data.post));
      }
      return data;
    } catch (error) {
      console.log("handle Comment On Post Error", error);
      throw error;
    }
  };

  const handleSavedPost = async (postId) => {
    try {
      const data = await savedPostApi(postId);
      if (data.success) {
        dispatch(setUserData(data.user));
      }
      return data;
    } catch (error) {
      console.log("handle Saved Post Error", error);
      throw error;
    }
  };

  const handleFollow = async ({ targetUserId }) => {
    try {
      const result = await followApi({ targetUserId });
      if (result.success && result.user) {
        dispatch(setUserData(result.user));
        dispatch(setFollowing(result.user.following));
        await handleAllstory(); 
      }
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleGetAllReels = async () => {
    try {
      const result = await getAllReels();
      if (result.success) {
        dispatch(setReelData(result.reels));
      }
      // console.log(result.reels);
      return result.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleCommentOnReel = async (reelId, message) => {
    try {
      const result = await CommentOnReelApi(reelId, message);
      // console.log(result);
      if (result.success) {
        dispatch(updateReel(result.reel));
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleStoryByUserName = async (userName) => {
    try {
      const result = await fetchStoryByUserName(userName);
      if (result?.success) {
        dispatch(setStoryData(result.story));
      }

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleAllstory = async () => {
    try {
      const result = await fetchAllStoryApi();
      dispatch(setStoryList(result.stories || []));
      // console.log(result.stories);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleViewStory = async (storyId) => {
    try {
      const result = await viewStoryApi(storyId);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleGetFollowingList = async () => {
    try {
      const result = await getFollowingListApi();
      // dispatch(setFollowing(result.following || []));
      // console.log(result.following || []);
      return result.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return {
    handleUploadPost,
    handleUploadReel,
    handleUploadStory,
    handleFetchedAllpost,
    handleFetchPostLike,
    handleCommentOnPost,
    handleSavedPost,
    handleFollow,
    handleGetAllReels,
    handleFetchReelLike,
    handleCommentOnReel,
    handleStoryByUserName,
    handleAllstory,
    handleViewStory,
    handleGetFollowingList
  };
};
