import React, { useEffect, useState } from 'react'
import { AiTwotoneMessage, AiFillBell } from 'react-icons/ai'
import { TiTick } from 'react-icons/ti'
import { BsSearch } from 'react-icons/bs'
import { BsFillCircleFill } from 'react-icons/bs'
import NameBox from './NameBox'
import { useAtom, useSetAtom } from 'jotai'
import { clients, messages } from '@/pages/chat/[roomname]'
import { data } from './Create'
import { rname, uname } from './Body'
import MemberBox from './MemberBox'


const UserList = () => {
    const [username,setUsername] = useAtom(uname)
    const [roomname,setRoomname] = useAtom(rname)
    const [users,setUsers] = useAtom(clients) 
    const [search,setSearch] = useState<string>("")


    return (
        <div className='hidden md:flex h-[100vh] w-[25%] bg-black/40 text-white px-6 py-4 flex-col'>
            <div className='h-[80px] flex items-center justify-between px-2'>
                <NameBox size="big" name={username} />
                <AiTwotoneMessage className='text-3xl text-blue-500' />
            </div>
            <div className='bg-slate-400/40 rounded-xl flex flex-col p-2 mt-4'>
                <div className='flex items-center p-3 py-4 gap-4'>
                    <NameBox size='big' name={username} />
                    {/* <div className='grid place-items-center gradient-bg h-14 w-14 rounded-2xl text-2xl font-semibold'>A</div> */}
                    <div className='flex flex-col'>
                        <p className='text-md font-semibold'>{username}</p>
                        <p className='flex items-center text-xs'>
                            <AiFillBell className='text-green-400' />
                            &nbsp; Online
                        </p>
                    </div>
                    <TiTick className='text-2xl text-blue-500 ml-auto' />
                </div>

                <div className='flex items-center p-4 gap-4 border-t-[1px] border-white/20'>
                    <NameBox name={roomname} size = "big" />
                    <div className='flex flex-col justify-center items-start'>
                        <p className='text-lg font-semibold'>{roomname}</p>
                        <p className='flex items-center text-xs'>
                            <AiFillBell className='text-orange-500' />
                            &nbsp; {users.length} Member(s)
                        </p>
                    </div>
                </div>


            </div>


            <div className='mt-4 flex p-2 flex-col gap-3'>
                <h2 className='text-2xl text-white/60'>Members</h2>
                <div className='bg-white/10 rounded-lg gap-3 px-4 flex items-center p-3'>
                    <BsSearch className='text-white/50 text-2xl' />
                    <input value = {search} onChange={(e)=>setSearch(e.target.value)} type="text" className='border-none outline-none placeholder:text-white/50 w-full bg-transparent text-lg' placeholder='Search members' />
                </div>
                <div className="flex flex-col h-full overflow-auto">



                {search.length===0?
                    users.map(x => <MemberBox name = {x} key = {x} />):
                    users.filter(x => x===search).map(y => <MemberBox name = {y} key = {y} />)
                }

                </div>
            </div>


        </div>
    )
}

export default UserList