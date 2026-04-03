import React, { useEffect } from "react";
import dp from "../assets/dp.png";
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { usePostStoryReelHook } from "../hooks/usePostStoryReelHook";

const StoryDp = ({ profileImage, userName, story }) => {
  const { handleViewStory } = usePostStoryReelHook();
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  
  const hasStory = Array.isArray(story) ? story.length > 0 : Boolean(story);
  const [viewed, setViewed] = React.useState(false);

  const currentStoryObj = Array.isArray(story) ? story[0] : story;

  useEffect(() => {
    const isUserViewed = currentStoryObj?.viewers?.some((viewer) => {
      const viewerId = viewer?._id || viewer;
      return String(viewerId) === String(userData?._id);
    });

    setViewed(!!isUserViewed);
  }, [currentStoryObj, userData]);

  const handleStoryClick = () => {
    if (userName === "Your Story" && !hasStory) {
      navigate("/upload");
    } else {
      const storyId = Array.isArray(story) ? story[0]?._id : story?._id;
      handleViewStory(storyId);
      const targetUser = userName === "Your Story" ? userData?.userName : userName;
      navigate(`/story/${targetUser}`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 min-w-[85px] group">
      {/* Outer Ring Container */}
      <div
        className={`relative w-[78px] h-[78px] rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 active:scale-90
          ${!hasStory 
            ? "border-2 border-zinc-800" 
            : viewed 
              ? "p-[2.5px] bg-zinc-800" 
              : "p-[2.5px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 animate-gradient-slow shadow-[0_0_15px_rgba(239,68,68,0.3)]"
          }`}
        onClick={handleStoryClick}
      >
        {/* Inner Profile Container */}
        <div className={`w-full h-full rounded-full border-[2.5px] border-black overflow-hidden bg-zinc-900`}>
          <img
            src={profileImage || dp}
            alt={userName}
            className={`w-full h-full object-cover transition-transform duration-500 ${!viewed && hasStory ? "group-hover:scale-110" : ""}`}
          />
        </div>

        {/* Add Story Plus Icon */}
        {!hasStory && userName === "Your Story" && (
          <div className="absolute bottom-0 right-0 bg-black rounded-full p-[1px]">
            <FiPlusCircle className="text-white bg-sky-500 rounded-full w-[22px] h-[22px] border-2 border-black" />
          </div>
        )}
      </div>

      {/* User Name Label */}
      <span className={`text-[11px] text-center truncate w-full px-1 font-semibold tracking-tight
        ${userName === "Your Story" ? "text-zinc-400" : "text-zinc-100"}`}>
        {userName}
      </span>
    </div>
  );
};

export default StoryDp;