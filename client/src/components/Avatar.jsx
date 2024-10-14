import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectMode, selectToken, selectUser } from '../state/socialSlice'
import { FaCircleCheck } from 'react-icons/fa6'
import { createNewChat } from '../api/chats'
import icon2 from "../assets/icons/more-horizontal (1).svg"
import icon from "../assets/icons/more-horizontal.svg"
import ChatOptions from './ChatOptions'
import DeleteConfirm from './DeleteConfirmation'
import userPicture from '../assets/icons/user.png'

const Avatar = ({ 
    user, 
    content, 
    messages, 
    setUsersResult, 
    setSearchUser, 
    style, 
    messagesLength,
    isActiveChat,
    forChat,
    setCurrentChat,
    chatId, 
 }) => {

    const [hovered, setHovered] = useState(false)
    const [optionHovered, setOptionHovered] = useState(false)
    const [optionFocused, setOptionFocused] = useState(false)
    const [open, setOpen] = useState(false)

    const mode = useSelector(selectMode)
    const token = useSelector(selectToken)
    const currentUser = useSelector(selectUser)

    const avatarClicked = (chat) => {
        if (messages) {
            createNewChat(token, false, [user._id], 'chat')
            .then((res) => {
                setUsersResult([])
                setSearchUser('')
            })
            .catch((err)=> {
                console.log(err);
            })
        }else{
            console.log('no messages');
        }

        setCurrentChat(chat)
        setOptionFocused(false)
    }

    useEffect(() => {
        console.log('focused', user);
    }, [user])

    const image = user?.picture !== '' ? `http://localhost:4000/uploads/${user?.picture}` : userPicture


  return (
        <div 
            className={` w-full flex items-center justify-between cursor-pointer ${isActiveChat ? 'bg-white bg-opacity-25 px-4 border-[1px] border-solid rounded-lg' : ''} ${hovered && forChat && 'bg-white bg-opacity-15 px-4 rounded-lg'} py-1.5 relative`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div 
                className=' flex justify-start items-center gap-x-4 cursor-pointer w-full'
                onClick={() => avatarClicked(chatId)}
            >
                <img src={image} className=" w-10 h-10 rounded-full" />
                <div className=' text-start'>
                    <div className=' flex items-center gap-1'>
                        <span className={`block text-14 font-medium ${mode === 'dark' ? 'text-white': 'text-grey-900'}`}>{user?.userName}</span>
                        <FaCircleCheck className=" text-blue-500 text-16" />
                    </div>
                    <span className={`block text-sm ${style? style : mode === 'dark' ? 'text-grey-400': 'text-grey-300'} text-start`}>
                        {
                            !style !== '' && messagesLength > 0 && 
                                <span className='bg-red-600 rounded-full p-0.5 px-1.5 text-sm font-medium'>
                                    {messagesLength <= 9 ? messagesLength : '9+'}
                                </span>
                        } 
                        {
                            !content ? 
                                `${user?.firstName} ${user?.lastName}`
                            : 
                            content.includes('/uploads/') ?
                                `${currentUser._id !== user._id ? user?.userName : 'You'} send you a photo`
                            :
                                (content.length >= 15 ?
                                    `${content.slice(0, 14)} ...`
                                :
                                content)

                        }
                    </span>
                </div>
            </div>
            {forChat && 
            <div 
                className={`${hovered || optionHovered || optionFocused ? ' absolute right-0 mr-3' : 'hidden'} bg-opacity-40 rounded-full px-1 py-1 bg-white`} 
                onMouseEnter={() => {setHovered(false); setOptionHovered(true)}}
                onMouseLeave={() => {setHovered(true); setOptionHovered(false)}}
                onClick={() => setOptionFocused(!optionFocused)}
            >
                {mode === 'dark' ? (<>
                    <img src={icon} alt="" />
                </>)
                :
                (<>
                    <img src={icon2} alt="" />
                </>)}
            </div>}
            {optionFocused && 
            <ChatOptions 
                firstName={user.firstName} 
                lastName={user.lastName} 
                setHovered={setHovered}
                setOpen={setOpen}
                setOptionFocused={setOptionFocused}
            />}
            <DeleteConfirm 
                open={open} 
                setOpen={setOpen} 
                chatId={chatId} 
            />
        </div>
  )
}

export default Avatar