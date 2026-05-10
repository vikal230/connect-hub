import React from "react";
import dp from "../assets/dp.png";
import { useNavigate } from "react-router-dom";
import FollowButton from "./FollowButton";

const OtherUser = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-between py-3 group transition-all duration-300">
      {/* User Info Section */}
      <div className="flex items-center gap-3">
        {/* Profile Image */}
        <div
          className="w-11 h-11 rounded-full p-[2px] bg-zinc-800 group-hover:bg-zinc-700 transition-colors cursor-pointer overflow-hidden shadow-lg"
          onClick={() => navigate(`/profile/${user.userName}`)}
        >
          <img
            src={user.profileImage || dp}
            alt={user.userName}
            className="w-full h-full object-cover rounded-full border-2 border-[#0b0b0b]"
          />
        </div>

        {/* Text Details */}
        <div className="flex flex-col">
          <div 
            className="text-[14px] text-zinc-100 font-bold tracking-tight cursor-pointer hover:text-sky-400 transition-colors"
            onClick={() => navigate(`/profile/${user.userName}`)}
          >
            {user.userName}
          </div>
          <div className="text-[11px] text-zinc-500 font-bold uppercase tracking-tighter">
            {user.name}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <FollowButton 
        tailwind="px-4 py-1.5 bg-black text-white text-[12px] font-bold rounded-full hover:bg-zinc-800 transition-all active:scale-95" 
        targetUserId={user._id}
      />
    </div>
  );
};

export default OtherUser;
