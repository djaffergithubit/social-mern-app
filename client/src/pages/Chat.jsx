import React from 'react'
import Messages from '../components/Messages'
import MyChats from '../components/MyChats'

const Chat = ({ currentChat, setCurrentChat }) => {

  return (
    <section className=' flex justify-center items-center min-h-screen'>
      <div className='md:flex items-start gap-2 py-10 lg:px-20 md:px-20 sm:px-8 px-4 w-full h-full'>
        <MyChats
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
         />
         <br />
        <Messages 
          currentChat={currentChat}
        />
      </div>
    </section>
  )
}

export default Chat