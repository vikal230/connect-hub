import React, { useEffect } from "react";
import logo from "../assets/react.svg";
import { GoHeart } from "react-icons/go";
import dp from "../assets/dp.png";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { setsuggestedUsers } from "../redux/userSlice";
import OutherUser from "./OutherUser";

const LeftHome = () => {
  const { userData, suggestedUsers } = useSelector((state) => state.user);
  const { handleLogOut, handleSuggestedUser } = useAuth();
  const dispatch = useDispatch();

  const handleLogOutUser = async () => {
    const data = await handleLogOut();
    dispatch(setUserData(data.user));
  };

  useEffect(() => {
    handleSuggestedUser();
  }, []);
  return (
    <div className="w-[25%] hidden lg:block min-h-[100vh]  bg-[black] border-r-2 border-gray-900">
      <div className="w-full h-[100px] flex items-center justify-between p-[20px]">
        <img
          src={logo}
          alt="vite logo bad me change hoga!"
          className="w-[40px]"
        />
        <div>
          <GoHeart className="text-white w-[25px] h-[25px]" />
        </div>
      </div>

      <div className="flex items-center w-full justify-between gap-[10px] px-[10px] border-b-2 border-b-gray-900 py-[10px]">
        <div className="flex items-center gap-[10px]">
          <div className="w-[50px] h-[50px] ml-4 border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img
              src={userData.profileImage || dp}
              alt=""
              className="w-full object-cover"
            />
          </div>
          <div>
            <div className="text-[18px] text-white font-semibold">
              {userData.userName}
            </div>
            <div className="text-[15px] text-gray-400 font-semibold">
              {userData.name}
            </div>
          </div>
        </div>
        <div
          className="text-blue-500 cursor-pointer font-semibold"
          onClick={handleLogOutUser}
        >
          Log Out
        </div>
      </div>
      <div className="w-full flex flex-col gap-[20px] p-[20px]">
        <h1 className="text-[white] text-[19px]">Suggested User</h1>
        {suggestedUsers &&
          suggestedUsers
            .slice(0, 5)
            .map((user, index) => <OutherUser index={index} user={user} />)}
      </div>
    </div>
  );
};

export default LeftHome;
