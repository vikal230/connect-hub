import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePostStoryReelHook } from "../hooks/usePostStoryReelHook";
import { toggleFollow } from "../redux/userSlice";

const FollowButton = ({ targetUserId, tailwind, onSuccess }) => {
  const dispatch = useDispatch();
  const { handleFollow } = usePostStoryReelHook();
  const { following } = useSelector((state) => state.user);
  const isFollowing = following?.some((item) => {
    if (typeof item === "string") {
      return item === targetUserId;
    }

    return item?._id === targetUserId;
  });

  const handleFollowButton = async () => {
    try {
      dispatch(toggleFollow(targetUserId));
      const data = await handleFollow({ targetUserId });
      if (onSuccess) {
        await onSuccess();
      }
      return data;
    } catch (error) {
      dispatch(toggleFollow(targetUserId));
      console.log("follow button error", error);
      return error;
    }
  };
  return (
    <button
      className={`${tailwind} min-w-[92px] whitespace-nowrap text-center border shadow-sm transition-colors active:scale-100 ${
        isFollowing
          ? "bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200"
          : "bg-sky-500 text-white border-sky-500 hover:bg-sky-400"
      }`}
      onClick={handleFollowButton}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
