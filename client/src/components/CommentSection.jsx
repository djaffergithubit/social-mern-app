import React from 'react'
import Avatar from './Avatar'
import { useSelector } from 'react-redux'
import { selectMode } from '../state/socialSlice'

const CommentSection = ({ commentOwner, content }) => {

  const mode = useSelector(selectMode)

  return (
    <div className={`py-2 border-y-[1px] ${mode === 'dark' ? 'border-grey-700': 'border-grey-300'}  flex items-center justify-start `}>
      <Avatar 
        user={commentOwner}
        content={content}
      />
    </div>
  )
}

export default CommentSection