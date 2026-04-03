import React, { useEffect, useState, useRef } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import dp from "../assets/dp.png";
import FollowButton from "./FollowButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoHeart, GoComment, GoHeartFill } from "react-icons/go";
import { usePostStoryReelHook } from "../hooks/usePostStoryReelHook";
import { IoSendSharp } from "react-icons/io5";

const ReelCard = ({ reel }) => {
  const { handleFetchReelLike, handleCommentOnReel } = usePostStoryReelHook();
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef();
  const commentRef = useRef();
  const [ismuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const [showHeart, setShowHeart] = useState(false);
  const [showComment, SetShowComment] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");

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
    };
    if (showComment) document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, [showComment]);

  const submitCommentOnReel = async () => {
    if (!message.trim()) return;
    try {
      await handleCommentOnReel(reel._id, message);
      setMessage("");
    } catch (error) { console.log(error); }
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative bg-black overflow-hidden group">
      {/* Video Content */}
      <video
        ref={videoRef}
        loop
        muted={ismuted}
        src={reel?.media}
        className="w-full h-full object-cover sm:object-contain bg-black"
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
        className="absolute top-[80px] right-6 z-[100] p-2 bg-black/30 backdrop-blur-md rounded-full cursor-pointer hover:bg-black/50 transition-all border border-white/10"
        onClick={() => setIsMuted((prev) => !prev)}
      >
        {ismuted ? <FiVolumeX className="text-white w-5 h-5" /> : <FiVolume2 className="text-white w-5 h-5" />}
      </div>

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
          <FollowButton 
            targetUserId={reel.author?._id} 
            tailwind="px-4 py-1.5 bg-zinc-100 hover:bg-white text-black font-black text-xs rounded-full transition-all active:scale-95 shadow-lg"
          />
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