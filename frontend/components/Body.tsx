import React, { useEffect, useState } from 'react'
import NameBox from './NameBox'
import { RiSendPlane2Fill } from 'react-icons/ri'
import Chatbox from './Chatbox'
import { atom, useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { SendMessage } from '@/helpers/events'
import { clients } from '@/Atoms/clientsAtom'
import { rname, uname } from '@/Atoms/userAtom'
import { messages } from '@/Atoms/messagesAtom'
import { connAtom } from '@/Atoms/websocketAtom'




const Body = () => {
    const [msg,setMsg] = useState<string>("")
    const [conn,setConn] = useAtom(connAtom)
    const [messageList,setMessageList] = useAtom(messages) 
    const [userList,setUserList] = useAtom(clients)
    const [username,setUsername] = useAtom(uname)
    const [roomname,setRoomname] = useAtom(rname)
    const router = useRouter()

    useEffect(()=>{
        const {username,roomname} = JSON.parse(localStorage.getItem("chat-user") as string)
        setUsername(username)
        setRoomname(roomname)
    },[])


    const handleExit = () => {
        setMessageList([])
        setUserList([])
        setConn(null)
        router.push('/')
    }

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (msg.length !== 0) {
            const payload: SendMessage = {
                type: "send_message",
                payload: {
                    username,
                    message:msg,
                    roomname
                }
            }
            if (conn) {
                conn.send(JSON.stringify(payload))
            }
            setMsg("")
        }
    }

    return (
        <div className="flex flex-col grow relative">
            <div className='flex p-4 py-5 absolute top-0 w-full  backdrop-blur-lg bg-black/40 text-white items-center'>
                <p className='text-2xl font-bold'>{roomname}</p>
                <div onClick={()=>handleExit()} className='p-2 rounded-xl ml-auto bg-red-500 cursor-pointer'>Leave</div>
            </div>

            <div className="overflow-y-auto w-full p-6 pt-[7rem]">
                {messageList.map((x)=>{
                    return(
                        <Chatbox key= {x.payload.message} username={x.payload.username} message={x.payload.message} direction={username===x.payload.username?"right":"left"} />
                    ) 
                })}
            </div>

            <div className=" mt-auto w-full backdrop-blur-md px-6 pb-4">
                <form onSubmit={(e)=>sendMessage(e)} className='bg-black/40 rounded-3xl p-5 flex items-center gap-3 text-white'>
                    <NameBox name={username} size="small" />
                    <input type="text" value = {msg} onChange = {(e)=>setMsg(e.target.value)} required className='text-xl text-white md:w-full placeholder:text-white/80 bg-transparent border-none outline-none ' placeholder="Enter your message" />
                    <label htmlFor="send"><RiSendPlane2Fill className='text-3xl cursor-pointer text-white' /></label>
                    <input type="submit" id="send" name="send" className='hidden' />
                </form>
            </div>
        </div>
    )
}

export default Body