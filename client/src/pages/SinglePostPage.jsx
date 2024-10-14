import React, { useEffect, useState } from 'react'
import SinglePost from '../components/SinglePost'
import RightSideBar from '../components/RightSideBar'
import CommentSection from '../components/CommentSection'
import AddComment from '../components/AddComment'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectMode, selectToken } from '../state/socialSlice'
import { usePosts } from '../api/posts'
import { useComments } from '../hooks/useComments'
import { socket } from '../socket'

function SinglePostPage() {

  const { postId } = useParams()
  const [loading, setLoading] = useState(true)
  const [postComments, setPostComments] = useState([])
  const [currentPost, setCurrentPost] = useState()
  const token = useSelector(selectToken)
  const posts = usePosts(token)
  const [comments, setComments] = useComments(token)
  const mode = useSelector(selectMode)

  useEffect(() => {
    console.log('comm', comments);
    
    if (comments) {
      setPostComments(comments?.filter(comment => comment.commentedPost === postId))
    }
  }, [comments])

  useEffect(() => {
    socket.on('newComment', (data) => {
      if (data.comments) {
        console.log('data', data.comments);
        setComments(data.comments)
      }
      
    })

    return () => {
      socket.off('newComment')
    }
  }, [])

  useEffect(() => {
    if (posts) {
      setCurrentPost(posts?.find(post => post._id == postId))
    }
  }, [posts])

  useEffect(() => {
    setLoading(false)
  }, [currentPost])

  return (
    <div className=' lg:flex items-start space-x-10 py-10 lg:px-20 md:px-24 sm:px-8 px-4'>
         <div className=' flex-7 flex flex-col h-full'>
            {currentPost && <SinglePost 
                key={postId}
                currentPost={currentPost}
                loading={loading}
            />}
            <br />
            <div className=' mt-4'>
              <AddComment 
                  postId={currentPost?._id}
              />
              {postComments ?
              (<div className='h-72 overflow-y-auto'>{postComments.map((comment) => (
                  <CommentSection 
                    key={comment._id}
                    commentOwner={comment.commentOwner}
                    content={comment.content}
                  />
              ))}
              </div>
              ):
              (
                  <p className={`${mode === 'dark' ? 'text-white': 'text-grey-900 font-medium'} text-start py-4`}>No comments yet</p>
              )
              }
            </div>
        </div>
        <RightSideBar /> 
    </div>
  )
}

export default SinglePostPage