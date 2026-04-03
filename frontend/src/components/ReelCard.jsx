import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { FiVolume2 } from "react-icons/fi";
import { FiVolumeX } from "react-icons/fi";
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
        const video = videoRef.current;
        if (entry.isIntersecting) {
          video.play();
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 },
    );
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const handleDoubleclickOnReelLike = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 2000);
    if (!reel.likes?.includes(userData?._id)) {
      handleFetchReelLike(reel._id);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent);
    }
  };

  const handleClick = async () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (commentRef.current && !commentRef.current.contains(event.target)) {
        SetShowComment(false);
      }
    };

    if (showComment) {
      document.addEventListener("mousedown", handleClickOutSide);
    } else {
      document.removeEventListener("mousedown", handleClickOutSide);
    }
  }, [showComment]);

  const submitCommentOnReel = async () => {
    if (!message.trim()) return;
    try {
      const res = await handleCommentOnReel(reel._id, message);
      console.log(res);
      setMessage("");
    } catch (error) {
      console.log("submit comment handle", error);
    }
  };
  return (
    <div className="w-full lg:w-[480px] h-[100vh] flex items-center justify-center border-l-2 border-r-2 border-gray-800 overflow-hidden relative">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={ismuted}
        src={reel?.media}
        className="w-full h-full max-h-full"
        onClick={handleClick}
        onTimeUpdate={handleTimeUpdate}
        onDoubleClick={handleDoubleclickOnReelLike}
      />

      {showHeart && (
        <div
          className="absolute top-1/2 left-1/2 transform
-translate-x-1/2 -translate-y-1/2 heart-animation z-50"
        >
          <GoHeartFill
            className="w-[100px] h-[100px] text-white
    drop-shadow-2xl"
          />
        </div>
      )}

      <div
        ref={commentRef}
        className={`absolute z-[200] bottom-0 w-full h-[500px] p-[10px] rounded-t-4xl bg-[#0e1718] transform transition-transform duration-500 ease-in-out left-0 shadow-2xl shadow-black ${showComment ? "translate-y-0" : "translate-y-[100%] "}`}
      >
        <h1 className="text-white text-[20px] text-center font-semibold">
          comments
        </h1>

        <div className="w-full h-[350px] overflow-y-auto flex flex-col gap-[20px]">
          {reel.comments.length == 0 && (
            <div className="text-center text-white text-[20px] font-semibold mt-[50px]">
              No Comments Yet
            </div>
          )}

          {reel.comments?.map((com) => (
            <div className="w-full flex flex-col gap-[5px] border-b-[1px] border-gray-800 justify-center pb-[10px] mt-[10px]">
              <div className="flex justify-start items-center md:gap-[20px] gap-[10px]">
                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                  <img
                    src={com.author?.profileImage || dp}
                    alt=""
                    className="w-full object-cover"
                  />
                </div>
                <div className="w-[150px] text-white font-semibold truncate">
                  {com.author?.userName}
                </div>
              </div>
              <div className="text-white font-serif pl-[60px]">
                {com.message}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full absolute bottom-0 left-0 pb-[20px]">
          <div className="w-full h-[80px] flex items-center justify-between px-[20px] relative">
            <div className="w-[40px] h-[40px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
              <img
                src={userData?.profileImage || dp}
                alt=""
                className="w-full object-cover"
              />
            </div>
            <input
              type="text"
              className="px-[10px] border-b-2 border-b-gray-500 w-[90%] outline-none h-[40%] text-white placeholder:text-white"
              placeholder="Write a comment"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {message.trim() && (
              <button className="absolute text-white right-[20px]">
                <IoSendSharp
                  className="h-[20px] w-[20px]"
                  onClick={() => submitCommentOnReel(reel._id)}
                />
              </button>
            )}
          </div>
        </div>
      </div>
      <div
        className="absolute top-[20px] z-[100] right-[20px]"
        onClick={() => setIsMuted((prev) => !prev)}
      >
        {!ismuted ? (
          <FiVolume2 className="h-[20px] w-[20px] text-white font-semibold" />
        ) : (
          <FiVolumeX className="h-[20px] w-[20px] text-white font-semibold" />
        )}
      </div>
      <div className="absolute bottom-0 w-full h-[4px] bg-gray-900">
        <div
          className="h-full w-[200px] bg-white transition-all duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="w-full absolute h-[100px] bottom-[10px] px-[15px] flex flex-col gap-[10px]">
        <div className="flex items-center gap-[10px]">
          <div
            className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden"
            onClick={() => navigate(`/profile/${reel.author?.userName}`)}
          >
            <img
              src={reel.author?.profileImage || dp}
              alt=""
              className="w-full object-cover"
            />
          </div>
          <div className="w-[120px] text-amber-200 font-semibold truncate">
            {reel.author?.userName}
          </div>
          <FollowButton
            targetUserId={reel.author?._id}
            tailwind={
              "px-[10px] h-[35px] w-[130px] py-[5px] text-white border-2 text-[14px] rounded-2xl border-white"
            }
          />
        </div>
        <div className="text-white px-[10px]">{reel.caption}</div>
        <div className="absolute right-0 flex flex-col gap-[20px] text-white bottom-[180px] justify-center px-[10px] ">
          <div
            className="flex flex-col cursor-pointer items-center"
            onClick={() => handleFetchReelLike(reel._id)}
          >
            <div>
              {" "}
              {!reel?.likes?.includes(userData?._id) && (
                <GoHeart className="w-[25px] cursor-pointer h-[25px]" />
              )}
              {reel?.likes?.includes(userData?._id) && (
                <GoHeartFill className="w-[25px] text-red-500 h-[25px]" />
              )}
            </div>
            <div>{reel.likes.length}</div>
          </div>
          <div className="flex flex-col cursor-pointer items-center">
            <div>
              <GoComment
                className="w-[25px] cursor-pointer h-[25px]"
                onClick={() => SetShowComment(true)}
              />
            </div>
            <div>{reel.comments.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelCard;
