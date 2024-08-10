import React from 'react'
import { UserIcon } from '../assets'

const Navbar = () => {
  return (
    <div className='flex w-full h-16 justify-between p-3 border shadow-lg'>
        <div className="flex text-3xl font-bold cursor-pointer">
            Medley - Music Player
        </div>
        <div className="flex">
            <img src={UserIcon} alt="User Profile" className='flex h-10 w-10'/>
        </div>
    </div>
  )
}

export default Navbar