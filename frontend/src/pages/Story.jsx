import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostStoryReelHook } from "../hooks/usePostStoryReelHook";
import StoryCard from "../components/StoryCard";

const Story = () => {
   const { userName } = useParams();
  const { handleStoryByUserName } = usePostStoryReelHook();
// console.log("story route userName", userName);

  useEffect(() => {
    if (userName) {
      handleStoryByUserName(userName);
    }
  }, [userName]);

//   useEffect(() => {
//   const fetchStory = async () => {
//     if (userName) {
//       await handleStoryByUserName(userName);
//     }
//   };
//   fetchStory();
// }, [userName]);

  return (
  <div className="w-full h-[100vh] bg-black flex justify-center items-center"><StoryCard /></div>

  )}

export default Story;
