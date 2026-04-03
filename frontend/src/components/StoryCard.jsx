import React, { useEffect, useState } from "react";
import dp from "../assets/dp.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { usePostStoryReelHook } from "../hooks/usePostStoryReelHook";
import VideoPlayer from "./VideoPlayer";
import { PiEyeClosed, PiEye } from "react-icons/pi";

const StoryCard = () => {
  const { handleAllstory } = usePostStoryReelHook();
  const [showViewers, setShowViewers] = useState(false);
  const [progress, SetProgress] = useState(0);
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { storyData, storyList } = useSelector((state) => state.story);

  useEffect(() => {
    if (storyList?.length === 0) {
      handleAllstory();
    }
  }, [userData]);

  useEffect(() => {
    const interval = setInterval(() => {
      SetProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          navigate("/");
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [navigate]);

  const currentStory = storyData && storyData.length > 0 ? storyData[0] : null;

  if (!currentStory) {
    return (
      <div className="text-zinc-500 font-bold animate-pulse">
        No Story Found
      </div>
    );
  }

  return (
    <div className="w-full max-w-[480px] h-screen bg-black relative flex flex-col justify-center overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      
      {/* Top Progress Bar */}
      <div className="absolute top-4 w-full px-3 z-[110]">
        <div className="w-full h-[3px] bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Header Profile Overlay */}
      <div className="flex items-center gap-3 absolute top-10 w-full px-4 z-[100] bg-gradient-to-b from-black/60 to-transparent pb-10">
        <MdOutlineKeyboardBackspace
          className="text-white cursor-pointer w-7 h-7 hover:scale-110 transition-transform"
          onClick={() => navigate("/")}
        />
        <div className="w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 shadow-lg">
          <img
            src={currentStory?.author?.profileImage || dp}
            alt="profile"
            className="w-full h-full object-cover rounded-full border-2 border-black"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] font-bold text-white tracking-tight drop-shadow-md">
            {currentStory?.author?.userName}
          </span>
          <span className="text-[10px] text-zinc-300 font-medium italic">Story</span>
        </div>
      </div>

      {/* Media Content */}
      <div className="w-full h-full flex items-center justify-center bg-[#050505]">
        {!showViewers && (
          <>
            <div className="w-full h-full flex items-center justify-center">
              {currentStory.mediaType === "image" ? (
                <img
                  src={currentStory?.media}
                  alt="story-media"
                  className="w-full h-auto max-h-screen object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <VideoPlayer media={currentStory?.media} />
                </div>
              )}
            </div>

            {/* Viewer Count */}
            {currentStory?.author?.userName === userData?.userName && (
              <div 
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-[100]"
                onClick={() => setShowViewers(true)}
              >
                <div className="flex -space-x-3">
                  {currentStory?.viewers?.slice(0, 3).map((viewer, index) => (
                    <img
                      key={viewer?._id || index}
                      src={viewer?.profileImage || dp}
                      className="w-8 h-8 rounded-full border-2 border-black object-cover shadow-lg"
                    />
                  ))}
                </div>
                <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-2 hover:bg-white/20 transition-all">
                   <PiEye className="text-white w-4 h-4" />
                   <span className="text-white text-[12px] font-bold">{currentStory?.viewers?.length} Views</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Viewer Bottom Sheet List */}
      {showViewers && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[200] animate-in fade-in duration-300">
          {/* Top Preview Section */}
          <div 
            className="w-full h-[40%] flex items-center justify-center p-10"
            onClick={() => setShowViewers(false)}
          >
            <div className="h-full aspect-[9/16] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative">
              {currentStory.mediaType === "image" ? (
                <img src={currentStory?.media} className="w-full h-full object-cover" />
              ) : (
                <VideoPlayer media={currentStory?.media} />
              )}
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </div>

          {/* List Section */}
          <div className="w-full h-[60%] bg-[#0e0e0e] rounded-t-[35px] border-t border-zinc-800 p-6 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,1)]">
            <div className="w-12 h-1.5 bg-zinc-700 rounded-full mx-auto mb-6" onClick={() => setShowViewers(false)} />
            
            <div className="flex items-center gap-2 mb-6">
              <PiEyeClosed className="text-sky-500 w-5 h-5" />
              <h2 className="text-white text-lg font-black tracking-tight">
                Activity <span className="text-zinc-500 font-medium">({currentStory?.viewers?.length})</span>
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar pb-10">
              {currentStory?.viewers?.map((viewer) => (
                <div key={viewer?._id} className="flex items-center justify-between p-1">
                  <div className="flex items-center gap-3">
                    <img
                      src={viewer?.profileImage || dp}
                      className="w-11 h-11 rounded-full object-cover border border-zinc-800"
                    />
                    <div className="flex flex-col">
                      <span className="text-white text-[14px] font-bold tracking-tight">
                        {viewer?.userName}
                      </span>
                      <span className="text-zinc-500 text-[11px]">Seen just now</span>
                    </div>
                  </div>
                  <button className="bg-zinc-900 text-zinc-100 text-[12px] font-bold px-4 py-1.5 rounded-lg border border-zinc-800">
                    Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryCard;