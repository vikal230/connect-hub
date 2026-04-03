import React from "react";
import { useNavigate } from "react-router-dom";
import { setSelectedUser } from "../redux/messageSlice";
import { useDispatch } from "react-redux";
import dp from "../assets/dp.png";

const OnlineUser = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="relative group shrink-0">
      {/* Avatar Container */}
      <div
        className="w-[56px] h-[56px] rounded-full p-[2px] bg-gradient-to-tr from-sky-400 to-blue-600 
        cursor-pointer transition-all duration-300 group-hover:scale-105 active:scale-95 shadow-lg"
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
      <div className="absolute top-0 right-0 h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500 border-2 border-black shadow-[0_0_10px_rgba(56,189,248,0.8)]"></span>
      </div>
      
      <p className="text-[10px] text-zinc-400 text-center mt-1 font-bold truncate w-[56px]">
        {user.userName}
      </p>
    </div>
  );
};

export default OnlineUser;