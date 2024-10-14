import React, { useEffect, useState } from 'react'
import TopProfile from '../components/TopProfile'
import SinglePost from '../components/SinglePost'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectToken, selectUser } from '../state/socialSlice'
import { getUsers } from '../api/users'
import Skelton from '../components/Skelton'
import { usePosts } from '../api/posts'

const Profile = () => {

  const [userProfile, setUserProfile] = useState({})
  const [userPosts, setUserPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const token = useSelector(selectToken)
  const posts = usePosts(token)
  const users = getUsers()
  const user = useSelector(selectUser)
  const { userName } = useParams()

  useEffect(()=>{
    if (Object.keys(users).length > 0) {
      users.find(user => {
        if (userName === `${user.firstName}-${user.lastName}`) {
          setUserProfile(user)
        }
      }
      )
    }
  }, [users])

  useEffect(() => {
    if (posts) {
      const newPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setUserPosts(newPosts?.filter(post => post.postOwner?._id === userProfile._id ))
    }
  }, [posts, userProfile])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 20000)
  }, [])

  return (
    <div className=' max-w-4xl w-full h-full mx-auto py-10 lg:px-20 md:px-24 sm:px-8 px-4'>
        <TopProfile 
            user={userProfile}
        />
        <br />
        <div className=' flex flex-col gap-8'>
            {Object.keys(userPosts).length > 0 ? userPosts.map((post, index) => (
              <SinglePost 
                key={index}
                currentPost={post}
                showRemoveButton={post.postOwner?._id === user._id ? true : false}
              />
            ))
            :
            loading ?
              <>
                <Skelton />
                <Skelton />
                <Skelton />
              </>
            :
            <div className='w-full flex justify-center items-center bg h-72'>
              <h1 className='text-xl font-medium text-red-500 dark:text-gray-300'>No Posts Yet</h1>
            </div>
          }
        </div>
    </div>
  )
}

export default Profile