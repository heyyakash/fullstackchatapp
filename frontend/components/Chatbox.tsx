import React from 'react'

const Chatbox = ({username,message,direction}:{username:string,message:string,direction:string}) => {
  return (
    <div className={`max-w-[50%] mt-2 clear-both float-right w-auto h-[50px] bg-white/20 text-white overflow-hidden flex items-center ${direction==="right"?"flex-row-reverse":""} rounded-xl`}>
    <div className='px-2 text-black h-full flex items-center bg-white'>{username}</div>
    <p className='px-2'>{message}</p>
</div>
  )
}

export default Chatbox