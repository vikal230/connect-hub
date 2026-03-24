import {
  fetchAllPostApi,
  uploadPostApi,
  uploadReelApi,
  uploadStoryApi,
} from "../services/api.services";
import { useDispatch } from "react-redux";
import { setPostData } from "../redux/postSlice";
import { setStoryData } from "../redux/storySlice";
import { setReelData } from "../redux/reelSlice";

export const usePostStoryReelHook = () => {
  const dispatch = useDispatch();

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
      const data = await uploadStoryApi({ mediaType, file });
      if (data.success) {
        dispatch(setStoryData(data.story));
      }
      return data;
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
      console.log("Hook data:", data.posts);
      if (data.success) {
        dispatch(setPostData(data.posts));
      }
    } catch (error) {
      console.log("handle fetch all post error", error);
    }
  };

  return {
    handleUploadPost,
    handleUploadReel,
    handleUploadStory,
    handleFetchedAllpost,
  };
};
