import React from 'react'
import { BsFillCircleFill } from 'react-icons/bs'
import { HiOutlineUserCircle } from 'react-icons/hi'

const Userbox = ({ username }: { username: string }) => {
    return (
        <div className='h-[70px] px-4 gap-3  bg-white/20  dark:text-white flex items-center'>
            <HiOutlineUserCircle className='text-4xl' />
            <div className='flex flex-col'>
                <p className='text-lg'>{username}</p>
                <p className='flex items-center gap-2 text-[.65rem] opacity-60'><BsFillCircleFill className='text-green-500' /> Online</p>

            </div>
            {/* <button className='bg-red-600 px-3 py-1 button rounded-lg ml-auto hover:bg-white hover:text-red-600'>Leave</button> */}
        </div>
    )
}

export default Userbox