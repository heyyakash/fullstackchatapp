import { useRouter } from "next/router"


export const onOpen = () => {
    console.log("Connection Established")
}

export const onError = () => {

    const router = useRouter()
    router.push("/")
}



export const onClose = () => {
    console.log("Connection Closed")
}



export const setupConnection = () => {
    const conn = new WebSocket("ws://localhost:8080/ws/chat")
    conn.onopen = onOpen
    conn.onerror = onError
    conn.onclose = onClose
    // conn.onmessage = onMessage
    return conn
}