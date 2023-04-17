import { ReceivedMessage } from "./events"

const onMessage = (e: any, messageList:ReceivedMessage[],setMessageList:any, setUserList:any) => {  
    const arr = [...messageList]
    const data = JSON.parse(e.data)
    arr.push(data)
    setUserList(data.payload.clientlist)
    setMessageList((messageList: any) => [...messageList, data])
}

export default onMessage