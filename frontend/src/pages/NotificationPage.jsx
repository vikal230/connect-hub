import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSelector } from "react-redux";
import NotificationCard from '../components/NotificationCard';


const NotificationPage = () => {
  const navigate = useNavigate()
const {notificationData} = useSelector((state) => state.notification)
  return (
     <div className='w-full h-[100vh] bg-black'>
          <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px] lg:hidden">
            <MdOutlineKeyboardBackspace
              className="text-white cursor-pointer w-[25px] h-[25px] "
              onClick={() => navigate("/")}
            />
            <h1 className="text-white text-[20px] font-semibold">Notifications</h1>
          </div>
          <div className='w-full flex flex-col gap-[15px] h-[100%] overflow-auto px-[10px]'>
            {notificationData?.map((noti, index) => (
           <NotificationCard noti={noti} key={index}/>  
            ))}
          </div>
    </div>
  )
}

export default NotificationPage
