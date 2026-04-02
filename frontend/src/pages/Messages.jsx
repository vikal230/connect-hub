import React, { useEffect } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OnlineUser from "../components/OnlineUser";
import { useMessageHooks } from "../hooks/useMessageHooks";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/messageSlice";
import dp from "../assets/dp.png";

const Messages = () => {
  const dispatch = useDispatch();
  const { prevChatUsers } = useSelector((state) => state.message);
  const { userData } = useSelector((state) => state.user);
  const { onlineUsers } = useSelector((state) => state.socket);
  const navigate = useNavigate();
  const { getPrevChatUsersApiHook } = useMessageHooks();
  const { messages } = useSelector((state) => state.message);

  const handleGetPrevChatUsers = async () => {
    try {
      const response = await getPrevChatUsersApiHook();
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetPrevChatUsers();
  }, [messages]);

  return (
    <div className="w-full min-h-[100vh] flex flex-col bg-black gap-[20px] p-[20px]">
      <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px]">
        <MdOutlineKeyboardBackspace
          className="text-white lg:hidden cursor-pointer w-[25px] h-[25px] "
          onClick={() => navigate("/")}
        />
        <h1 className="text-white text-[20px] font-semibold">Message</h1>
      </div>
      <div className="w-full h-[80px] flex gap-[20px] justify-start items-center overflow-x-auto p-[20px] border-b-2 border-gray-800">
        {userData?.following?.map(
          (user) =>
            onlineUsers?.includes(user._id?.toString()) && (
              <OnlineUser key={user._id} user={user} />
            ),
        )}
      </div>
      <div className="w-full h-full overflow-auto flex flex-col gap-[20px]">
        {prevChatUsers?.map((user, index) => (
          <div
            key={user._id || index}
            className="text-white cursor-pointer w-full flex items-center gap-[10px]"
            onClick={() => {
              dispatch(setSelectedUser(user));
              navigate("/messagearea");
            }}
          >
            {onlineUsers?.includes(user._id?.toString()) ? (
              <OnlineUser key={user._id} user={user} />
            ) : (
              <div
                className="w-[50px] h-[50px] border-2 border-black
                rounded-full cursor-pointer overflow-hidden"
              >
                <img
                  src={user.profileImage || dp}
                  alt=""
                  className="w-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-col">
              <div className="text-white text-[18px] font-semibold">
                {user.userName}
              </div>
              <div
                className={
                  onlineUsers?.includes(user._id?.toString())
                    ? "text-green-500 text-[10px]"
                    : "text-white text-[10px]"
                }
              >
                {onlineUsers?.includes(user._id?.toString())
                  ? "Active Now"
                  : "Offline"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
