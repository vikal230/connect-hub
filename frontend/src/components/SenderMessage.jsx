import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useRef } from 'react';

const SenderMessage = ({message}) => {
const scroll = useRef();
useEffect(() => {
  scroll.current?.scrollIntoView({behavior:"smooth"})
})


   const { userData } = useSelector((state) => state.user);
  return (
    <div className='w-fit max-w-[60%] bg-gradient-to-br from-[#9500ff] to-[#ff0095] rounded-t-2xl rounded-bl-2xl rounded-br-0 px-[10px] py-[10px] relative ml-auto right-0 flex flex-col gap-[10px]' ref={scroll}>
  {message.image && <img src={message.image} alt="message" className='w-[200px] h-[200px] object-cover rounded-lg' />}
  {message.message && <div className='text-white text-[18px] wrap-break-word'>{message.message}</div>}

  <div className='w-[30px] h-[30px] rounded-full cursor-pointer overflow-hidden absolute right-[-25px] bottom-[-40px]'>
    <img src={userData?.profileImage} alt="" className='w-full object-cover'/>
  </div>
</div>
  )
}

export default SenderMessage
