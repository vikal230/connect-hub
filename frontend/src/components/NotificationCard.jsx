import React from "react";
import { useNavigate } from "react-router-dom";
import dp from "../assets/dp.png";

const NotificationCard = ({ noti }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-between items-center p-3 mb-2 bg-zinc-900/40 hover:bg-zinc-800/60 border border-zinc-800/50 rounded-[20px] transition-all duration-300 group">
      <div className="flex gap-3 items-center">
        {/* Sender Profile Image */}
        <div
          className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-zinc-700 to-zinc-800 group-hover:from-sky-500 group-hover:to-blue-600 transition-all cursor-pointer overflow-hidden shadow-lg"
          onClick={() => navigate(`/profile/${noti.sender?.userName}`)}
        >
          <img
            src={noti.sender?.profileImage || dp}
            alt="sender"
            className="w-full h-full object-cover rounded-full border-2 border-[#0b0b0b]"
          />
        </div>

        {/* Message Content */}
        <div className="flex flex-col">
          <h1 
            className="text-zinc-100 text-[14px] font-bold tracking-tight cursor-pointer hover:text-sky-400 transition-colors"
            onClick={() => navigate(`/profile/${noti.sender?.userName}`)}
          >
            {noti.sender?.userName}
          </h1>
          <div className="text-zinc-500 text-[12px] font-medium leading-tight">
            {noti.message}
          </div>
        </div>
      </div>

      {/* Right Side: Media Preview (Post/Reel) */}
      {(noti.reel || noti.post) && (
        <div className="w-11 h-11 rounded-xl overflow-hidden cursor-pointer border border-zinc-800 shadow-inner bg-black active:scale-90 transition-transform">
          {noti.reel ? (
            <video
              src={noti.reel?.media}
              muted
              loop
              autoPlay
              className="w-full h-full object-cover"
            />
          ) : noti.post?.mediaType === "image" ? (
            <img 
                src={noti.post?.media} 
                alt="post preview" 
                className="w-full h-full object-cover" 
            />
          ) : noti.post ? (
            <video 
                src={noti.post?.media} 
                className="w-full h-full object-cover"
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default NotificationCard;