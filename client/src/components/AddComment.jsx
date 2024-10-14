import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectMode, selectToken } from '../state/socialSlice'
import { addComment } from '../api/comments'

const AddComment = ({ postId }) => {

    const [newComment, setNewComment] = useState('')
    const token = useSelector(selectToken)
    const mode = useSelector(selectMode)

    const handleCommentSubmit = (e) => {
      e.preventDefault()
      addComment(newComment, postId, token)
      setNewComment('')
    }

  return (
    <form className={`flex items-center justify-between relative py-2 border-y-[1px] ${mode === 'dark' ? 'border-grey-700 text-white': 'border-grey-300 text-grey-500'} `} onSubmit={handleCommentSubmit}>
        <input 
          className={` py-3 px-2 ${mode === 'dark' ? ' bg-grey-900': 'bg-grey-50'}   text-sm outline-none w-full`} 
          type="text" 
          name='newComment'
          placeholder=' 👌 Get the app to like, reply and post' 
          onChange={(e)=>setNewComment(e.target.value)}
          value={newComment}
        />
        <button type='submit' className=' bg-grey-600 px-3 py-1 rounded-lg text-sm text-white absolute right-0'>Comment</button>
    </form>
  )
}

export default AddComment