import React, { useState } from "react";
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
import { IoSendSharp } from "react-icons/io5";
import { usePostStoryReelHook } from "../hooks/usePostStoryReelHook";
import FollowButton from "./FollowButton";
import { useNavigate } from "react-router-dom";

const Post = ({ postData }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showComment, setShowComment] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const { handleFetchPostLike, handleCommentOnPost, handleSavedPost } =
    usePostStoryReelHook();

  const submitCommentOnPost = async () => {
    if (!message.trim()) return;
    try {
      const res = await handleCommentOnPost(postData._id, message);
      if (res?.success) {
        setMessage("");
      }
    } catch (error) {
      console.log("submit comment handle", error);
    }
  };

  const handleSavedPostFunction = async (postId) => {
    try {
      await handleSavedPost(postId);
    } catch (error) {
      console.log("handle Saved Post Error", error);
    }
  };

  return (
    <div className="w-full max-w-[480px] rounded-[32px] bg-white border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-3 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] mb-4">
      
      {/* Header: User Profile & Follow */}
      <div className="flex w-full items-center justify-between gap-3 p-4 pb-1">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate(`/profile/${postData?.author?.userName}`)}
        >
          <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
            <img
              src={postData.author?.profileImage || dp}
              className="h-10 w-10 rounded-full border-2 border-white object-cover"
              alt="profile"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-black tracking-tight font-semibold transition-colors">
              {postData.author?.userName || "user"}
            </span>
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{postData.author?.name}</span>
          </div>
        </div>
        
        {userData?._id !== postData.author?._id && (
          <FollowButton
            tailwind="px-4 py-1.5 bg-black text-white text-[12px] font-bold rounded-full hover:bg-zinc-800 transition-all active:scale-95"
            targetUserId={postData.author?._id}
          />
        )}
      </div>

      {/* Media Section */}
      <div className="w-full px-2 overflow-hidden">
        <div className="w-full rounded-[24px] overflow-hidden bg-zinc-50 border border-zinc-100">
          {postData.mediaType === "video" ? (
            <VideoPlayer media={postData.media} />
          ) : (
            <img
              src={postData.media}
              className="w-full max-h-[500px] object-cover"
              alt="post content"
            />
          )}
        </div>
      </div>

      {/* Interactions & Caption */}
      <div className="flex flex-col gap-3 p-4 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            {/* Like */}
            <div
              className="flex items-center gap-1.5 cursor-pointer group"
              onClick={() => handleFetchPostLike(postData._id)}
            >
              {postData?.likes?.includes(userData?._id) ? (
                <GoHeartFill className="text-[26px] text-red-500 animate-in zoom-in duration-300" />
              ) : (
                <GoHeart className="text-[26px] text-zinc-800 group-hover:text-red-500 transition-colors" />
              )}
              <span className="text-[13px] font-bold text-zinc-700">
                {postData?.likes?.length}
              </span>
            </div>
            
            {/* Comment Icon */}
            <div 
              className="flex items-center gap-1.5 cursor-pointer group"
              onClick={() => setShowComment((prev) => !prev)}
            >
              <GoComment className="text-[25px] text-zinc-800 group-hover:text-sky-500 transition-colors" />
              <span className="text-[13px] font-bold text-zinc-700">
                {postData?.comments?.length}
              </span>
            </div>
          </div>

          {/* Bookmark */}
          <div onClick={() => handleSavedPostFunction(postData._id)} className="cursor-pointer group">
            {userData?.saved?.some((p) => p._id?.toString() === postData?._id?.toString()) ? (
              <GoBookmarkFill className="text-[25px] text-zinc-800 animate-in fade-in duration-300" />
            ) : (
              <GoBookmark className="text-[25px] text-zinc-800 group-hover:text-zinc-500 transition-colors" />
            )}
          </div>
        </div>

        {/* Caption */}
        {postData.caption && postData.caption !== "undefined" && (
          <div className="text-[14px] leading-relaxed">
            <span className="font-black mr-2 tracking-tight">{postData.author?.userName}</span>
            <span className="text-zinc-600 font-medium italic">
              {postData.caption}
            </span>
          </div>
        )}

        {/* Comments Section */}
        {showComment && (
          <div className="mt-4 border-t border-zinc-100 pt-4 animate-in slide-in-from-top-2 duration-300">
            {/* Comment Input */}
            <div className="flex items-center gap-3 mb-4 bg-zinc-50 p-2 rounded-2xl border border-zinc-100">
              <img
                src={userData?.profileImage || dp}
                className="w-8 h-8 rounded-full object-cover shadow-sm"
                alt="user"
              />
              <input
                type="text"
                className="flex-1 bg-transparent outline-none text-[13px] font-medium"
                placeholder="Add a comment..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && submitCommentOnPost()}
              />
              <button 
                onClick={submitCommentOnPost}
                className={`${!message.trim() ? "text-zinc-300" : "text-sky-500"} transition-colors`}
              >
                <IoSendSharp className="h-5 w-5" />
              </button>
            </div>

            {/* Comments List */}
            <div className="max-h-[200px] overflow-y-auto no-scrollbar flex flex-col gap-4">
              {postData.comments?.map((comment) => (
                <div key={comment._id} className="flex gap-3 px-1">
                  <img
                    src={comment.author?.profileImage || dp}
                    className="w-7 h-7 rounded-full object-cover mt-0.5"
                    alt="avatar"
                  />
                  <div className="flex flex-col bg-zinc-50/50 p-2 px-3 rounded-2xl border border-zinc-100/50">
                    <p className="text-[12px] font-black tracking-tight">{comment.author?.userName}</p>
                    <p className="text-[13px] text-zinc-600 leading-snug">{comment.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;