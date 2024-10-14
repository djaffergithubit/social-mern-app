import React, { useEffect, useState } from 'react'
import commentIcon from '../assets/icons/message-circle.svg'
import refreshIcon from '../assets/icons/refresh-cw.svg'
import shareIcon from '../assets/icons/sharesvg.svg'
import { useSelector } from 'react-redux';
import { selectMode, selectToken, selectUser } from '../state/socialSlice';
import messageCircle from "../assets/icons/message-circle (1).svg";
import refreshIcon1 from "../assets/icons/refresh-ccw.svg";
import shareIcon2 from "../assets/icons/share-2.svg";
import { Link, useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { deletePost, toggleLikePost } from '../api/posts';
import { FaCircleCheck } from 'react-icons/fa6';
import Skelton from './Skelton';
import { useTimePassed } from '../utils/useTimePassed';
import { useComments } from '../hooks/useComments';
import { socket } from '../socket';
import userPicture from '../assets/icons/user.png';
import MyLoader from './MyLoader';

const SinglePost = ({ currentPost, showRemoveButton }) => {

  const user = useSelector(selectUser)
  const mode = useSelector(selectMode)
  const [postComments, setPostComments] = useState([])
  const [showAllContent, setShowAllContent] = useState(false)
  const [loading, setLoading] = useState(false)
  const token = useSelector(selectToken)
  const [comments, setComments] = useComments(token)
  const timePassed = useTimePassed(currentPost)

  useEffect(() => {
    if (comments) {
      setPostComments(comments?.filter(comment => comment.commentedPost === currentPost._id))
    }
  }, [comments])

  useEffect(() => {
    socket.on('newComment', (data) => {
      if (data) {
        console.log('data', data.comments);
        setComments(data.comments)
      }
    })

    return () => {
      socket.off('newComment')
    }
  }, [])

  const handleHeartClick = () => {
    setLoading(true)
    toggleLikePost(token, currentPost._id)
    .then(() => {
      setLoading(false)
    })
    .catch(() => {
      setLoading(false)
    })
  }

  const removePost = () => {
    deletePost(token, currentPost._id)
  }

  return (
    <>
        { Object.keys(currentPost).length > 0 ? (<div key={currentPost?._id} className=' w-full h-full flex flex-col'>
          <div className={`flex ${currentPost.postImage ? 'items-start' : ' items-center'} gap-4 h-full w-full`}>
            <Link to={`/profile/${currentPost?.postOwner?.firstName}-${currentPost?.postOwner?.lastName}`}>
                <img className="w-14 h-14 rounded-full object-cover flex-1" src={ currentPost?.postOwner?.picture ? `http://localhost:4000/uploads/${currentPost?.postOwner?.picture}` : userPicture} loading='lazy' alt="" /> 
            </Link>

            <div className=' w-full flex-11'>
              <div className=' flex items-center justify-between mb-1'>
                <div className=' flex items-center gap-1'>
                  <p className={` ${mode === 'dark' ? 'text-white': 'text-grey-900 font-medium'} leading-none text-16`}>{currentPost.postOwner?.userName}</p>
                  <FaCircleCheck className=" text-blue-500 text-20 mb-1" />
                </div>
                <div className=' flex items-center gap-2'>
                  <span className={`text-sm ${mode === 'dark' ? 'text-grey-500': 'text-gray-400'}`}>{timePassed}</span>
                  {showRemoveButton && <FaRegTrashAlt className={` text-16 ${mode === 'dark' ? 'text-white': ' text-grey-600'} cursor-pointer`} onClick={removePost} />}
                </div>
              </div>
              {currentPost.postImage && 
                ((currentPost.content).length <= 200 ? 
                  <p className={` ${mode === 'dark' ? 'text-grey-100': 'text-grey-500'}  leading-none text-20 text-start`}>{currentPost.content}</p>
                  :
                  <p className={` ${mode === 'dark' ? 'text-grey-100': ' text-gray-900 '} sm:font-medium text-start text-base mt-4`}>{
                    !showAllContent ? 
                      <>
                        {currentPost.content.substring(0, 200)}... <span className=' text-blue-500 font-medium text-base cursor-pointer' onClick={() => setShowAllContent(true)} >More</span>
                      </>
                    :
                    <>
                      {currentPost.content} <span className=' text-blue-500 font-medium text-base cursor-pointer' onClick={() => setShowAllContent(false)}>Less</span>
                    </>
                  }
                  </p>
                )
              }
            </div>

          </div>

          <section className=' flex'>
            <div className=' flex-0.5 w-full'></div>
            <div className=' flex-11.5 w-full h-full flex items-center mt-4 border-l-2 border-grey-700 gap-4'>
              <div className='flex-0.5'></div>
              <div className=' flex-11.5 w-full'>
                {currentPost.postImage ? <Link to={`/post/${currentPost._id}`}>
                  <img className={`  rounded-lg border-[1px] border-solid ${mode === 'dark' ? 'border-grey-50': 'border-grey-500'} max-h-[400px] w-full`} src={`http://localhost:4000/uploads/${currentPost.postImage}`} loading='lazy' alt="" />
                </Link>
                :
                (currentPost.content).length <= 200 ?
                <div className={` px-5 flex items-center justify-center rounded-lg border-[1px] border-solid ${mode === 'dark' ? 'border-grey-50': 'border-grey-500'} lg:h-[400px] md:h-[300px] h-[200px] w-[full] post-background`}>
                  <p className={` ${mode === 'dark' ? 'text-grey-300': ' text-gray-300 '} text-20`}>{currentPost.content}</p>
                </div>
                :
                  <p className={` ${mode === 'dark' ? 'text-grey-100': ' text-gray-900 '} sm:font-medium text-start text-base`}>{
                    !showAllContent ? 
                      <>
                        {currentPost.content.substring(0, 200)}... <span className=' text-blue-500 font-medium text-base cursor-pointer' onClick={() => setShowAllContent(true)} >More</span>
                      </>
                    :
                    <>
                      {currentPost.content} <span className=' text-blue-500 font-medium text-base cursor-pointer' onClick={() => setShowAllContent(false)}>Less</span>
                    </>
                  }
                  </p>}

                <div className=' flex items-center space-x-2.5 mt-4'>
                  {!loading ? 
                    <svg className=' cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" onClick={handleHeartClick}>
                      <path stroke={`${currentPost.likes.includes(user._id) ? 'red': mode === 'dark' ? '#f0f0f0' : '#1A1A1A'}`} fill={`${currentPost.likes.includes(user._id)  ? 'red': 'none'}`} strokeWidth='2' d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    :
                    <MyLoader />
                  }

                  <Link to={`/post/${currentPost._id}`}>
                    {mode === 'dark' ? <img className=' cursor-pointer' src={commentIcon} loading='lazy' alt="" /> : <img className=' cursor-pointer' src={messageCircle} loading='lazy' alt="" />}
                  </Link>
                  {mode === 'dark' ? <img className=' cursor-pointer' src={refreshIcon} loading='lazy' alt="" /> : <img className=' cursor-pointer' src={refreshIcon1} loading='lazy' alt="" />}
                  { mode === 'dark' ? <img className=' cursor-pointer' src={shareIcon} loading='lazy' alt="" /> : <img className=' cursor-pointer' src={shareIcon2} loading='lazy' alt="" />}
                </div>
              </div>
            </div>
          </section>

          <div className=' flex items-start text-16 mt-2  gap-4'>
            <div className=' flex flex-wrap justify-center flex-1 w-full'>
              <span className='text-center text-20'>😌</span>
            </div>
          
            <div className={`${mode === 'dark' ? 'text-grey-500': 'text-grey-400'} text-start text-16 flex-11 w-full`}>
              {postComments ? postComments.length : '0'} replies - {currentPost.likes.length} likes
            </div>
          </div>
          
        </div>)
        :
        (
          <Skelton />
        )
        }
    </>
  )
}

export default SinglePost

