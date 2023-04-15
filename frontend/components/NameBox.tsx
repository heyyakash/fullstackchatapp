import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { uname } from './Body'

const NameBox = ({ name, size }: { name: string, size: string }) => {

    const [user,setUser] = useAtom(uname)
    const arr = ["bg-red-500", "bg-yellow-500", "bg-pink-500", "bg-blue-500"]
    const [color, setColor] = useState<string | null>(null)
    useEffect(() => {
        const randomColor = Math.floor(Math.random() * arr.length);
        setColor(arr[randomColor])
    }, [])
    if (color && name && size) {
        return (
            <div className={`${size === "small" ? "h-12 w-12" : "h-14 w-14"} ${user===name?"user-gradient":color} capitalize font-extrabold shadow-lg shadow-white/20 grid place-items-center rounded-full  `}>{name.charAt(0)}</div>
        )
    }
    return <></>
}

export default NameBox