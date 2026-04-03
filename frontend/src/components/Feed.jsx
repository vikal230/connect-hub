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

  const handleNotificationClick = async () => {
    markAllUnreadAsRead();
    navigation("/notificationpage");
  };

  return (
    <div className="lg:w-[50%] w-full bg-[#000] min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto no-scrollbar">
      {/* Mobile Header */}
      <div className="w-full h-[70px] flex items-center justify-between px-6 lg:hidden bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <img src={logo} alt="logo" className="w-[30px]" />
        <div className="items-center flex gap-5">
          <div className="relative cursor-pointer" onClick={handleNotificationClick}>
            <GoHeart className="text-white w-6 h-6" />
            {notificationData?.some((noti) => !noti.isRead) && (
              <div className="w-2 h-2 bg-sky-500 rounded-full absolute top-0 right-0 border border-black shadow-lg"></div>
            )}
          </div>
          <FiMessageCircle
            className="text-white w-6 h-6"
            onClick={() => navigation("/messages")}
          />
        </div>
      </div>

      {/* Stories */}
      <div className="flex w-full overflow-x-auto no-scrollbar gap-4 items-center px-6 py-6 bg-black">
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

      {/* Main Posts Container */}
      <div className="w-full min-h-[100vh] flex flex-col items-center gap-6 p-4 pt-10 bg-[#fafafa] rounded-t-[45px] shadow-[0_-15px_40px_rgba(255,255,255,0.03)] relative pb-[120px]">
        <div className="sticky top-4 z-40 w-full flex justify-center">
            <Nav />
        </div>

        <div className="w-full max-w-[500px] flex flex-col gap-10">
            {postData?.map((post, index) => (
              <Post key={post?._id || index} index={index} postData={post} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;