import React, { useEffect } from 'react'
import Posts from '../components/Posts'
import RightSideBar from '../components/RightSideBar'

const Home = ({ setCurrentChat }) => {

  useEffect(() => {
    setCurrentChat('')
  }, [])

  return (
    <div className=' lg:flex items-start space-x-10 py-10 lg:px-20 md:px-20 sm:px-8 px-4'>
      <Posts />
      <RightSideBar />
    </div>
  )
}

export default Home