import Chatbox from '@/components/Chatbox'
import { data } from '@/components/Create'
import { onClose, onError, onOpen, setupConnection } from '@/helpers/connection'
import React, { useEffect, useRef, useState } from 'react'
import { HiOutlineUserCircle } from "react-icons/hi"
import { BsFillChatLeftDotsFill, BsFillCircleFill } from "react-icons/bs"
import Userbox from '@/components/Userbox'
import UserList from '@/components/UserList'
import Body from '@/components/Body'
import { atom, useAtom } from 'jotai'

export type SendMessage = {
    type: "send_message" | "change_room",
    payload: {
        username: string,
        roomname: string,
        message: string,
        clientList?:string[]
    }
}

export const messages = atom<SendMessage[]>([])
export const connAtom = atom<any>(null)
export const clients = atom<string[]>([])

const Room = () => {
    // const [messageList, setMessageList] = useState<data[]>([])
    const [messageList, setMessageList] = useAtom(messages)
    const [userList, setUserList] = useAtom(clients)
    const [username, setUsername] = useState<string>("")
    const [roomname, setRoomname] = useState<string>("")
    const conn = useRef<any>(null)
    const [c,setC] = useAtom(connAtom)
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
        setC(conn.current)
        conn.current.onopen = onOpen
        conn.current.onclose = onClose
        conn.current.onerror = onError
        conn.current.onmessage = handleIncommingMessage

        return () => {
            conn.current.close()
        }

    }, [])
    return (
        <div className='w-full h-[100vh] flex'>
            <UserList />
            <Body />
        </div>

    )
}

export default Room