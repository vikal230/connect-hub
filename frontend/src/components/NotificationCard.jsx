import React from "react";
import { useNavigate } from "react-router-dom";
import dp from "../assets/dp.png";

const NotificationCard = ({ noti }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-between items-center min-h-[50px] h-[50px] p-[5px] bg-gray-800 rounded-full">
      <div className="flex gap-[5px] items-center">
        <div
          className="w-[40px] h-[40px] border-2 border-black
          rounded-full cursor-pointer overflow-hidden"
          onClick={() => navigate(`/profile/${noti.sender?.userName}`)}
        >
          <img
            src={noti.sender?.profileImage || dp}
            alt=""
            className="w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-white text-[16px] font-semibold">
            {noti.sender?.userName}
          </h1>
          <div className="text-gray-500 text-[12px]">{noti.message}</div>
        </div>
      </div>
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden object-cover cursor-pointer border-2 border-black">
        {noti.reel ? (
          <video
            src={noti.reel?.media}
            muted
            loop
            autoPlay
            className="w-full"
          />
        ) : noti.post?.mediaType === "image" ? (
          <img src={noti.post?.media} alt="" className="w-full" />
        ) : noti.post ? (
          <video src={noti.post?.media} />
        ) : null}
      </div>
    </div>
  );
};

export default NotificationCard;
