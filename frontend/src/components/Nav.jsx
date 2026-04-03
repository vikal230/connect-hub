import React from "react";
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { GoVideo } from "react-icons/go";
import dp from "../assets/dp.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div
      className="w-[92%] lg:w-[450px] h-[70px] bg-zinc-900/90 backdrop-blur-lg flex 
      justify-around items-center fixed bottom-[20px] rounded-[30px] 
      border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-[100] px-2 transition-all duration-300"
    >
      {/* Home Icon */}
      <div className="p-3 hover:bg-zinc-800 rounded-2xl transition-all cursor-pointer active:scale-90" onClick={() => navigate("/")}>
        <IoMdHome className="text-zinc-100 w-[26px] h-[26px]" />
      </div>

      {/* Search Icon */}
      <div className="p-3 hover:bg-zinc-800 rounded-2xl transition-all cursor-pointer active:scale-90" onClick={() => navigate("/search")}>
        <FaSearch className="text-zinc-100 w-[22px] h-[22px]" />
      </div>

      {/* Upload/Plus Icon */}
      <div 
        className="p-3 bg-zinc-100 hover:bg-white rounded-2xl transition-all cursor-pointer shadow-lg active:scale-90 group" 
        onClick={() => navigate("/upload")}
      >
        <GoPlus className="text-black w-[28px] h-[28px] group-hover:scale-110 transition-transform" />
      </div>

      {/* Reels Icon */}
      <div className="p-3 hover:bg-zinc-800 rounded-2xl transition-all cursor-pointer active:scale-90" onClick={() => navigate("/reels")}>
        <GoVideo className="text-zinc-100 w-[24px] h-[24px]" />
      </div>

      {/* Profile Image Section */}
      <div 
        className="w-[45px] h-[45px] rounded-2xl border-2 border-zinc-800 hover:border-zinc-100 transition-all cursor-pointer overflow-hidden active:scale-90 shadow-md"
        onClick={() => navigate(`/profile/${userData?.userName}`)}
      >
        <img
          src={userData?.profileImage || dp}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Nav;