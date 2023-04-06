import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

// const inter = Inter({ subsets: ['latin'] })

type SendMessage =  {
  type :string,
  payload : {
    username :string,
    roomname :string,
    message :string
  }
}

export default function Home() {
  const [conn,setConn] = useState<any>({})

  const sendMessage = () => {
    const test:SendMessage = {
      type:"send_message",
      payload:{
        username:"heyyitsakash",
        roomname:"newroom",
        message:"Hello! This is a test message"
      }
    }
    // console.log(conn)
    conn.send(JSON.stringify(test))
  }

  const onClose = (e:any) => {
    console.log("Connection closed")
  }

  const onMessage = (e:any) => {
    console.log(JSON.parse(e.data))
  }

  const setupWS = () => {
    const conn = new WebSocket("ws://localhost:8080/ws/chat")
    conn.onopen = () => {
      setConn(conn)
      console.log("Connection Established")
    }
    conn.onerror = () => {
      console.log("Error Occuered")
    }

    conn.onclose = onClose
    
    conn.onmessage = onMessage
    
  } 

  useEffect(()=>{
    setupWS()
  },[])
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <button onClick={()=>sendMessage()}>test</button>
      </main>
         </>
  )
}
