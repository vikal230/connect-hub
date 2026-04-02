import React, { useEffect, useState } from "react";
import dp from "../assets/dp.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { usePostStoryReelHook } from "../hooks/usePostStoryReelHook";
import VideoPlayer from "./VideoPlayer";
import { PiEyeClosed } from "react-icons/pi";
// import { useParams } from "react-router-dom";

const StoryCard = () => {
  const { handleAllstory } = usePostStoryReelHook();
  const [showViewers, setShowViewers] = useState(false);
  // const { handleGetCurrentUser } = useAuth();
  const [progress, SetProgress] = useState(0);
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { storyData } = useSelector((state) => state.story);
  const { storyList } = useSelector((state) => state.story);

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
  console.log("current story", currentStory);
  if (!currentStory) {
    return <div className="text-white">No Story Found</div>;
  }

  return (
    <div className="w-full max-w-[500px] h-[100vh] border-x-2 border-gray-800 pt-[10px] relative flex flex-col justify-center">
      <div className="flex items-center gap-[10px] absolute top-[30px] px-[10px]">
        <MdOutlineKeyboardBackspace
          className="text-white cursor-pointer w-[25px] h-[25px] "
          onClick={() => navigate("/")}
        />
        <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
          <img
            src={currentStory?.author?.profileImage || dp}
            alt=""
            className="w-full object-cover"
          />
        </div>

        <div className="w-[120px] font-semibold truncate text-white ">
          {currentStory?.author?.userName}
        </div>
      </div>
      <div className="absolute top-[10px] w-full h-[4px] bg-gray-900">
        <div
          className="h-full w-[200px] bg-white transition-all duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {!showViewers && (
        <>
          <div className="w-full h-[90vh] flex items-center justify-center">
            {currentStory.mediaType == "image" && (
              <div className="w-[90%] flex items-center justify-center ">
                <img
                  src={currentStory?.media}
                  alt=""
                  className="w-[80%] rounded-2xl object-cover"
                />
              </div>
            )}

            {currentStory.mediaType == "video" && (
              <div className="w-[80%] flex flex-col items-center justify-center ">
                <VideoPlayer media={currentStory?.media} />
              </div>
            )}
          </div>

          {currentStory?.author?.userName == userData?.userName && (
            <>
              {" "}
              <div className="absolute w-full h-[70px] p-2 left-0 bottom-0 flex items-center gap-2"  onClick={() => setShowViewers(true)}>
                <div className="text-white flex items-center gap-[5px] cursor-pointer">
                  <PiEyeClosed />
                  {currentStory?.viewers?.length}
                </div>
                <div className="flex relative w-[60px] h-[40px]">
                  {currentStory?.viewers?.slice(0, 3).map((viewer, index) => (
                    <div
                      key={viewer?._id || index}
                      className="w-[30px] h-[30px] border-2 border-black rounded-full cursor-pointer overflow-hidden z-30 absolute"
                      style={{ left: `${index * 9}px` }}
                    >
                      <img
                        src={viewer?.profileImage || dp}
                        alt={viewer?.userName || "viewer"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}

      {showViewers && (
        <>
          <div className="w-full h-[50%] flex items-center justify-center p-20 overflow-hidden" onClick={() => setShowViewers(false)}>
            {currentStory.mediaType == "image" && (
              <div className="h-full flex items-center justify-center ">
                <img
                  src={currentStory?.media}
                  alt=""
                  className="h-full rounded-2xl object-cover"
                />
              </div>
            )}
            {currentStory.mediaType == "video" && (
              <div className="h-[full] flex flex-col items-center justify-center ">
                <VideoPlayer media={currentStory?.media} />
              </div>
            )}
          </div>

          <div className="w-full h-[70%] border-t-2 border-t-gray-800 p-[20px]">
            <div className="text-white flex items-center gap-1">
              <PiEyeClosed />
              <span>{currentStory?.viewers?.length}</span>
              <span>Viewers</span>
            </div>
            <div className="w-full max-h-full flex flex-col gap-[10px] overflow-auto pt-[20px]">
              {currentStory?.viewers?.map((viewer, index) => (
                <div className="w-full flex items-center gap-[10px]">
                  <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                    <img
                      src={viewer?.profileImage || dp}
                      alt=""
                      className="w-full object-cover"
                    />
                  </div>

                  <div className="w-[120px] font-semibold truncate text-white ">
                    {viewer?.userName}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StoryCard;
