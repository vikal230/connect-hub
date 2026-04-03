import React, { useEffect } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import OnlineUser from "../components/OnlineUser";
import { useMessageHooks } from "../hooks/useMessageHooks";
import { setSelectedUser } from "../redux/messageSlice";
import dp from "../assets/dp.png";

const Messages = () => {
  const dispatch = useDispatch();
  const { prevChatUsers, messages } = useSelector((state) => state.message);
  const { userData } = useSelector((state) => state.user);
  const { onlineUsers } = useSelector((state) => state.socket);
  const navigate = useNavigate();
  const { getPrevChatUsersApiHook } = useMessageHooks();

  const handleGetPrevChatUsers = async () => {
    try {
      await getPrevChatUsersApiHook();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetPrevChatUsers();
  }, [messages]);

  return (
    <div className="w-full min-h-[100vh] flex flex-col bg-[#0b0b0b] overflow-hidden">
      {/* Header */}
      <div className="w-full h-[80px] flex items-center gap-4 px-6 border-b border-zinc-900/50">
        <MdOutlineKeyboardBackspace
          className="text-white lg:hidden cursor-pointer w-6 h-6 hover:text-zinc-400 transition-colors"
          onClick={() => navigate("/")}
        />
        <h1 className="text-white text-xl font-bold tracking-tight">Messages</h1>
      </div>

      {/* Online Users Horizontal Strip */}
      <div className="w-full flex gap-5 justify-start items-center overflow-x-auto no-scrollbar p-6 border-b border-zinc-900/50 bg-[#0e0e0e]/50">
        {userData?.following?.map(
          (user) =>
            onlineUsers?.includes(user._id?.toString()) && (
              <OnlineUser key={user._id} user={user} />
            ),
        )}
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1 no-scrollbar">
        {prevChatUsers?.map((user, index) => (
          <div
            key={user._id || index}
            className="group hover:bg-zinc-900/60 p-3 rounded-2xl transition-all cursor-pointer flex items-center gap-4"
            onClick={() => {
              dispatch(setSelectedUser(user));
              navigate("/messagearea");
            }}
          >
            {/* Avatar Section */}
            <div className="relative">
              {onlineUsers?.includes(user._id?.toString()) ? (
                <OnlineUser key={user._id} user={user} isChatList={true} /> // isChatList prop if you handle it inside OnlineUser
              ) : (
                <div className="w-[52px] h-[52px] rounded-full ring-1 ring-zinc-800 p-[2px] overflow-hidden bg-zinc-900">
                  <img
                    src={user.profileImage || dp}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full shadow-lg"
                  />
                </div>
              )}
            </div>

            {/* Name and Status */}
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="text-zinc-100 text-[15px] font-bold group-hover:text-sky-400 transition-colors truncate">
                {user.userName}
              </div>
              <div
                className={`text-[11px] font-semibold flex items-center gap-1.5 ${
                  onlineUsers?.includes(user._id?.toString())
                    ? "text-green-500"
                    : "text-zinc-500"
                }`}
              >
                {onlineUsers?.includes(user._id?.toString()) && (
                  <span className="w-1.0 h-1.0 bg-green-500 rounded-full animate-pulse"></span>
                )}
                {onlineUsers?.includes(user._id?.toString()) ? "Active Now" : "Offline"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;