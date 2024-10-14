import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectMode, selectToken, selectUser } from '../state/socialSlice'
import { FaImage, FaPen, FaRegTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { createNewPost } from '../api/posts'
import userPicture from '../assets/icons/user.png'

const CreatePost = () => {

    const mode = useSelector(selectMode)
    const user = useSelector(selectUser)
    const token = useSelector(selectToken)
    const [showInputFile, setShowInputFile] = useState(false)
    const [postForm, setPostForm] = useState({
        image: null,
        text: ''
    })

    const handleChange = (e) => {
        const { name, value, type } = e.target
        setPostForm(prevPostForm => {
            return{
                ...prevPostForm,
                [name]: type === 'file' ? e.target.files[0] : value
            }
        })
    }

    const handlePostSubmit = (e) => {
        e.preventDefault()
        setPostForm({...postForm, image: null, text: ''})
        setShowInputFile(false)
        const formData = new FormData()

        formData.append('postImage', postForm.image)
        formData.append('content', postForm.text)

        createNewPost(token, formData)
    }

    const image = user?.picture ? `http://localhost:4000/uploads/${user.picture}` : userPicture

  return (
    <form action="" className={`${mode === 'dark'? 'bg-grey-800': 'bg-white'} p-[24px] rounded-xl mb-10`} onSubmit={handlePostSubmit}>
        <div className={` flex items-start w-full space-x-8 pb-7 border-b-[1px] ${mode === 'dark' ? 'border-grey-700': 'border-grey-100'}`}>
            {user && 
            <Link to={`/profile/${user.firstName}-${user.lastName}`}>
                <img src={image} className="w-16 h-16 rounded-full flex-1" />
            </Link>
            }
            <div className=' flex flex-col gap-4 w-full flex-11'>
                <input className={` px-10 py-4 rounded-[2rem] text-14 ${mode === 'dark' ? 'text-white bg-grey-700' : ' bg-grey-50 text-grey-700'} outline-none w-full`} 
                    type="text" 
                    placeholder='Whats on your mind...'
                    name='text'
                    onChange={handleChange}
                    value={postForm.text}
                    required
                />
            </div>
        </div>
        {showInputFile && <div className=' p-4 rounded-md border-[1px] border-solid border-grey-400 flex items-center gap-2'>
            <input
                type="file"
                id="fileInput"
                name='image'
                className="hidden"
                onChange={handleChange}
            />
            <label htmlFor="fileInput" className={`custom-file-upload ${mode === 'dark' ? 'text-white': 'text-grey-500'}`}>
                <span className={`${postForm.image !== null && 'flex items-center justify-between w-full'}`}>{postForm.image === null ? 'Add Image here' : postForm.image?.name} {postForm.image !== null &&<FaPen  />}</span>
            </label>
            {postForm.image !== null && <button className={` ${mode === 'dark' ? 'text-white': 'text-grey-600'} text-16 p-3 rounded-full hover:bg-grey-600 hover:text-white`} onClick={()=>setPostForm(prevPostForm => {
                return{
                    ...prevPostForm,
                    image: null
                }
            })} ><FaRegTrashAlt /></button>}
        </div>}
        <div className=' flex items-center justify-between w-full pt-6'>
            <div className=' flex items-center cursor-pointer' onClick={()=>{setShowInputFile(!showInputFile)}}>
                <FaImage className=' text-grey-400' />
                <span className=' text-grey-400 text-16 ml-2'>Image</span>
            </div>
            <button 
                type='submit' 
                className={`bg-primary-500 px-6 py-1 rounded-[2rem] text-16 ${postForm.text.length > 0 ? 'text-white': ' text-grey-600'}`}
                >
                    POST
            </button>
        </div>
    </form>
  )
}

export default CreatePost