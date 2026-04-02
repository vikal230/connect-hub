import React from "react";
import { useSelector } from "react-redux";
import { usePostStoryReelHook } from "../hooks/usePostStoryReelHook";

const FollowButton = ({ targetUserId, tailwind, onSuccess }) => {
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
      const data = await handleFollow({ targetUserId });
      if (onSuccess) {
        await onSuccess();
      }
      return data;
    } catch (error) {
      console.log("follow button error", error);
      return error;
    }
  };
  return (
    <button className={tailwind} onClick={handleFollowButton}>
      {isFollowing ? "following" : "follow"}
    </button>
  );
};

export default FollowButton;
