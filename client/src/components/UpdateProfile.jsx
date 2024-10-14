import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CgAsterisk } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { selectMode, selectToken, selectUser, setUser } from '../state/socialSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import userPicture from "../assets/icons/user.png";

const UpdateProfile = () => {

  const user = useSelector(selectUser)
  const token = useSelector(selectToken)
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const [fileName, setFileName] = useState('Change Avatar')
  const [userForm, setUserForm] = useState ({
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    description: user.description,
    email: user.email,
    picture: null
  })
  const [isLoading, setIsLoading] = useState(false)

  const mode = useSelector(selectMode)

  const handleFormChange = (e) => {
    const { name, value, type } = e.target
    setUserForm(prevUserForm => {
      if (type === 'file' && e.target.files[0]) {
        setFileName(e.target.files[0].name)
      }else{
        setFileName('Change Avatar')
      }
      return{
        ...prevUserForm,
        [name]: type === 'file' ? e.target.files[0] : value

      }
    })
  }

  const updateUserProfile = async (formData, token) => {
    await axios.post('http://localhost:4000/users/user/edit-profile', formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        dispatch(setUser(res.data.updatedUser))
        toast.success('user profile updated', {
          className: 'text-base'
        })
        setTimeout(() => {
          Navigate(`/profile/${res.data.updatedUser.firstName}-${res.data.updatedUser.lastName}`)
        }, 2000)
    })
    .catch(err => {
        toast.error('Something went wrong, please try again later', {
          className: 'text-base'
        })  
    })
  }

  const userFormSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData()
    const { firstName, lastName, userName, description, email,picture } = userForm

    console.log('Passwords do not match');
    formData.append('firstName', firstName !== '' ? firstName : user.firstName)
    formData.append('lastName', lastName !== '' ? lastName : user.lastName)
    formData.append('userName', userName !== '' ? userName : user.userName)
    formData.append('description', description !== '' ? description : user.description)
    formData.append('email', email !== '' ? email : user.email)
    formData.append('picture', picture ? picture : user.picture)

    const updatedUser = {
      firstName: firstName ? firstName : user.firstName,
      lastName: lastName ? lastName : user.lastName,
      email: email ? email : user.email,
      description: description ? description : user.description,
      picture: picture ? picture : user.picture
    }

    updateUserProfile(formData, token)
  }

  useEffect(()=>{
    console.log(userForm);
  }, [userForm])

  return (
    <div className={`${mode === 'dark'? 'bg-[#1a202c]': 'bg-grey-50'} py-12 px-6`}>
        <form action="" className={`max-w-xl w-full mx-auto ${mode === 'dark' ? 'bg-[#2d3748] text-white': 'bg-white text-grey-800'} px-8 py-6 flex flex-col gap-4 text-start text-16 rounded-lg shadow-xl`} onSubmit={userFormSubmit} encType='multipart/form-data'>
          <h1 className={` text-24 font-semibold ${mode === 'dark' ? 'text-white': 'text-black'}`}>User Profile Edit</h1>
          <p className=' text-16 font-medium text-grey-100 leading-none'>user icon</p>
          <div className=' flex items-center gap-8'>
              <img className=' w-24 h-24 rounded-full flex-1.5' src={user.picture ? `http://localhost:4000/uploads/${user.picture}`: userPicture} alt="" />
              <input className='hidden ' type="file" onChange={handleFormChange} name='picture' id='picture'/>
              <label htmlFor="picture" className={` flex-10.5 text-16 px-6 py-1 cursor-pointer rounded-md w-full text-center ${mode === 'dark' ? 'bg-[#264653] text-white': 'bg-gray-100 text-black'}`}>{fileName}</label>
          </div>
            <div className=' flex items-center gap-2 w-full'>
              <div className='flex-6'>
                <label className=' flex items-center' htmlFor="firstName">Fist Name <CgAsterisk className=' text-red-400' /></label>
                <input className={` w-full border-[1px] rounded-md px-4 focus:border-primary-600 focus:border-[2px] py-1 outline-none ${mode === 'dark'? 'bg-[#2d3748] border-grey-500': 'bg-white border-grey-100'}`} type="text" name="firstName" placeholder='Enter firstName' onChange={handleFormChange} value={userForm.firstName} required />
              </div>
              <div className='flex-6'>
                <label htmlFor="lastName">Last Name</label>
                <input className={` w-full border-[1px] rounded-md px-4 focus:border-primary-600 focus:border-[2px] py-1 outline-none flex-6 ${mode === 'dark'? 'bg-[#2d3748] border-grey-500': 'bg-white border-grey-100'}`} type="text" name="lastName" placeholder='Enter lastName' onChange={handleFormChange} value={userForm.lastName} required />
              </div>
            </div>
            <div className=''>
                <label className=' flex items-center' htmlFor="userName">username <CgAsterisk className=' text-red-400' /></label>
                <input className={` w-full border-[1px] rounded-md px-4 focus:border-primary-600 focus:border-[2px] py-1 outline-none ${mode === 'dark'? 'bg-[#2d3748] border-grey-500': 'bg-white border-grey-100'}`} type="text" name="userName" placeholder='Enter userName' onChange={handleFormChange} value={userForm.userName} required />
            </div>
            <div>
              <label className=' flex items-center' htmlFor="description">description</label>
              <textarea className={` w-full border-[1px] rounded-md px-4 focus:border-primary-600 focus:border-[2px] py-1 outline-none ${mode === 'dark'? 'bg-[#2d3748] border-grey-500': 'bg-white border-grey-100'}`} rows={3} type="description" name='description' placeholder='Enter description' onChange={handleFormChange} value={userForm.description}/>
            </div>
            <div>
              <label className=' flex items-center' htmlFor="email">Email address <CgAsterisk className=' text-red-400' /></label>
              <input className={` w-full border-[1px] rounded-md px-4 focus:border-primary-600 focus:border-[2px] py-1 outline-none ${mode === 'dark'? 'bg-[#2d3748] border-grey-500': 'bg-white border-grey-100'}`} type="email" name='email' placeholder='Enter email address' onChange={handleFormChange} value={userForm.email} required />
            </div>
            <div className=' flex gap-3'>

            </div>
            <div className=' flex items-center gap-2'>
              <button className=' text-20 font-semibold px-4 py-2 bg-[#f56565] rounded-md w-full text-white' onClick={()=>Navigate(`/profile/${user.firstName}-${user.lastName}`)}>cancel</button>
              <button className=' text-20 font-semibold px-4 py-2 bg-blue-400 rounded-md w-full text-white' type='submit'>{isLoading ? 'Updating...' : 'Update'}</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateProfile