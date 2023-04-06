import { useRouter } from 'next/router'
import React, { useState } from 'react'
import {BsFillChatLeftDotsFill} from 'react-icons/bs'

export type data = {
    username :string
    roomname :string
}

const Create = () => {
    const router = useRouter()

    const [username,setUsername] = useState<string>("")
    const [roomname,setRoomname] = useState<string>("")

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const payload :data = {
            username,
            roomname
        }
        localStorage.setItem("chat-user",JSON.stringify(payload))
        router.push(`/chat/${roomname}`)

    }

  return (
    <div className='w-full h-[100vh] grid place-items-center overflow-hidden relative'>
        {/* <img src="/wave.png" className='absolute w-[120%] grayscale left-0 h-[350px] rotate-12' alt="" /> */}
        <div className='bg-white dark:bg-black/80 backdrop-blur-[10px] border-dashed border-white/10 border-[5px] dark:text-white md:h-[90vh] md:w-[70%] h-full w-full rounded-xl drop-shadow-xl flex flex-col items-center justify-center gap-5   '>
            {/* <h1 className="text-[4rem] font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-[transparent] bg-clip-text animate-text">
                Legendary Chat
            </h1> */}
            <h1 className="md:text-[4rem] text-[2rem] font-semibold">
                <BsFillChatLeftDotsFill />
            </h1>
            <form  onSubmit={(e)=>onSubmit(e)} className='md:w-[400px] h-[300px] p-5 '>
                <div className="flex flex-col gap-2">
                    <label className='ml-2 dark:text-white/80' htmlFor="username">Username</label>
                    <input value = {username} onChange={(e)=>setUsername(e.target.value)} id = "username" type="text" className='form-input' />
                </div>
                <div className="flex flex-col gap-2 mt-5">
                    <label className='ml-2 dark:text-white/80' htmlFor="roomname">Room name</label>
                    <input value = {roomname} onChange={(e)=>setRoomname(e.target.value)} id = "roomname" type="text" className='form-input' />
                </div>

                <input type="submit" value="Chat" className='form-input w-full mt-5 dark:bg-white dark:text-black button ' />
                
            </form>
        </div>
    </div>
  )
}

export default Create