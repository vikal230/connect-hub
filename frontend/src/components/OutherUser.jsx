import React from "react";
import dp from "../assets/dp.png";
const OutherUser = ({ user }) => {
  return (
    <div
      className="w-full h-[80px] flex items-center
justify-between border-b-2 border-gray-800"
    >
      <div className="flex items-center gap-[10px]">
        <div
          className="w-[40px] h-[40px] border-2 border-black
    rounded-full cursor-pointer overflow-hidden"
        >
          <img
            src={user.profileImage || dp}
            alt=""
            className="w-full object-cover"
          />
        </div>
        <div>
          <div className="text-[15px] text-white font-semibold ">
            {user.userName}
          </div>
          <div
            className="text-[12px] text-gray-400 font-semibold
        "
          >
            {user.name}
          </div>
        </div>
      </div>
      <button className="px-[10px] w-[100px] py-[5px] h-[40px] bg-[blue] rounded-2xl text-white">
        Follow
      </button>
    </div>
  );
};

export default OutherUser;
