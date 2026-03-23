import React from "react";
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { GoVideo } from "react-icons/go";
import dp from "../assets/dp.png"
const Nav = () => {
  return (
    <div
      className="w-[90%] lg:w-[40%] h-[80px] bg-black flex
justify-around items-center fixed bottom-[20px] rounded-full
shadow-2xl shadow-[#000000] z-[100]"
    >
      <div><IoMdHome className="text-white w-[25px] h-[25px]"/></div>
      <div><FaSearch className="text-white w-[25px] h-[25px]"/></div>
      <div><GoPlus className="text-white w-[25px] h-[25px]"/></div>
      <div><GoVideo className="text-white w-[25px] h-[25px]"/></div>
         <div className="w-[50px] h-[50px] ml-4 border-2 border-black rounded-full cursor-pointer overflow-hidden">
                  <img
                    src={dp}
                    alt=""
                    className="w-full object-cover"
                  />
                </div>
    </div>
  );
};

export default Nav;
