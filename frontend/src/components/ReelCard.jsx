import React, { useEffect, useState, useRef } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import dp from "../assets/dp.png";
import FollowButton from "./FollowButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoHeart, GoComment, GoHeartFill } from "react-icons/go";
import { usePostStoryReelHook } from "../hooks/usePostStoryReelHook";
import { IoSendSharp } from "react-icons/io5";

const ReelCard = ({ reel, isFeedView = false }) => {
  const { handleFetchReelLike, handleCommentOnReel, handleDeleteReel } = usePostStoryReelHook();
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef();
  const commentRef = useRef();
  const deleteMenuRef = useRef();
  const [ismuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const [showHeart, setShowHeart] = useState(false);
  const [showComment, SetShowComment] = useState(false);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const isCurrentUserReel =
    String(userData?._id || "") === String(reel?.author?._id || "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play();
            setIsPlaying(true);
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.6 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => { if (videoRef.current) observer.unobserve(videoRef.current); };
  }, []);

  const handleDoubleclickOnReelLike = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1200);
    if (!reel.likes?.includes(userData?._id)) {
      handleFetchReelLike(reel._id);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percent);
    }
  };

  const handleClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (commentRef.current && !commentRef.current.contains(e.target)) SetShowComment(false);
      if (deleteMenuRef.current && !deleteMenuRef.current.contains(e.target)) setShowDeleteMenu(false);
    };
    if (showComment) document.addEventListener("mousedown", handleClickOutSide);
    if (showDeleteMenu) document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, [showComment, showDeleteMenu]);

  const submitCommentOnReel = async () => {
    if (!message.trim()) return;
    try {
      await handleCommentOnReel(reel._id, message);
      setMessage("");
    } catch (error) { console.log(error); }
  };

  const handleDeleteReelFunction = async () => {
    try {
      await handleDeleteReel(reel._id);
      setShowDeleteMenu(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`w-full relative overflow-hidden group ${
        isFeedView
          ? "bg-white rounded-[32px] border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-3 p-4"
          : "h-full flex items-center justify-center bg-black"
      }`}
    >
      {isFeedView && (
        <div className="flex w-full items-center justify-between gap-3 pb-1">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate(`/profile/${reel.author?.userName}`)}
          >
            <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
              <img
                src={reel.author?.profileImage || dp}
                className="h-10 w-10 rounded-full border-2 border-white object-cover"
                alt="profile"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-black tracking-tight font-semibold transition-colors">
                {reel.author?.userName || "user"}
              </span>
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                {reel.author?.name}
              </span>
            </div>
          </div>

          {userData?._id !== reel.author?._id && (
            <FollowButton
              targetUserId={reel.author?._id}
              tailwind="px-4 py-1.5 bg-black text-white text-[12px] font-bold rounded-full hover:bg-zinc-800 transition-all active:scale-95"
            />
          )}
        </div>
      )}

      {/* Video Content */}
      <div
        className={`relative overflow-hidden ${
          isFeedView
            ? "w-full rounded-[24px] bg-zinc-50 border border-zinc-100"
            : "w-full h-full"
        }`}
      >
        <video
          ref={videoRef}
          loop
          muted={ismuted}
          src={reel?.media}
          className={`bg-black ${
            isFeedView
              ? "w-full h-auto max-h-[650px] object-contain"
              : "w-full h-full object-cover sm:object-contain"
          }`}
          onClick={handleClick}
          onTimeUpdate={handleTimeUpdate}
          onDoubleClick={handleDoubleclickOnReelLike}
        />

        {/* Double Tap Heart Animation */}
        {showHeart && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[110] animate-ping">
            <GoHeartFill className="w-[120px] h-[120px] text-white/90 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
          </div>
        )}

        {/* Mute/Unmute Icon Overlay */}
        <div 
          className={`absolute z-[100] bg-black/30 backdrop-blur-md rounded-full cursor-pointer hover:bg-black/50 transition-all border border-white/10 ${
            isFeedView
              ? "top-4 right-4 p-1.5"
              : "top-[80px] right-6 p-2"
          }`}
          onClick={() => setIsMuted((prev) => !prev)}
        >
          {ismuted ? (
            <FiVolumeX className={`${isFeedView ? "w-4 h-4" : "w-5 h-5"} text-white`} />
          ) : (
            <FiVolume2 className={`${isFeedView ? "w-4 h-4" : "w-5 h-5"} text-white`} />
          )}
        </div>

        {!isFeedView && (
          <>
            {/* Side Action Buttons (Like, Comment) */}
            <div className="absolute right-3 bottom-[180px] z-[100] flex flex-col gap-6 items-center">
              <div className="flex flex-col items-center group/btn" onClick={() => handleFetchReelLike(reel._id)}>
                <div className="p-3 bg-black/20 backdrop-blur-md rounded-full border border-white/10 hover:bg-black/40 transition-all active:scale-75">
                  {reel?.likes?.includes(userData?._id) ? (
                    <GoHeartFill className="w-7 h-7 text-red-500" />
                  ) : (
                    <GoHeart className="w-7 h-7 text-white" />
                  )}
                </div>
                <span className="text-white text-xs font-bold mt-1 shadow-sm">{reel.likes.length}</span>
              </div>

              <div className="flex flex-col items-center group/btn" onClick={() => SetShowComment(true)}>
                <div className="p-3 bg-black/20 backdrop-blur-md rounded-full border border-white/10 hover:bg-black/40 transition-all active:scale-75">
                  <GoComment className="w-7 h-7 text-white" />
                </div>
                <span className="text-white text-xs font-bold mt-1 shadow-sm">{reel.comments.length}</span>
              </div>

              {isCurrentUserReel && (
                <div ref={deleteMenuRef} className="relative flex flex-col items-center group/btn">
                  <div
                    className="p-3 bg-black/20 backdrop-blur-md rounded-full border border-white/10 hover:bg-black/40 transition-all active:scale-75 cursor-pointer"
                    onClick={() => setShowDeleteMenu((prev) => !prev)}
                  >
                    <BsThreeDots className="w-7 h-7 text-white" />
                  </div>
                  {showDeleteMenu && (
                    <button
                      className="absolute right-14 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-white border border-zinc-200 text-red-500 text-[13px] font-semibold shadow-lg hover:bg-zinc-50"
                      onClick={handleDeleteReelFunction}
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Info Overlay */}
            <div className="absolute bottom-6 left-0 w-full px-5 z-[100] flex flex-col gap-3 bg-gradient-to-t from-black/80 via-black/20 to-transparent pt-10">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full border-2 border-white/80 p-[2px] cursor-pointer active:scale-90 transition-transform overflow-hidden shadow-lg"
                  onClick={() => navigate(`/profile/${reel.author?.userName}`)}
                >
                  <img src={reel.author?.profileImage || dp} className="w-full h-full object-cover rounded-full" />
                </div>
                <p className="text-white font-bold text-sm tracking-tight drop-shadow-md">
                  @{reel.author?.userName}
                </p>
                {userData?._id !== reel.author?._id && (
                  <FollowButton 
                    targetUserId={reel.author?._id} 
                    tailwind="px-4 py-1.5 bg-black text-white text-[12px] font-bold rounded-full hover:bg-zinc-800 transition-all active:scale-95"
                  />
                )}
              </div>
              <p className="text-white/90 text-sm font-medium line-clamp-2 max-w-[80%] drop-shadow-sm italic">
                {reel.caption}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 w-full h-[3px] bg-white/20 z-[110]">
              <div 
                className="h-full bg-gradient-to-r from-sky-400 to-blue-600 shadow-[0_0_10px_rgba(56,189,248,0.6)] transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </>
        )}
      </div>

      {isFeedView && (
        <div className="flex flex-col gap-3 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div
                className="flex items-center gap-1.5 cursor-pointer group"
                onClick={() => handleFetchReelLike(reel._id)}
              >
                {reel?.likes?.includes(userData?._id) ? (
                  <GoHeartFill className="text-[26px] text-red-500 animate-in zoom-in duration-300" />
                ) : (
                  <GoHeart className="text-[26px] text-zinc-800 group-hover:text-red-500 transition-colors" />
                )}
                <span className="text-[13px] font-bold text-zinc-700">
                  {reel?.likes?.length}
                </span>
              </div>

              <div
                className="flex items-center gap-1.5 cursor-pointer group"
                onClick={() => SetShowComment((prev) => !prev)}
              >
                <GoComment className="text-[25px] text-zinc-800 group-hover:text-sky-500 transition-colors" />
                <span className="text-[13px] font-bold text-zinc-700">
                  {reel?.comments?.length}
                </span>
              </div>
            </div>
            <div className="text-zinc-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z"
                />
              </svg>
            </div>
          </div>

          {reel.caption && (
            <div className="text-[14px] leading-relaxed">
              <span className="font-black mr-2 tracking-tight">{reel.author?.userName}</span>
              <span className="text-zinc-600 font-medium italic">
                {reel.caption}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Comment Section Sheet */}
      <div 
        ref={commentRef}
        className={`absolute z-[250] bottom-0 left-0 w-full h-[60%] bg-[#09090b] rounded-t-[40px] border-t border-zinc-800 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-out ${showComment ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="w-12 h-1.5 bg-zinc-700 rounded-full mx-auto mt-3 mb-6" />
        <h2 className="text-white text-lg font-black text-center mb-4 tracking-tighter">Comments</h2>

        <div className="flex-1 overflow-y-auto px-6 space-y-5 no-scrollbar pb-[100px]">
          {reel.comments.length === 0 ? (
            <div className="text-center text-zinc-500 font-bold mt-10">No comments yet. Be the first!</div>
          ) : (
            reel.comments.map((com, i) => (
              <div key={i} className="flex gap-3 animate-in fade-in duration-300">
                <img src={com.author?.profileImage || dp} className="w-9 h-9 rounded-full object-cover border border-zinc-800" />
                <div className="flex flex-col">
                  <span className="text-zinc-400 text-[12px] font-black italic">@{com.author?.userName}</span>
                  <p className="text-zinc-100 text-[14px] font-medium leading-snug">{com.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Comment Input Sticky */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-zinc-950/80 backdrop-blur-md border-t border-zinc-900">
          <div className="flex items-center gap-3 bg-zinc-900 rounded-full px-4 py-2 border border-zinc-800">
            <img src={userData?.profileImage || dp} className="w-8 h-8 rounded-full border border-zinc-700" />
            <input
              type="text"
              placeholder="Add comment..."
              className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-zinc-600"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && submitCommentOnReel()}
            />
            {message.trim() && (
              <button onClick={submitCommentOnReel} className="text-sky-500 hover:text-sky-400 transition-colors">
                <IoSendSharp className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelCard;
