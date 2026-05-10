import {
  fetchAllPostApi,
  uploadPostApi,
  uploadReelApi,
  uploadStoryApi,
  updateLikeApi,
  CommentOnPostApi,
  savedPostApi,
  deletePostApi,
  deleteReelApi,
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
import { removePost, setPostData } from "../redux/postSlice";
import { setStoryData, setStoryList } from "../redux/storySlice";
import { removeReel, setReelData, updateReel } from "../redux/reelSlice";
import { updatePost } from "../redux/postSlice";
import { setFollowing, setUserData, toggleFollow } from "../redux/userSlice";
import { setCurentUserStory } from "../redux/storySlice";

export const usePostStoryReelHook = () => {
  const dispatch = useDispatch();
  const { handleGetCurrentUser } = useAuth();


  const handleUploadPost = async ({ caption, mediaType, file }) => {
    window.dispatchEvent(
      new CustomEvent("app-toast", {
        detail: {
          message: "Uploading post...",
          type: "loading",
          sticky: true,
        },
      }),
    );
    try {
      const data = await uploadPostApi({ caption, mediaType, file });
      if (data.success) {
        dispatch(setPostData(data.post));
        window.dispatchEvent(
          new CustomEvent("app-toast", {
            detail: {
              message: "Post uploaded successfully.",
              type: "success",
            },
          }),
        );
      }
      return data;
    } catch (error) {
      window.dispatchEvent(
        new CustomEvent("app-toast", {
          detail: {
            message: "Post upload failed.",
            type: "error",
          },
        }),
      );
      console.log("handleUploadPost error", error);
      return error;
    }
  };

  const handleUploadStory = async ({ mediaType, file }) => {
    window.dispatchEvent(
      new CustomEvent("app-toast", {
        detail: {
          message: "Uploading story...",
          type: "loading",
          sticky: true,
        },
      }),
    );
    try {
      const result = await uploadStoryApi({ mediaType, file });
      if (result.success) {
        dispatch(setStoryData(result.story));
        dispatch(setCurentUserStory(result.story));
        window.dispatchEvent(
          new CustomEvent("app-toast", {
            detail: {
              message: "Story uploaded successfully.",
              type: "success",
            },
          }),
        );
      }
      return result;
    } catch (error) {
      window.dispatchEvent(
        new CustomEvent("app-toast", {
          detail: {
            message: "Story upload failed.",
            type: "error",
          },
        }),
      );
      console.log("handleUploadStory error", error);
      return error;
    }
  };

  const handleUploadReel = async ({ caption, mediaType, file }) => {
    window.dispatchEvent(
      new CustomEvent("app-toast", {
        detail: {
          message: "Uploading reel...",
          type: "loading",
          sticky: true,
        },
      }),
    );
    try {
      const data = await uploadReelApi({ caption, mediaType, file });
      if (data.success) {
        dispatch(setReelData(data.reel));
        window.dispatchEvent(
          new CustomEvent("app-toast", {
            detail: {
              message: "Reel uploaded successfully.",
              type: "success",
            },
          }),
        );
      }
      return data;
    } catch (error) {
      window.dispatchEvent(
        new CustomEvent("app-toast", {
          detail: {
            message: "Reel upload failed.",
            type: "error",
          },
        }),
      );
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
        window.dispatchEvent(
          new CustomEvent("app-toast", {
            detail: {
              message: data.user?.saved?.some(
                (savedPost) => String(savedPost?._id || savedPost) === String(postId),
              )
                ? "Post saved successfully."
                : "Post removed from saved.",
              type: "success",
            },
          }),
        );
      }
      return data;
    } catch (error) {
      window.dispatchEvent(
        new CustomEvent("app-toast", {
          detail: {
            message: "Unable to update saved post.",
            type: "error",
          },
        }),
      );
      console.log("handle Saved Post Error", error);
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
      dispatch(setStoryList([]));
      return null;
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
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const data = await deletePostApi(postId);
      if (data.success) {
        dispatch(removePost(postId));
        window.dispatchEvent(
          new CustomEvent("app-toast", {
            detail: {
              message: "Post deleted successfully.",
              type: "success",
            },
          }),
        );
      }
      return data;
    } catch (error) {
      window.dispatchEvent(
        new CustomEvent("app-toast", {
          detail: {
            message: "Post delete failed.",
            type: "error",
          },
        }),
      );
      console.log("handle delete post error", error);
      throw error;
    }
  };

  const handleDeleteReel = async (reelId) => {
    try {
      const data = await deleteReelApi(reelId);
      if (data.success) {
        dispatch(removeReel(reelId));
        window.dispatchEvent(
          new CustomEvent("app-toast", {
            detail: {
              message: "Reel deleted successfully.",
              type: "success",
            },
          }),
        );
      }
      return data;
    } catch (error) {
      window.dispatchEvent(
        new CustomEvent("app-toast", {
          detail: {
            message: "Reel delete failed.",
            type: "error",
          },
        }),
      );
      console.log("handle delete reel error", error);
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
    handleGetFollowingList,
    handleDeletePost,
    handleDeleteReel,
  };
};
