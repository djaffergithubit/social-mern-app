import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaUserXmark } from "react-icons/fa6";

const ChatOptions = ({ firstName, lastName, setHovered, setOpen, setOptionFocused }) => {

  return (
    <main className=' px-2 mt-2 bg-grey-700 rounded-lg absolute left-0 top-full z-50 max-w-sm mx-2 w-full border-[0.5px] border-gray-400'
        onMouseEnter={() => setHovered(false)}
        onMouseLeave={() => setHovered(true)}
    >
        <ul className=' flex flex-col gap-y-2 py-1.5'>
            <li className=' px-2 py-1 rounded hover:bg-white hover:bg-opacity-15'>
                <a href={`/profile/${firstName}-${lastName}`} className=' flex items-center'>
                    <FaRegUserCircle className=' text-gray-200 text-xl' />
                    <span className=' text-white font-normal text-base tracking-wider ml-3'>See Profile</span>
                </a>
            </li>
            <li className=' flex items-center px-2 py-1 rounded hover:bg-white hover:bg-opacity-15' onClick={() => {setOptionFocused(false);setOpen(true)}}>
                <FaTrashAlt className='text-gray-200 text-lg' />
                <span className=' text-white font-normal text-base tracking-wider ml-3'>Delete discussion</span>
            </li>
            <li className=' flex items-center px-2 py-1 rounded pb-2 hover:bg-white hover:bg-opacity-15'>
                <FaUserXmark className=' text-gray-200 text-2xl' />
                <span className=' text-white font-normal text-base tracking-wider ml-3'>Block</span>
            </li>
        </ul>
    </main>
  )
}

export default ChatOptions