import React from 'react'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useEffect } from 'react';

const ReceiverMessage = ({message}) => {
  const {selectedUser} = useSelector((state) => state.message);
const scroll = useRef();
useEffect(() => {
  scroll.current?.scrollIntoView({behavior:"smooth"})
})

   return (
    <div className='w-fit max-w-[60%] bg-[#1a1f1f] rounded-t-2xl rounded-br-2xl rounded-bl-0 px-[10px] py-[10px] relative left-0 flex flex-col gap-[10px]' ref={scroll}>
  {message.image && <img src={message.image} alt="message" className='w-[200px] h-[200px] object-cover rounded-lg' />}
  {message.message && <div className='text-white text-[18px] wrap-break-word'>{message.message}</div>}

  <div className='w-[30px] h-[30px] rounded-full cursor-pointer overflow-hidden absolute left-[-25px] bottom-[-40px]'>
    <img src={selectedUser?.profileImage} alt="" className='object-cover'/>
  </div>
</div>
  )
}

export default ReceiverMessage
