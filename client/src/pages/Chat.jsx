import React, { useEffect, useState } from 'react'
import Messages from '../components/Messages'
import MyChats from '../components/MyChats'
import MyLoader from '../components/MyLoader'

const Chat = ({ currentChat, setCurrentChat }) => {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentChat !== '') {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [currentChat])

  return (
    <section className=' flex justify-center items-center min-h-screen'>
      <div className='md:flex items-start gap-2 py-10 lg:px-20 md:px-20 sm:px-8 px-4 w-full h-full'>
        <MyChats
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
         />
         <br />
        {!loading ? <Messages 
          currentChat={currentChat}
        />        
          :
        <div className='flex justify-center items-center max-w-4xl flex-8 w-full h-[450px]'>
              <MyLoader 
                  width={50}
                  height={50}
              />
        </div>}
      </div>
    </section>
  )
}

export default Chat