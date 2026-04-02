import React from "react";
import {
  GoHeart,
  GoComment,
  GoBookmark,
  GoBookmarkFill,
  GoHeartFill,
} from "react-icons/go";
import dp from "../assets/dp.png";
import VideoPlayer from "./VideoPlayer";
import { useSelector } from "react-redux";
import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { usePostStoryReelHook } from "../hooks/usePostStoryReelHook";
import FollowButton from "./FollowButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import socketIo from "socket.io-client";

const Post = ({ postData }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showComment, setShowComment] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const { handleFetchPostLike, handleCommentOnPost, handleSavedPost } =
    usePostStoryReelHook();
  const { socket } = useSelector((state) => state.socket);

  const submitCommentOnPost = async () => {
    try {
      const res = await handleCommentOnPost(postData._id, message);
      if (!message.trim()) return;
      if (res?.success) {
        console.log(res);
        setMessage("");
      }
    } catch (error) {
      console.log("submit comment handle", error);
    }
  };

  const handleSavedPostFunction = async (postId) => {
    try {
      const res = await handleSavedPost(postId);
      if (res?.success) {
        console.log(res);
      }
    } catch (error) {
      console.log("handle Saved Post Error", error);
      throw error;
    }
  };

  // useEffect(() => {
  //   // socketIo (library) ki jagah socket (Redux state) use karein
  //   if (socket) {
  //     socket.on("newNotification", (notification) => {
  //       console.log("New Notification Received:", notification);
  //       // alert(`${notification.sender.userName} ${notification.message}`);
  //     });

  //     // Cleanup taaki multiple listeners na banein
  //     return () => {
  //       socket.off("newNotification");
  //     };
  //   }
  // }, [socket]); // socket change hone par run hoga

  return (
    <div className="w-full max-w-[480px] rounded-[24px] bg-white p-3 shadow-[0px_10px_30px_rgba(0,0,0,0.1)] sm:rounded-[35px] sm:p-[15px] flex flex-col gap-3">
      {/* Header: User Profile & Follow */}
      <div className="flex w-full items-center justify-between gap-3 px-1">
        <div
          className="flex min-w-0 items-center gap-2.5 sm:gap-3"
          onClick={() => navigate(`/profile/${postData?.author?.userName}`)}
        >
          <img
            src={postData.author?.profileImage || dp}
            className="h-[40px] w-[40px] rounded-full border-2 border-pink-500 object-cover p-[2px] sm:h-[45px] sm:w-[45px]"
            alt="profile"
          />
          <span className="truncate text-[14px] font-bold sm:text-[15px]">
            {postData.author?.userName || "user"}
          </span>
        </div>
        {/* <button className="shrink-0 rounded-full bg-black px-3 py-1.5 text-[12px] font-semibold text-white transition-all hover:opacity-80 sm:px-5 sm:text-[13px]">
          Follow
        </button> */}
        {userData._id != postData.author?._id && (
          <FollowButton
            tailwind={
              "px-[10px] w-[100px] py-[5px] h-[40px] bg-[black] rounded-2xl text-white"
            }
            targetUserId={postData.author?._id}
          />
        )}
      </div>

      {/* Media Section: The "Card" Look */}
      <div className="flex w-full items-center justify-center overflow-hidden rounded-[22px] bg-gray-50 sm:rounded-[30px]">
        {postData.mediaType === "video" ? (
          <VideoPlayer media={postData.media} />
        ) : (
          <img
            src={postData.media}
            className="w-full max-h-[420px] object-contain sm:max-h-[600px]"
            alt="post content"
          />
        )}
      </div>

      {/* Interactions & Caption */}
      <div className="flex flex-col gap-2 px-1">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <div
              className="flex cursor-pointer items-center gap-1.5"
              onClick={() => handleFetchPostLike(postData._id)}
            >
              {!postData?.likes?.includes(userData?._id) && (
                <GoHeart className="text-[22px] cursor-pointer sm:text-[24px]" />
              )}
              {postData?.likes?.includes(userData?._id) && (
                <GoHeartFill className="text-[22px] text-red-500 sm:text-[24px]" />
              )}
              <span className="text-[13px] font-medium sm:text-[14px]">
                {postData?.likes?.length}
              </span>
            </div>
            <div className="flex cursor-pointer items-center gap-1.5">
              <GoComment
                className="text-[22px] sm:text-[24px]"
                onClick={() => setShowComment((prev) => !prev)}
              />
              <span className="text-[13px] font-medium sm:text-[14px]">
                {postData?.comments?.length}
              </span>
            </div>
          </div>
          <div onClick={() => handleSavedPostFunction(postData._id)}>
            {!userData?.saved?.some(
              (p) => p._id?.toString() === postData?._id?.toString(),
            ) && (
              <GoBookmark className="cursor-pointer text-[22px] sm:text-[24px]" />
            )}
            {userData?.saved?.some(
              (p) => p._id?.toString() === postData?._id?.toString(),
            ) && (
              <GoBookmarkFill className="cursor-pointer text-[22px] sm:text-[24px]" />
            )}
          </div>
        </div>

        {/* Caption */}
        {postData.caption && postData.caption !== "undefined" && (
          <div className="mt-1 text-[13px] leading-6 sm:text-[14px]">
            <span className="mr-2 font-bold">{postData.author?.userName}</span>
            <span className="text-gray-700">
              {postData.caption || "No caption provided"}
            </span>
          </div>
        )}
      </div>

      {showComment && (
        <div className="w-full flex flex-col gap-[30px] pb-[20px]">
          <div className="w-full h-[80px] flex items-center justify-between px-[20px] relative">
            <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
              <img
                src={userData?.profileImage || dp}
                alt=""
                className="w-full object-cover"
              />
            </div>
            <input
              type="text"
              className="px-[10px] border-b-2 border-b-gray-500 w-[90%] outline-none h-[40%]"
              placeholder="Write a comment"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="absolute right-[20px]">
              <IoSendSharp
                className="h-[20px] w-[20px]"
                onClick={() => submitCommentOnPost(postData._id)}
              />
            </button>
          </div>
          <div className="w-full max-h-[300px] overflow-auto">
            {postData.comments?.map((comment) => (
              <div
                key={comment._id}
                className="flex items-start gap-3 px-[20px] py-2"
              >
                <img
                  src={userData?.profileImage || ""}
                  alt=""
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{comment.author?.userName}</p>
                  <p>{comment.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
