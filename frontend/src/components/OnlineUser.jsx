import React from "react";
import { useNavigate } from "react-router-dom";
import { setSelectedUser } from "../redux/messageSlice";
import { useDispatch } from "react-redux";
import dp from "../assets/dp.png";

const OnlineUser = ({ user, isChatList = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={`relative group ${isChatList ? "" : "shrink-0"}`}>
      {/* Avatar Container */}
      <div
        className={`${isChatList ? "w-[52px] h-[52px]" : "w-[56px] h-[56px]"} rounded-full p-[2px] bg-gradient-to-tr from-zinc-700 to-zinc-900 cursor-pointer transition-all duration-300 group-hover:scale-105 active:scale-95 shadow-lg`}
        onClick={() => {
          dispatch(setSelectedUser(user));
          navigate("/messagearea");
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-black overflow-hidden bg-zinc-900">
          <img
            src={user.profileImage || dp}
            alt={user.userName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Online Status Indicator */}
      <div className="absolute top-0.5 right-0.5 h-3 w-3">
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </div>
      
      {!isChatList && (
        <p className="text-[10px] text-zinc-400 text-center mt-1 font-bold truncate w-[56px]">
          {user.userName}
        </p>
      )}
    </div>
  );
};

export default OnlineUser;
