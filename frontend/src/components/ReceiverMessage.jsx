import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';

const ReceiverMessage = ({message}) => {
  const {selectedUser} = useSelector((state) => state.message);
  const scroll = useRef();
  
  useEffect(() => {
    scroll.current?.scrollIntoView({behavior:"smooth"})
  }, [message])

  return (
    <div className='flex flex-col items-start gap-1 relative mb-4' ref={scroll}>
      <div className='w-fit max-w-[75%] bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm animate-in slide-in-from-left-2 duration-300'>
        {message.image && (
          <img src={message.image} alt="received" className='max-w-full max-h-[250px] object-cover rounded-xl mb-2' />
        )}
        {message.message && (
          <p className='text-zinc-100 text-[15px] font-medium leading-relaxed break-words'>
            {message.message}
          </p>
        )}
      </div>

      {/* Mini Profile Image */}
      <div className='w-5 h-5 rounded-full overflow-hidden border border-zinc-800 mt-1 ml-1'>
        <img src={selectedUser?.profileImage} alt="" className='w-full h-full object-cover'/>
      </div>
    </div>
  )
}

export default ReceiverMessage;