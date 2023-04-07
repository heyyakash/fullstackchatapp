import Chatbox from '@/components/Chatbox'
import { data } from '@/components/Create'
import { onClose, onError, onOpen, setupConnection } from '@/helpers/connection'
import React, { useEffect, useRef, useState } from 'react'
import { HiOutlineUserCircle } from "react-icons/hi"
import { BsFillChatLeftDotsFill, BsFillCircleFill } from "react-icons/bs"
import Userbox from '@/components/Userbox'

type SendMessage = {
    type: "send_message" | "change_room",
    payload: {
        username: string,
        roomname: string,
        message: string
    }
}

const Room = () => {
    const [messageList, setMessageList] = useState<data[]>([])
    const [userList,setUserList] = useState<string[]>([])
    const [username, setUsername] = useState<string>("")
    const [roomname, setRoomname] = useState<string>("")
    const conn = useRef<any>(null)
    const [message, setMessage] = useState<string>("")

    const sendEvent = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (message.length !== 0) {
            const payload: SendMessage = {
                type: "send_message",
                payload: {
                    username,
                    message,
                    roomname
                }
            }
            if (conn.current !== null) {
                conn.current.send(JSON.stringify(payload))
            }
            setMessage("")

        }

        return false
    }

    const handleIncommingMessage = (e: any) => {

        // console.log(counter)
        var arr = [...messageList]
        const data = JSON.parse(e.data)
        console.log(data)
        arr.push(data)
        setUserList(data.payload.clientlist)
        setMessageList((messageList: any) => [...messageList, data])
    }

    const onOpen = () => {
        const userdata: data = JSON.parse(localStorage.getItem("chat-user") as string)
        setUsername(userdata.username)
        setRoomname(userdata.roomname)
        console.log("Connection Established")
        const payload: SendMessage = {
            type: "change_room",
            payload: {
                username: userdata.username,
                message: `${userdata.username} has joined the room`,
                roomname: userdata.roomname
            }
        }
        conn.current.send(JSON.stringify(payload))
    }

    // console.log(messageList) 

    useEffect(() => {
        console.log("I ran again")
        conn.current = new WebSocket("ws://localhost:8080/ws/chat")
        conn.current.onopen = onOpen
        conn.current.onclose = onClose
        conn.current.onerror = onError
        conn.current.onmessage = handleIncommingMessage

        return () => {
            conn.current.close()
        }

    }, [])
    return (
        <div className='w-full h-[100vh] grid place-items-center'>
            <div className='flex items-center justify-center gap-3 w-[70%] h-[90vh]'>

                <div className='dark-back w-[350px] flex flex-col overflow-y-auto'>
                    <div className='h-[60px] px-4 gap-3 border-dash border-b-[3px] dark:text-white flex items-center'>
                        <BsFillChatLeftDotsFill className='text-3xl' />
                        <p className='text-2xl'>{roomname}</p>
                    </div>
                   {
                    userList.map(x => <Userbox username={x} key={x} />)
                   }

                </div>


                <div className='dark-back flex flex-col flex-grow'>
                    <div className='h-[70px] px-4 gap-3 border-dash border-b-[3px] dark:text-white flex items-center'>
                        <HiOutlineUserCircle className='text-4xl' />
                        <h2 className='text-2xl'>{username}</h2>
                        <BsFillCircleFill className='text-green-500 text-sm' />
                        <button className='bg-red-600 px-3 py-1 button rounded-lg ml-auto hover:bg-white hover:text-red-600'>Leave</button>
                    </div>
                    <div className='h-full p-8 overflow-y-auto'>
                        {messageList.map((data: any) => {
                            return (
                                <Chatbox username={data.payload.username} message={data.payload.message} key={data.payload.message} direction={data.payload.username === username ? "right" : "left"} />
                            )
                        })}
                    </div>
                    <form onSubmit={(e) => sendEvent(e)} className='mt-auto bg-black/70 border-t-[3px] border-dashed border-white/20 h-[70px] flex items-center'>
                        <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" className='flex-grow h-full bg-transparent border-none outline-none text-xl text-white p-4' placeholder='Type Your Message ...' />
                        <input type="submit" value={"Send"} className='ml-auto bg-transparent border-l-[3px] border-dashed border-white/20 w-[20%] text-white font-bold button' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Room