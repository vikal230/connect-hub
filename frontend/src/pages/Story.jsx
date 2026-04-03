import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostStoryReelHook } from "../hooks/usePostStoryReelHook";
import StoryCard from "../components/StoryCard";

const Story = () => {
  const { userName } = useParams();
  const { handleStoryByUserName } = usePostStoryReelHook();

  useEffect(() => {
    if (userName) {
      handleStoryByUserName(userName);
    }
  }, [userName]);

  return (
    <div className="w-full h-screen bg-[#050505] flex justify-center items-center overflow-hidden">
      <StoryCard />
    </div>
  );
};

export default Story;