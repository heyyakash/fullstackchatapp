import Chatbox from '@/components/Chatbox'
import { data } from '@/components/Create'
import { onClose, onError, onOpen, setupConnection } from '@/helpers/connection'
import React, { useEffect, useRef, useState } from 'react'

type SendMessage = {
    type: "send_message" | "change_room",
    payload: {
        username: string,
        roomname: string,
        message: string
    }
}

const Room = () => {
    const [messageList, setMessageList] = useState<any>([])
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

    const handleIncommingMessage = (e:any) => {
    
        // console.log(counter)
    
        var arr = [...messageList]
        const data = JSON.parse(e.data)
        arr.push(data)
        setMessageList((messageList:any)=>[...messageList,data])
    }

    const onOpen = () => {
        const userdata: data = JSON.parse(localStorage.getItem("chat-user") as string)
        setUsername(userdata.username)
        setRoomname(userdata.roomname)
        console.log("Connection Established")
        const payload: SendMessage = {
            type: "change_room",
            payload: {
                username:userdata.username,
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
                <div className='dark-back w-[350px]'>Hello</div>
                <div className='dark-back flex flex-col flex-grow'>
                    <div className='bg-slate-800/10 h-[70px]'></div>
                    <div className='h-full p-4'>
                        {/* <Chatbox username='heyyitsakash' message='Hello' direction='right' />
                        <Chatbox username='muzan' message='Heyy!' direction='left'/> */}
                        {messageList.map((data:any) => {return(
                            <Chatbox username={data.payload.username} message={data.payload.message} key={data.payload.message} direction={data.payload.username===username?"right":"left"} />
                        )})}
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