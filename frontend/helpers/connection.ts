export const onOpen = () => {
    console.log("Connection Established")
}

export const onError = () => {
    console.log("Error Occured")
}

export const onMessage = (e:any) => {
    console.log(e)
}

export const onClose = () => {
    console.log("Connection Closed")
}



export const setupConnection = () => {
    const conn = new WebSocket("ws://localhost:8080/ws/chat")
    conn.onopen = onOpen
    conn.onerror = onError
    conn.onclose = onClose
    conn.onmessage = onMessage
    return conn
}