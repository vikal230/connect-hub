import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import dp from "../assets/dp.png";
import { IoImages } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";
import { useRef } from "react";
import { useMessageHooks } from "../hooks/useMessageHooks";
import SenderMessage from "../components/SenderMessage";
import RecieverMessage from "../components/ReceiverMessage";
import { useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const MessageArea = () => {
  const dispatch = useDispatch();
  const { selectedUser, messages } = useSelector((state) => state.message);
  const { userData } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);
  const [inputMessage, setInputMessage] = useState("");
  const imageInput = useRef();
  const navigate = useNavigate();
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const { sendMessageApiHook, getAllMessagesApiHook } = useMessageHooks();
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSendMessageHooks = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("message", inputMessage);
    formData.append("image", backendImage);
    try {
      const data = await sendMessageApiHook({
        receiverId: selectedUser._id,
        formData,
      });
      console.log(data);
      setInputMessage("");
      setFrontendImage(null);
      setBackendImage(null);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleGetAllMessagesHooks = async () => {
    try {
      const data = await getAllMessagesApiHook(selectedUser._id);
      console.log(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    if (selectedUser?._id) {
      handleGetAllMessagesHooks();
    }
  }, [selectedUser?._id]);

  useEffect(() => {
    if (!socket || !selectedUser?._id) {
      return;
    }

    const handleNewMessage = (newMessage) => {
      const messageSenderId = newMessage?.sender?._id || newMessage?.sender;
      if (messageSenderId === selectedUser._id) {
        dispatch(setMessages([...messages, newMessage]));
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedUser?._id, messages, dispatch]);

  return (
    <div className="w-full h-[100vh] bg-black relative text-white">
      <div className="flex items-center px-[20px] py-[10px] fixed top-0 z-[100] bg-black w-full">
        <div className="h-[80px] flex items-center gap-[10px] px-[20px]">
          <MdOutlineKeyboardBackspace
            className="text-white cursor-pointer w-[25px] h-[25px] "
            onClick={() => navigate("/profile/" + selectedUser?.userName)}
          />
        </div>
        <div
          className="w-[40px] h-[40px] border-2 border-black
        rounded-full cursor-pointer overflow-hidden"
          onClick={() => navigate(`/profile/${selectedUser.userName}`)}
        >
          <img
            src={selectedUser.profileImage || dp}
            alt=""
            className="w-full object-cover"
          />
        </div>
        <div className="text-white text-[18px] font-semibold">
          <div>{selectedUser.userName}</div>
          <div className="text-[14px] text-gray-400">{selectedUser.name}</div>
        </div>
      </div>

      <div className="w-full h-[80%] pt-[100px] pb-[120px] lg:pb-[150px] px-[40px] flex flex-col gap-[50px] overflow-auto bg-black">
{/* Messages will be displayed here */}
{messages && messages.map((mess, index) =>(
    (mess?.sender?._id || mess?.sender) === userData?._id ? <SenderMessage message={mess} key={index}/>: <RecieverMessage message={mess} key={index}/>
))}

      </div>

      <div className="w-full h-[80px] fixed bottom-0 flex justify-center items-center bg-black z-[100]">
        <form
          className="w-[90%] max-w-[800px] h-[80%] rounded-full bg-[#131616] flex items-center gap-[10px] px-[20px] relative"
          onSubmit={handleSendMessageHooks}
        >
          {frontendImage && (
            <div className="w-[100px] rounded-2xl h-[100px] absolute top-[-120px] right-[10px] overflow-hidden">
              <img
                src={frontendImage}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={imageInput}
            hidden
            onChange={handleImage}
          />
          <input
            type="text"
            placeholder="Write Message"
            className="w-full h-full px-[20px] text-[18px] text-white outline-0"
            onChange={(e) => setInputMessage(e.target.value)}
            value={inputMessage}
          />
          <div className="cursor-pointer">
            <IoImages
              className="h-[28px] w-[28px] text-white"
              onClick={() => imageInput.current.click()}
            />
          </div>
          {(inputMessage || frontendImage) && (
            <button className="w-[60px] h-[40px] rounded-full bg-gradient-to-br from-[#9500ff] to-[#ff0095] flex items-center justify-center cursor-pointer">
              <IoMdSend className="w-[25px] h-[25px] text-white" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default MessageArea;
