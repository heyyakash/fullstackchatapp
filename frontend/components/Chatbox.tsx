import React from 'react'
import NameBox from './NameBox'
import { useAtom } from 'jotai'
import { uname } from './Body'

const Chatbox = ({username,message,direction}:{username:string,message:string,direction:string}) => {

  return (
    <div className={`flex float-${direction} ${direction==="right"?"":"flex-row-reverse"} gap-4 clear-both my-2 text-white`}>
      <div className={`flex flex-col ${direction==="right"?"items-end":"items-start"} gap-2`}>
        <p className="text-xl font-semibold">{username}</p>
        <div className={`${direction==="right"?"bg-blue-500":"bg-white/20"} text-xl font-semibold rounded-b-xl ${direction==="right"?"rounded-l-xl":"rounded-r-xl"} px-4 py-2`}>{message}</div>
      </div>
      <NameBox size= "big"  name = {username} />
    </div>
  )
}

export default Chatbox