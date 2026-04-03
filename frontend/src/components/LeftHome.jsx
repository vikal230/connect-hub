import React, { useEffect, useState } from "react";
import logo from "../assets/react.svg";
import { GoHeart } from "react-icons/go";
import dp from "../assets/dp.png";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { setUserData, setsuggestedUsers } from "../redux/userSlice";
import OtherUser from "./OtherUser";
import { useNavigate } from "react-router-dom";
import NotificationPage from "../pages/NotificationPage";

const LeftHome = () => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const { userData, suggestedUsers } = useSelector((state) => state.user);
  const { handleLogOut, handleSuggestedUser, markAllUnreadAsRead } = useAuth();
  const dispatch = useDispatch();
  const { notificationData } = useSelector((state) => state.notification);

  const handleNotificationClick = async () => {
    setShowNotification((prev) => !prev);
    if (!showNotification) {
      markAllUnreadAsRead();
    }
  };

  const handleLogOutUser = async () => {
    const data = await handleLogOut();
    dispatch(setUserData(null));
    dispatch(setsuggestedUsers([]));
    return data;
  };

  useEffect(() => {
    handleSuggestedUser();
  }, []);

  return (
    <div
      className={`w-[25%] hidden lg:block h-[100vh] bg-[#0b0b0b] border-r border-zinc-800 overflow-auto ${
        showNotification ? "overflow-hidden" : "overflow-auto"
      }`}
    >
      <div className="w-full h-[80px] flex items-center justify-between px-6">
        <img
          src={logo}
          alt="logo"
          className="w-[35px] hover:scale-110 transition-transform cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="relative z-[100] cursor-pointer p-2 hover:bg-zinc-900 rounded-full transition-all" onClick={handleNotificationClick}>
          <GoHeart className="text-white w-[26px] h-[26px]" />
          {notificationData?.length > 0 &&
            notificationData.some((noti) => noti.isRead === false) && (
              <div className="w-[8px] h-[8px] bg-sky-500 rounded-full absolute top-2 right-2 border-2 border-[#0b0b0b]"></div>
            )}
        </div>
      </div>

      {!showNotification && (
        <>
          <div className="flex items-center w-full justify-between gap-[10px] px-6 py-6 border-b border-zinc-900 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full ring-2 ring-zinc-800 p-[2px] cursor-pointer overflow-hidden">
                <img
                  src={userData?.profileImage || dp}
                  alt="user"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <div className="text-[15px] text-zinc-100 font-bold tracking-tight leading-tight">
                  {userData.userName}
                </div>
                <div className="text-[13px] text-zinc-500 font-medium">
                  {userData.name}
                </div>
              </div>
            </div>
            <div
              className="text-sky-500 hover:text-sky-400 text-[13px] cursor-pointer font-bold transition-colors"
              onClick={handleLogOutUser}
            >
              Log Out
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 px-6">
            <h1 className="text-zinc-400 text-[13px] font-bold uppercase tracking-wider">Suggested for you</h1>
            <div className="flex flex-col gap-1">
                {suggestedUsers &&
                suggestedUsers
                    .slice(0, 5)
                    .map((user, index) => (
                    <OtherUser
                        key={user._id || index}
                        index={index}
                        user={user}
                    />
                    ))}
            </div>
          </div>
        </>
      )}

      {showNotification && (
        <div className="animate-in slide-in-from-left duration-300">
          <NotificationPage />
        </div>
      )}
    </div>
  );
};

export default LeftHome;