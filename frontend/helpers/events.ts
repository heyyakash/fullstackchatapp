export type SendMessage = {
    type: "send_message" | "change_room",
    payload: {
        username: string,
        roomname: string,
        message: string,
    }
}

export type ReceivedMessage = SendMessage & {
    payload:{
        clientList: string[]
    }    
}
