import { sendMessageApi } from "../services/api.services";
import { useDispatch, useSelector } from "react-redux"; // <-- useSelector add karein
import { setMessages, setPrevChatUser } from "../redux/messageSlice";
import { getAllMessagesApi } from "../services/api.services";
import { getPrevChatUsersApi } from "../services/api.services";

export const useMessageHooks = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);

  const sendMessageApiHook = async ({ receiverId, formData }) => {
    try {
      const result = await sendMessageApi({ receiverId, formData });
      dispatch(setMessages([...messages, result.newMessage]));
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getAllMessagesApiHook = async (receiverId) => {
    try {
      const response = await getAllMessagesApi(receiverId);
      const fetchedMessages = response.conversations[0]?.messages || [];
      dispatch(setMessages(fetchedMessages));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getPrevChatUsersApiHook = async () => {
    try {
      const response = await getPrevChatUsersApi();
      dispatch(setPrevChatUser(response.previousUser));
      return response.previousUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { sendMessageApiHook, getAllMessagesApiHook, getPrevChatUsersApiHook };
};
