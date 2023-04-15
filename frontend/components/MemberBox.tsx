import React from 'react'
import { BsFillCircleFill } from 'react-icons/bs'
import NameBox from './NameBox'

type props = {
    name: string
}

const MemberBox = ({name}:props) => {
  return (
    <div key = {name} className="flex p-4 py-6 items-center border-white/20">
    <NameBox size = "big" name = {name} />
    <div className="flex gap-1 flex-col text-xl ml-4">
        <b>{name}</b>
        <BsFillCircleFill className='text-green-500 text-sm' />
    </div>
</div>
  )
}

export default MemberBox