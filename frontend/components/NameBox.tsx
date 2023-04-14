import React, { useEffect, useState } from 'react'

const NameBox = ({ name, size }: { name: string, size: string }) => {
    const arr = ["bg-red-500", "bg-yellow-500", "bg-pink-500", "bg-blue-500"]
    const [color, setColor] = useState<string | null>(null)
    useEffect(() => {
        const randomColor = Math.floor(Math.random() * arr.length);
        setColor(arr[randomColor])
    }, [])
    if (color && name && size) {
        return (
            <div className={`${size === "small" ? "h-12 w-12" : "h-14 w-14"} ${color} capitalize font-bold shadow-lg shadow-white/20 grid place-items-center rounded-full  `}>{name}</div>
        )
    }
    return <></>
}

export default NameBox