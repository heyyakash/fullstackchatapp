import { onClose } from '@/helpers/connection'
import React, { useEffect, useState } from 'react'
import UserList from '@/components/UserList'
import Body from '@/components/Body'
import { atom, useAtom } from 'jotai'
import onMessage from '@/helpers/onMessage'
import { useRouter } from 'next/router'
import { rname, uname } from '@/Atoms/userAtom'
import { SendMessage } from '@/helpers/events'
import { clients } from '@/Atoms/clientsAtom'
import { messages } from '@/Atoms/messagesAtom'
import { connAtom } from '@/Atoms/websocketAtom'



const Room = () => {
    const [userList,setUserList] = useAtom(clients)
    const [messageList, setMessageList] = useAtom(messages)
    const [username] = useAtom(uname)
    const [roomname] = useAtom(rname)
    const [loading, setLoading] = useState<boolean>(true)
    const [c, setC] = useAtom(connAtom)
    const router = useRouter()


    const onOpen = (connection:WebSocket) => {
        console.log("Connection Established")
        const payload: SendMessage = {
            type: "change_room",
            payload: {
                username: username,
                message: `${username} has joined the room`,
                roomname: roomname
            }
        }
            connection.send(JSON.stringify(payload))
    }


    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("chat-user") as string)
        if (!user) router.push('/')
        else{
            const connection = new WebSocket(process.env.NEXT_PUBLIC_HOST as string)
            connection.onopen = () => onOpen(connection)
            connection.onclose = onClose
            connection.onmessage = (e) => {
                onMessage(e,messageList,setMessageList,setUserList)
            }
            setC(connection)
            setLoading(false)
            return () => {
                connection.close()
            }
        }


    }, [])



    if (!loading) {
        return (
            <div className='w-full h-[100vh] flex'>
                <UserList />
                <Body />
            </div>

        )
    }
    return(
        <div className='w-full h-[100vh] text-white text-2xl font-bold grid place-items-center'>
            Loading....
        </div>
    )
}

export default Room