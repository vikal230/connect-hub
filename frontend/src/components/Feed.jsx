import React from "react";
import logo from "../assets/react.svg";
import { GoHeart } from "react-icons/go";
import StoryDp from "./StoryDp";
import Nav from "./Nav";

const Feed = () => {
  return (
    <div className="lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto">
      <div className="w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden">
        <img
          src={logo}
          alt="vite logo bad me change hoga!"
          className="w-[40px]"
        />
        <div>
          <GoHeart className="text-white w-[25px] h-[25px]" />
        </div>
      </div>
      <div className="flex w-full overflow-auto gap-[10px] items-center p-[20px]">
        <StoryDp userName={"vikal"} />
        <StoryDp userName={"vikal"} />
        <StoryDp userName={"vikal"} />
        <StoryDp userName={"vikal"} />
        <StoryDp userName={"vikal"} />
        <StoryDp userName={"vikal"} />
        <StoryDp userName={"vikal"} />
        <StoryDp userName={"vikal"} />
        <StoryDp userName={"vikal"} />
        <StoryDp userName={"vikal"} />
      </div>

      <div
        className="w-full min-h-[100vh] flex flex-col items-center
gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative
pb-[120px]"
      >
        <Nav />
      </div>
    </div>
  );
};

export default Feed;
