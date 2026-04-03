import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';

const SenderMessage = ({message}) => {
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({behavior:"smooth"})
  }, [message])

  const { userData } = useSelector((state) => state.user);

  return (
    <div className='flex flex-col items-end gap-1 relative mb-4' ref={scroll}>
      <div className='w-fit max-w-[75%] bg-sky-600 rounded-2xl rounded-tr-none px-4 py-3 shadow-lg animate-in slide-in-from-right-2 duration-300'>
        {message.image && (
          <img src={message.image} alt="sent" className='max-w-full max-h-[250px] object-cover rounded-xl mb-2' />
        )}
        {message.message && (
          <p className='text-white text-[15px] font-medium leading-relaxed break-words'>
            {message.message}
          </p>
        )}
      </div>
      
      {/* Mini Profile Image */}
      <div className='w-5 h-5 rounded-full overflow-hidden border border-zinc-800 mt-1 mr-1'>
        <img src={userData?.profileImage} alt="" className='w-full h-full object-cover'/>
      </div>
    </div>
  )
}

export default SenderMessage;