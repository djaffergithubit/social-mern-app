import React, { useEffect, useRef, useState } from "react"
import { FaImage } from "react-icons/fa"
import { IoMdSend } from "react-icons/io"
import { FaCircleCheck } from "react-icons/fa6"
import 
{ 
  selectMessages, 
  selectUser, 
  selectToken, 
  setChatMessages, 
  selectChatMessages,
  addMessage,
  setUserNotifications,
  selectMode
} from "../state/socialSlice"
import { useSelector, useDispatch } from "react-redux"
import { socket } from "../socket"
import { useChats } from "../api/chats"
import { getMessages, handleFileUpload } from "../api/messages"
import { BiMessageDetail } from  "react-icons/bi"
import { AiFillMessage } from "react-icons/ai";
import Banner from "./Banner"
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { isImage } from "../utils/isImageUrl"
import { getAllNotifications } from "../api/notifications"
import userPicture from "../assets/icons/user.png"

const Messages = ({ currentChat }) => {

    const [picture, setPicture] = useState(null)  
    const [newMessage, setNewMessage] = useState('')
    const [chat, setChat] = useState({})
    const [participant, setParticipant] = useState({})
    const mode = useSelector(selectMode)
    const token = useSelector(selectToken)
    const chats = useChats(token)
    const user = useSelector(selectUser)   
    const messages = useSelector(selectMessages)
    const chatMessages = useSelector(selectChatMessages)
    const dispatch = useDispatch()

    getMessages(currentChat)

    useEffect(()=>{
        socket.on('connect',() => {
            console.log('client connected')
        })

        socket.on('private message', (data) => {
          if (data.content !== '') {
            dispatch(addMessage(data))
          }
        })

        return () => {
            socket.off('connect')
            socket.off('private message')
        }
    }, [messages])

    useEffect(()=>{
        socket.emit("join chat", currentChat);
        setChat(chats?.find(chat => chat._id === currentChat))
        dispatch(setChatMessages(messages?.filter(message => message.chat === currentChat)))
        getAllNotifications(dispatch, token, user)
    }, [currentChat, messages])

    useEffect(()=>{
      if (chat) {
        setParticipant(chat?.participants?.find(participant => participant._id !== user._id))
      }
    }, [chat])

    const scrollRef = useRef(null);

    useEffect(() => {
      if (scrollRef.current) {
        setTimeout(() => {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }, 0);
      }
    }, [chatMessages, currentChat]);

    const sendMessage = (e) => {
      e.preventDefault()
      socket.emit('private message', { chat: currentChat, content: newMessage, messageSender: {_id:user._id, userName: user.userName, picture: user.picture}})
      setNewMessage('')
    }

    const SendImage = async (e) => {
      e.preventDefault()
      let content = null
      if (picture) {
        const imageUrl = await handleFileUpload(picture);
        if (imageUrl) {
            content = imageUrl;  
        } else {
            return;  
        }
      }

      socket.emit('private message', { chat: currentChat, content, messageSender: {_id:user._id, userName: user.userName, picture: user.picture}})
      setPicture(null)
    }

    useEffect(() => {
      if (picture) {
        setPicture(null)
      }
    }, [currentChat])

  return ( 
  <>
  {currentChat.length > 0 ? (<div className={`flex flex-col max-w-4xl w-full h-full flex-8 rounded-md sticky top-0 ${mode === 'dark' ? 'bg-grey-800': 'bg-white'}`}>
      <div className=" flex items-center justify-start gap-1 py-3 mx-1.5 border-b-[1px] border-grey-700">
          <img className=" w-12 h-12 rounded-full" src={`${participant?.picture ? `http://localhost:4000/uploads/${participant?.picture}` : userPicture}`} alt="" loading="lazy" />
          <h5 className={` text-16 ${mode === 'dark' ? 'text-white': 'text-gray-900 font-medium'} `}>{participant?.userName}</h5>
          <FaCircleCheck className=" text-blue-500 text-20" />
      </div>
    <div className="flex-grow overflow-y-auto h-[350px]" ref={scrollRef}>
        {
          Object.keys(chatMessages).length > 0 ? (<div className="flex flex-col space-y-2 p-4">
          {<div className={` flex flex-col gap-3 w-full items-center self-start text-16`}>
            {chatMessages?.map((message, index) => (
              <div key={index} className={`flex items-start w-full ${message.messageSender._id === user._id && ' flex-row-reverse '} gap-1.5`}>
                <img className={` w-9 h-9 rounded-full  ${chatMessages[index-1]?.messageSender._id === message.messageSender._id && 'hidden'}`} src={`${message.messageSender.picture ? `http://localhost:4000/uploads/${message.messageSender.picture}` : userPicture}`} alt="" />
                  {isImage(message.content) ? 
                    (
                      <div className={`rounded-xl ${message.messageSender._id === user._id ? 'self-end': 'self-start'} ${message.messageSender._id === user._id && chatMessages[index-1]?.messageSender._id === user._id && 'mr-9'} ${message.messageSender._id !== user._id && chatMessages[index-1]?.messageSender._id === message.messageSender._id && 'ml-9' }`}>
                        <img src={`http://localhost:4000/uploads/${(message.content).slice(9)}`} className=" w-40 h-40 rounded-xl" alt="" />
                      </div>
                    )
                      :
                    (
                      <div className={`rounded-xl rounded-tr py-1 px-3 font-medium ${message.messageSender._id === user._id ? `self-end ${mode === 'dark' ? 'bg-green-900 text-grey-200' : ' bg-blue-500 text-white'}` : `self-start ${mode === 'dark' ? ' bg-grey-200 text-grey-800' : ' bg-purple-500 text-white'}`} ${message.messageSender._id === user._id && chatMessages[index-1]?.messageSender._id === user._id && 'mr-9'} ${message.messageSender._id !== user._id && chatMessages[index-1]?.messageSender._id === message.messageSender._id && 'ml-9' }`}>
                        <p>{message.content}</p>
                      </div> 
                    )
                  }
                    
              </div>
            )) }
          </div>}
      </div>)
      :
        <Banner />
      }
    </div>   
    {!chat?.blocked ?
      <form className="flex items-center p-4 gap-2" onSubmit={sendMessage}>
        <div className="w-full relative">
            <input 
              type="text"
              placeholder="Type your message..." 
              name='newMessage' 
              onChange={(e)=>setNewMessage(e.target.value)} 
              value={newMessage} 
              className={`w-full rounded-lg px-4 py-1.5 border-[1px] outline-none text-16 focus:border-[1.5px] focus:border-blue-500  ${mode === 'dark' ? 'bg-grey-800 text-white border-grey-600': ' bg-white text-gray-900 border-blue-500'}`} 
            />
            <button className={`absolute right-0 text-grey-200  text-24 h-full border-y-[1px] mr-2 ${mode === 'dark' ? 'bg-grey-800 border-grey-600': ' bg-white border-blue-500'}`} type="submit"><IoMdSend /></button>
        </div>
        <div className=" relative">
          <input className="hidden" type="file" name="picture" id="picture" onChange={(e)=>setPicture(e.target.files[0])} />
          <label htmlFor="picture"><FaImage className={` text-32 cursor-pointer ${mode === 'dark' ? ' text-white': ' text-blue-600'}`} /></label>
        </div>
      </form>
      :
      <div className="flex items-center justify-center h-full py-2.5 bg-blue-600">
        <h5 className=" text-16 text-white ">You can't reply to this conversation</h5>
      </div>
      }
    {picture && (
        <form className=" absolute top-0 h-full w-full flex flex-col justify-evenly items-center bg-gray-800 bg-opacity-65 p-4" onSubmit={SendImage} encType="multipart/form-data">
          <p className=" flex justify-end items-end w-full cursor-pointer" onClick={() => setPicture(null)}><AiTwotoneCloseCircle className=" text-3xl" /></p>
            <div className="p-4 flex flex-col justify-center items-center">
              <img src={URL.createObjectURL(picture)} alt="Preview" className=" max-w-96 max-h-96 w-full h-full object-cover rounded-lg border-blue-600 border-solid border-2" />
              <div className=" w-full flex justify-start items-start">
                <button type="submit" className=" px-4 py-0.5 rounded-lg text-lg text-white bg-blue-600 mt-3">Send</button>
              </div>
            </div>
        </form>
      )}
    </div>)
    :
    (<div className=" min-h-screen h-full flex-8 flex flex-col justify-center items-center gap-2 sticky top-0">
      <div className="flex">
        <BiMessageDetail className="text-white sm:text-9xl text-7xl leading-0" />
        <AiFillMessage className="text-white sm:text-5xl text-3xl self-end" />
      </div>
      <h5 className={`sm:text-20 text-16 ${mode === 'dark' ? 'text-grey-400 ': 'text-grey-900 '}`}>Select a conversation to Start messaging</h5>
    </div>)
}
  </>

  )
}

export default Messages