// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { MdOutlineKeyboardBackspace } from "react-icons/md";
// import { useSelector } from "react-redux";
// import NotificationCard from '../components/NotificationCard';


// const NotificationPage = () => {
//   const navigate = useNavigate()
// const {notificationData} = useSelector((state) => state.notification)
//   return (
//      <div className='w-full h-[100vh] bg-black'>
//           <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px] lg:hidden">
//             <MdOutlineKeyboardBackspace
//               className="text-white cursor-pointer w-[25px] h-[25px] "
//               onClick={() => navigate("/")}
//             />
//             <h1 className="text-white text-[20px] font-semibold">Notifications</h1>
//           </div>
//           <div className='w-full flex flex-col gap-[15px] h-[100%] overflow-auto px-[10px]'>
//             {notificationData?.map((noti, index) => (
//            <NotificationCard noti={noti} key={index}/>  
//             ))}
//           </div>
//     </div>
//   )
// }

// export default NotificationPage



import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSelector } from "react-redux";
import NotificationCard from '../components/NotificationCard';

const NotificationPage = () => {
  const navigate = useNavigate()
  const { notificationData } = useSelector((state) => state.notification)

  return (
    <div className='w-full h-screen bg-[#0b0b0b] flex flex-col'>
      <div className="w-full h-[70px] flex items-center gap-4 px-6 sticky top-0 bg-[#0b0b0b]/80 backdrop-blur-md z-50 border-b border-zinc-900 lg:hidden">
        <div className="p-2 hover:bg-zinc-900 rounded-full transition-all cursor-pointer active:scale-90">
          <MdOutlineKeyboardBackspace
            className="text-white w-7 h-7"
            onClick={() => navigate("/")}
          />
        </div>
        <h1 className="text-white text-xl font-bold tracking-tight">Notifications</h1>
      </div>

      <div className="hidden lg:flex w-full h-[70px] items-center px-8 border-b border-zinc-900/50">
        <h1 className="text-white text-2xl font-black tracking-tighter">Notifications</h1>
      </div>

      {/* Notifications List Area */}
      <div className='flex-1 w-full flex flex-col gap-2 overflow-y-auto no-scrollbar px-4 py-6 lg:px-8'>
        {notificationData?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full opacity-40">
             <p className="text-zinc-500 font-bold">No notifications yet.</p>
          </div>
        ) : (
          notificationData?.map((noti, index) => (
            <div key={index} className="animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
              <NotificationCard noti={noti} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default NotificationPage