import React, { useEffect, useState } from 'react'
import CreatePost from './CreatePost'
import SinglePost from './SinglePost'
import { usePosts } from '../api/posts'
import { useSelector } from 'react-redux'
import { selectToken } from '../state/socialSlice'
import Skelton from './Skelton'

const Posts = () => {

  const [loading, setLoading] = useState(true)
  const [newPosts, setNewPosts] = useState([])
  const token = useSelector(selectToken)
  const posts = usePosts(token)

  useEffect(() => {

    if (posts) {
      const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setNewPosts(sortedPosts)
    }

    setTimeout(() => {
      setLoading(false)
    }, 20000)

    return () => clearTimeout()
  }, [posts])

  return (
    <div className=' w-full lg:flex-8'>
        <CreatePost />
        <div className=' flex flex-col gap-y-10'>
          {Object.keys(newPosts).length > 0 ? 
          newPosts.map((post, index) => (
            <SinglePost 
              key={index} 
              currentPost={post}
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

export default Posts