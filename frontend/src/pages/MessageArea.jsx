import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import dp from "../assets/dp.png";
import { IoImages } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { useMessageHooks } from "../hooks/useMessageHooks";
import SenderMessage from "../components/SenderMessage";
import RecieverMessage from "../components/ReceiverMessage";
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
    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };

  const handleSendMessageHooks = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("message", inputMessage);
    formData.append("image", backendImage);
    try {
      await sendMessageApiHook({ receiverId: selectedUser._id, formData });
      setInputMessage("");
      setFrontendImage(null);
      setBackendImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAllMessagesHooks = async () => {
    try {
      await getAllMessagesApiHook(selectedUser._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedUser?._id) handleGetAllMessagesHooks();
  }, [selectedUser?._id]);

  useEffect(() => {
    if (!socket || !selectedUser?._id) return;
    const handleNewMessage = (newMessage) => {
      const messageSenderId = newMessage?.sender?._id || newMessage?.sender;
      if (messageSenderId === selectedUser._id) {
        dispatch(setMessages([...messages, newMessage]));
      }
    };
    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, selectedUser?._id, messages, dispatch]);

  return (
    <div className="w-full h-screen bg-[#0b0b0b] relative flex flex-col overflow-hidden">
      {/* Header */}
      <div className="w-full h-[80px] flex items-center px-6 gap-4 sticky top-0 z-[100] bg-[#0b0b0b]/80 backdrop-blur-md border-b border-zinc-900">
        <MdOutlineKeyboardBackspace
          className="text-white cursor-pointer w-7 h-7 hover:text-zinc-400 transition-colors"
          onClick={() => navigate("/profile/" + selectedUser?.userName)}
        />
        <div 
          className="w-11 h-11 rounded-full border-2 border-zinc-800 overflow-hidden cursor-pointer active:scale-90 transition-transform"
          onClick={() => navigate(`/profile/${selectedUser.userName}`)}
        >
          <img src={selectedUser.profileImage || dp} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-zinc-100 text-[16px] font-bold tracking-tight">{selectedUser.userName}</h2>
          <span className="text-[12px] text-gray-600 font-medium">{selectedUser.name}</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 w-full pt-6 pb-[100px] px-6 flex flex-col gap-8 overflow-y-auto no-scrollbar bg-[#0b0b0b]">
        {messages && messages.map((mess, index) => (
          (mess?.sender?._id || mess?.sender) === userData?._id 
            ? <SenderMessage message={mess} key={index}/>
            : <RecieverMessage message={mess} key={index}/>
        ))}
      </div>

      {/* Input Section */}
      <div className="w-full h-[90px] fixed bottom-0 flex justify-center items-center bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b] to-transparent px-4">
        <form
          className="w-full max-w-[800px] h-[55px] rounded-[24px] bg-zinc-900/90 border border-zinc-800 flex items-center gap-3 px-4 relative backdrop-blur-sm"
          onSubmit={handleSendMessageHooks}
        >
          {frontendImage && (
            <div className="w-[120px] h-[120px] absolute top-[-140px] right-4 rounded-2xl overflow-hidden border-2 border-sky-500 shadow-2xl animate-in fade-in zoom-in">
              <img src={frontendImage} alt="" className="h-full w-full object-cover" />
              <div className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 cursor-pointer" onClick={() => setFrontendImage(null)}>✕</div>
            </div>
          )}
          
          <input type="file" accept="image/*" ref={imageInput} hidden onChange={handleImage} />
          
          <div className="p-2 hover:bg-zinc-800 rounded-full transition-colors cursor-pointer" onClick={() => imageInput.current.click()}>
            <IoImages className="h-6 w-6 text-zinc-400" />
          </div>

          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 h-full bg-transparent text-[15px] text-white outline-none placeholder:text-zinc-600"
            onChange={(e) => setInputMessage(e.target.value)}
            value={inputMessage}
          />

          {(inputMessage || frontendImage) && (
            <button className="w-10 h-10 rounded-xl bg-sky-500 hover:bg-sky-400 flex items-center justify-center cursor-pointer transition-all active:scale-90 shadow-lg shadow-sky-500/20">
              <IoMdSend className="w-5 h-5 text-white" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default MessageArea;