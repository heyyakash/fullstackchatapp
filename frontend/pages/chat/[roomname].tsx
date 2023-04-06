import { data } from '@/components/Create'
import { setupConnection } from '@/helpers/connection'
import React, { useEffect } from 'react'

type SendMessage = {
    type: "send_message" | "change_room",
    payload: {
        username: string,
        roomname: string,
        message: string
    }
}

const Room = () => {

    useEffect(() => {
        const userdata: data = JSON.parse(localStorage.getItem("chat-user") as string)
        const conn = setupConnection()
        conn.onopen = () => {
            const payload: SendMessage = {
                type: "change_room",
                payload: {
                    username: userdata.username,
                    message: `${userdata.username} has joined the room`,
                    roomname: userdata.username
                }
            }
            conn.send(JSON.stringify(payload))
        }
    }, [])
    return (
        <div>Room</div>
    )
}

export default Room