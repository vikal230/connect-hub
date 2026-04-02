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
      className="w-[90%] lg:w-[40%] h-[80px] bg-black flex
justify-around items-center fixed bottom-[20px] rounded-full
shadow-2xl shadow-[#000000] z-[100]"
    >
      <div>
        <IoMdHome className="text-white cursor-pointer w-[25px] h-[25px]" onClick={() => navigate("/")} />
      </div>
      <div>
        <FaSearch className="text-white w-[25px] cursor-pointer h-[25px]" onClick={()=> navigate("/search")}/>
      </div>
      <div>
        <GoPlus className="text-white w-[25px] cursor-pointer h-[25px]" onClick={() => navigate("/upload")}/>
      </div>
      <div>
        <GoVideo className="text-white w-[25px] cursor-pointer h-[25px]" onClick={() => navigate("/reels")}/>
      </div>
      <div className="w-[50px] h-[50px] ml-4 border-2 border-black rounded-full cursor-pointer overflow-hidden">
        <img
          src={userData?.profileImage || dp}
          alt=""
          className="w-full object-cover"
          onClick={() => navigate(`/profile/${userData.userName}`)}
        />
      </div>
    </div>
  );
};

export default Nav;
