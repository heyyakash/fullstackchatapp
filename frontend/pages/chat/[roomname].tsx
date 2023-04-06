import { data } from '@/components/Create'
import { setupConnection } from '@/helpers/connection'
import React, { useEffect, useState } from 'react'

type SendMessage = {
    type: "send_message" | "change_room",
    payload: {
        username: string,
        roomname: string,
        message: string
    }
}

const Room = () => {

    const [username, setUsername] = useState<string>("")
    const [roomname, setRoomname] = useState<string>("")
    const [conn,setConn] = useState<null | WebSocket>(null)
    const [message,setMessage] = useState<string>("")

    const sendEvent = () =>{
        if(message.length!=0){
        const payload :SendMessage = {
            type:"send_message",
            payload:{
                username,
                message,
                roomname
            }
        }
        conn && conn.send(JSON.stringify(payload))
        setMessage("")
    }
    }

        useEffect(() => {
            const userdata: data = JSON.parse(localStorage.getItem("chat-user") as string)
            setUsername(userdata.username)
            setRoomname(userdata.roomname)
            const connection = setupConnection()
            connection.onopen = () => {
                const payload: SendMessage = {
                    type: "change_room",
                    payload: {
                        username: userdata.username,
                        message: `${userdata.username} has joined the room`,
                        roomname: userdata.username
                    }
                }
                connection.send(JSON.stringify(payload))
            }
            setConn(connection)
        }, [])
    return (
        <div className='w-full h-[100vh] grid place-items-center'>
            <div className='flex items-center justify-center gap-3 w-[70%] h-[90vh]'>
                <div className='dark-back w-[350px]'>Hello</div>
                <div className='dark-back flex flex-col flex-grow'>
                    <div className='bg-slate-800/10 h-[70px]'></div>
                    <div className='flex-grow'></div>
                    <div className='mt-auto bg-black/70 border-t-[3px] border-dashed border-white/20 h-[70px] flex items-center'>
                        <input value ={message} onChange={(e)=>setMessage(e.target.value)} type="text" className='flex-grow h-full bg-transparent border-none outline-none text-xl text-white p-4' placeholder='Type Your Message ...' />
                        <button onClick={()=>sendEvent()} className='ml-auto bg-transparent border-l-[3px] border-dashed border-white/20 w-[20%] text-white font-bold button'>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Room