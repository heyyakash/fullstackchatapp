import React, { useEffect, useState } from 'react'
import NameBox from './NameBox'
import { RiSendPlane2Fill } from 'react-icons/ri'
import Chatbox from './Chatbox'
import { SendMessage, connAtom, messages } from '@/pages/chat/[roomname]'
import { useAtom } from 'jotai'

const Body = () => {
    const [msg,setMsg] = useState<string>("")
    const [conn,setConn] = useAtom(connAtom)
    const [messageList,setMessageList] = useAtom(messages) 

    useEffect(()=>{
        const {username,roomname} = JSON.parse(localStorage.getItem("chat-user") as string)
        setUsername(username)
        setRoomname(roomname)
    },[])

    const [username,setUsername] = useState("")
    const [roomname,setRoomname] = useState("")

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // const {username,roomname} = JSON.parse(localStorage.getItem("chat-user") as string)
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

        return false
    }

    return (
        <div className="flex flex-col grow relative">
            <div className='flex p-4 absolute top-0 w-full backdrop-blur-lg bg-black/40 dark:text-white items-center'>
                <p className='text-2xl font-bold'>Chat</p>
                <div className="flex ml-auto items-center gap-2">
                    <NameBox name="S" size="small" />
                    <NameBox name="K" size="small" />
                </div>
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
                    <NameBox name="A" size="small" />
                    <input type="text" value = {msg} onChange = {(e)=>setMsg(e.target.value)} required className='text-xl text-white w-full placeholder:text-white/80 bg-transparent border-none outline-none ' placeholder="Enter your message" />
                    <label htmlFor="send"><RiSendPlane2Fill className='text-3xl cursor-pointer text-white' /></label>
                    <input type="submit" id="send" name="send" className='hidden' />
                </form>
            </div>
        </div>
    )
}

export default Body