import React, { useEffect } from "react";
import dp from "../assets/dp.png";
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { usePostStoryReelHook } from "../hooks/usePostStoryReelHook";

const StoryDp = ({ profileImage, userName, story }) => {
  const { handleViewStory } = usePostStoryReelHook();
  const { userData } = useSelector((state) => state.user);
  const { storyData } = useSelector((state) => state.story);
  const { storyList } = useSelector((state) => state.story);
  const navigate = useNavigate();
  const hasStory = Array.isArray(story) ? story.length > 0 : Boolean(story);
  const [viewed, setViewed] = React.useState(false);
  // const handleStoryClick = () => {
  //   if (!story && userName == 'Your Story') {
  //     navigate("/upload")
  //   } else if (story && userName == "Your Story") {
  //     navigate(`/story/${userData?.userName}`)
  //   } else if (story && userName) {
  //     navigate(`/story/${userName}`)
  //   }
  // }

  const currentStoryObj = Array.isArray(story) ? story[0] : story;
  useEffect(() => {
    const isUserViewed = currentStoryObj?.viewers?.some((viewer) => {
      // Step 1: Handle both cases (if viewer is an object or just a string ID)
      const viewerId = viewer?._id || viewer;

      // Step 2: Convert both to String to guarantee a match
      return String(viewerId) === String(userData?._id);
    });

    if (isUserViewed) {
      setViewed(true);
    } else {
      setViewed(false);
    }
  }, [currentStoryObj, userData]);
  const handleStoryClick = () => {
    if (userName === "Your Story" && !hasStory) {
      navigate("/upload");
    } else if (userName === "Your Story" && hasStory) {
      handleViewStory(Array.isArray(story) ? story[0]?._id : story?._id);
      navigate(`/story/${userData?.userName}`);
    } else if (userName !== "Your Story") {
      handleViewStory(Array.isArray(story) ? story[0]?._id : story?._id);
      navigate(`/story/${userName}`);
    }
  };

  return (
    <div className="flex flex-col w-[80px]">
      <div
        className={`relative w-[80px] h-[80px] ${!hasStory ? null : !viewed ? "bg-gradient-to-b from-blue-500 to-blue-900" : "bg-gradient-to-r from-gray-500 to-black"} rounded-full flex justify-center items-center`}
        onClick={handleStoryClick}
      >
        <div className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
          <img
            src={profileImage || dp}
            alt=""
            className="w-full object-cover"
          />
          {!hasStory && userName == "Your Story" && (
            <div>
              <FiPlusCircle className="text-black absolute bottom-[8px] bg-white right-[10px] rounded-full w-[22px] h-[22px] z-10" />
            </div>
          )}
        </div>
      </div>
      <div className="text-[14px] text-center truncate w-full text-white">
        {userName}
      </div>
    </div>
  );
};

export default StoryDp;
