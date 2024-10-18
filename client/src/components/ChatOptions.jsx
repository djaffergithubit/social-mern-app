import React, { useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaUserXmark } from "react-icons/fa6";
import { blockDeblockChat } from '../api/chats';
import { useSelector } from 'react-redux';
import { selectMode, selectToken } from '../state/socialSlice';

const ChatOptions = ({ 
    firstName, 
    lastName, 
    setHovered, 
    setOpen, 
    setOptionFocused, 
    currentChat }) => {

    const [loading, setLoading] = useState(false)
    const token = useSelector(selectToken)
    const mode = useSelector(selectMode)

    const onBlockClicked = () => {
        setLoading(true)
        setOptionFocused(false)
        blockDeblockChat(token, currentChat)
        setLoading(false)
    }

  return (
    <main className={`px-2 mt-2 ${mode === 'dark' ? 'bg-grey-700 border-gray-400': ' bg-sky-200 border-gray-700'}  rounded-lg absolute left-0 top-full z-50 max-w-sm mx-2 w-full border-[0.5px] `}
        onMouseEnter={() => setHovered(false)}
        onMouseLeave={() => setHovered(true)}
    >
        <ul className={`flex flex-col gap-y-2 py-1.5 ${mode === 'dark' ? 'text-white': ' text-gray-900'}`}>
            <li className={`px-2 py-1 rounded ${mode === 'dark' ? 'hover:bg-white hover:bg-opacity-15' : ' hover:bg-sky-50'}`}>
                <a href={`/profile/${firstName}-${lastName}`} className=' flex items-center'>
                    <FaRegUserCircle className={`${mode === 'dark' ? ' text-gray-200 ': ' text-gray-900'} text-xl`} />
                    <span className=' font-normal text-base tracking-wider ml-3'>See Profile</span>
                </a>
            </li>
            <li className={`flex items-center px-2 py-1 rounded ${mode === 'dark' ? 'hover:bg-white hover:bg-opacity-15' : 'hover:bg-sky-50'} `} onClick={() => {setOptionFocused(false);setOpen(true)}}>
                <FaTrashAlt className={`${mode === 'dark' ? ' text-gray-200 ': ' text-gray-900'} text-lg`} />
                <span className=' font-normal text-base tracking-wider ml-3'>Delete discussion</span>
            </li>
            <li className={`flex items-center px-2 py-1 rounded pb-2 ${mode === 'dark' ? 'hover:bg-white hover:bg-opacity-15' : 'hover:bg-sky-50'}`} onClick={onBlockClicked}>
                <FaUserXmark className={`${mode === 'dark' ? ' text-gray-200 ': ' text-gray-900'} text-2xl`}  />
                <span className=' font-normal text-base tracking-wider ml-3'>{loading ? 'Loading...' : 'Block'}</span>
            </li>
        </ul>
    </main>
  )
}

export default ChatOptions