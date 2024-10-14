import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Avatar from './Avatar'
import { useChats } from '../api/chats'
import { useSelector } from "react-redux"
import { selectChatMessages, selectToken, selectUser, selectUserNotifications } from '../state/socialSlice'
import { getUsers } from '../api/users'
import { socket } from '../socket'
import AVatarSkelton from './AVatarSkelton'

const MyChats = ({ currentChat, setCurrentChat }) => {

  const token = useSelector(selectToken)
  const user = useSelector(selectUser)
  const allUsers = getUsers()
  const users = allUsers?.filter(u => u._id !== user._id)
  const chats = useChats(token)
  const chatMessages = useSelector(selectChatMessages)
  const userNotifications = useSelector(selectUserNotifications)
  const [usersResult, setUsersResult] = useState([])
  const [searchUser, setSearchUser] = useState('')
  const [userChats, setUserChats] = useState([])
  const [lastMessages, setLastMessages] = useState([])

  useEffect(()=>{
      setUserChats(chats?.filter(chat => chat.participants.find(participant => participant._id === user._id )))
  }, [chats])

  useEffect(()=>{
      if (searchUser.length > 0) {
        setUsersResult(
          users?.filter(user =>
            user.userName.toLowerCase().includes(searchUser.toLowerCase())
            || user.firstName.toLowerCase().includes(searchUser.toLowerCase())
            || user.lastName.toLowerCase().includes(searchUser.toLowerCase()))
        )
      }else{
        setUsersResult([])
      }

  }, [searchUser])

  useEffect(()=>{
    socket.on('last message', (data) => {
      const { lastMessage, chat } = data
      setLastMessages(prevLastMessages => {
        const currentState = [...prevLastMessages]
        const chatFind = currentState.find(element => element.chat === chat)
        if (!chatFind) {
          return[
            ...prevLastMessages,
            data
          ]
        }else{
          chatFind.lastMessage = lastMessage
          return currentState
        }
      })
    })
  }, [chatMessages])

  return (
    <div className=' md:w-full flex-4 max-w-md flex flex-col mx-auto'>
        <h5 className=' text-16 text-grey-200 font-medium text-start'>Your Conversations</h5>
        <form action="" className=' flex items-center gap-1.5 w-full mb-2'>
            <input 
                className='px-2 py-1 text-14 bg-grey-900 border-[1.5px] border-grey-700 rounded-lg w-full outline-none text-white' 
                type="text" 
                name="searchUser" 
                id="" 
                placeholder='Search a user' 
                onChange={(e) => setSearchUser(e.target.value)} 
                value={searchUser} 
              />
            <button type='submit' className=' px-3 py-2 rounded-md bg-grey-800 border-[1px] border-grey-700 text-16 text-white'><FaSearch /></button>
        </form>
        {Object.keys(usersResult).length > 0 && <div className='flex flex-col items-start gap-3'>
          {usersResult.map((user, index) => (
            <Avatar 
              key={index}
              user={user}
              messages={true}
              setUsersResult={setUsersResult}
              setSearchUser={setSearchUser}
              forChat={true}
            />
          )) 
          }
        </div>}

        {!searchUser.length > 0 && <div className=' flex flex-col gap-3'>
          {userChats ? userChats.map((chat, index) => (
            <div className='' key={index}>
              <Avatar
                isActiveChat={currentChat === chat._id}
                user={{
                  userName: chat.participants.find(participant => participant._id !== user._id).userName,
                  firstName: chat.participants.find(participant => participant._id !== user._id).firstName,
                  lastName: chat.participants.find(participant => participant._id !== user._id).lastName,
                  picture: chat.participants.find(participant => participant._id !== user._id).picture,
                }}
                content={
                  lastMessages.find(msg => msg.chat === chat._id) ? 
                  `${lastMessages.find(msg => msg.chat === chat._id)?.lastMessage}` 
                  : chat.lastMessage 
                  ? chat.lastMessage
                  : 
                  `${chat.participants.find(participant => participant._id !== user._id).firstName} ${chat.participants.find(participant => participant._id !== user._id).lastName}`
                }
                style={`${userNotifications?.find(notification => notification.chat._id === chat._id) ? 'text-white font-medium' : ''}`}
                messagesLength={userNotifications.length > 0 ? userNotifications.filter(notification => notification.chat._id === chat._id)?.length : 0}
                forChat={true}
                setCurrentChat={setCurrentChat}
                chatId={chat._id}
              />
            </div>
          ))
          :
          (
            <AVatarSkelton />
          )
        }
        </div>}
    </div>
  )
}

export default MyChats