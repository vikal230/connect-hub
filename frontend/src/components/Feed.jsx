import React from "react";
import logo from "../assets/react.svg";
import { GoHeart } from "react-icons/go";
import StoryDp from "./StoryDp";
import Nav from "./Nav";
import { FiMessageCircle } from "react-icons/fi";
import Post from "../components/Post";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Feed = () => {
  const { markAllUnreadAsRead } = useAuth();
  const { postData } = useSelector((state) => state.post);
  const { userData } = useSelector((state) => state.user);
  const { storyList } = useSelector((state) => state.story);
  const { currentUserStory } = useSelector((state) => state.story);
  const { notificationData } = useSelector((state) => state.notification);

  const navigation = useNavigate();
  // console.log("story list in feed", storyList);

  const handleNotificationClick = async () => {
    markAllUnreadAsRead();
    navigation("/notificationpage")
    console.log("notification clicked");
  };
  return (
    <div className="lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto">
      <div className="w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden">
        <img
          src={logo}
          alt="vite logo bad me change hoga!"
          className="w-[40px]"
        />
        <div className="items-center flex gap-[10px]">
          <div className="relative">
            <GoHeart
              className="text-white w-[25px] h-[25px]"
              onClick={handleNotificationClick}
            />
            {notificationData?.length > 0 &&
              notificationData.some((noti) => noti.isRead === false) && (
                <div className="w-[10px] h-[10px] bg-blue-600 rounded-full absolute top-0 right-0"></div>
              )}
          </div>
          <FiMessageCircle
            className="text-white w-[25px] h-[25px]"
            onClick={() => navigation("/messages")}
          />
        </div>
      </div>
      <div className="flex w-full overflow-auto gap-[10px] items-center p-[20px]">
        <StoryDp
          userName={"Your Story"}
          profileImage={userData?.profileImage}
          story={currentUserStory}
        />
        {storyList?.map((story, index) => (
          <StoryDp
            key={story._id || index}
            userName={story?.author?.userName}
            profileImage={story?.author?.profileImage}
            story={story}
          />
        ))}
      </div>

      <div
        className="w-full min-h-[100vh] flex flex-col items-center
gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative
pb-[120px]"
      >
        <Nav />

        {postData?.map((post, index) => (
          <Post key={post?._id || index} index={index} postData={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
