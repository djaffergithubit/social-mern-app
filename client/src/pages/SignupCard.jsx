import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CgAsterisk } from "react-icons/cg";
import { useSelector } from 'react-redux';
import { selectMode } from '../state/socialSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignUpCard = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [userForm, setUserForm] = useState ({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    picture: null
  })

  const mode = useSelector(selectMode)
  const Navigate = useNavigate()

  const handleFormChange = (e) => {
    const { name, value, type } = e.target
    setUserForm(prevUserForm => {
      return{
        ...prevUserForm,
        [name]: type === 'file' ? e.target.files[0] : value
      }
    })
  }

  const createUser = async () => {

    const formData = new FormData()

    formData.append('firstName', userForm.firstName)
    formData.append('lastName', userForm.lastName)
    formData.append('userName', userForm.userName)
    formData.append('email', userForm.email)
    formData.append('password', userForm.password)
    formData.append('picture', userForm.picture)

    await axios.post('http://localhost:4000/users/register', formData)
    .then(res => {
      console.log(res.data)
      toast.success('User created successfully, please login to continue',
        { className: 'text-base' }
      )
      
      setTimeout(() => {
        Navigate('/login')
      },2000)
    })
    .catch(err => {
      console.log(err)
      toast.error('Something went wrong, please try again later',
        { className: 'text-base' }
      )
    })
  }

  const userFormSubmit = (e) => {
    e.preventDefault()
    createUser()
  }

  return (
    <div className={`${mode === 'dark'? 'bg-[#1a202c]': 'bg-grey-50'} min-h-screen h-full`}>
      <div className='py-12 px-6'>
        <h1 className={` text-center ${mode === 'dark'? 'text-white': 'text-grey-700'} font-bold text-4xl`}>Sign up</h1>
          <p className=' text-center text-20 text-[#4a5568]'>to enjoy all of our cool features ✌️</p>
          <br />
          <form action="" className={`max-w-md w-full mx-auto ${mode === 'dark' ? 'bg-[#2d3748] text-white': 'bg-white text-grey-800'} px-8 py-6 flex flex-col gap-4 text-start text-16 rounded-lg shadow-xl`} onSubmit={userFormSubmit} encType='multipart/form-data'>
            <div className=' flex items-center gap-2 w-full'>
              <div className='flex-6'>
                <label className=' flex items-center' htmlFor="firstName">Fist Name <CgAsterisk className=' text-red-400' /></label>
                <input className={` w-full border-[1px] rounded-md px-4 focus:border-primary-600 focus:border-[2px] py-1 outline-none ${mode === 'dark'? 'bg-[#2d3748] border-grey-500': 'bg-white border-grey-100'}`} type="text" name="firstName" onChange={handleFormChange} value={userForm.firstName} id="" required/>
              </div>
              <div className='flex-6'>
                <label htmlFor="lastName" className=' flex items-center'>Last Name <CgAsterisk className=' text-red-400' /></label>
                <input className={` w-full border-[1px] rounded-md px-4 focus:border-primary-600 focus:border-[2px] py-1 outline-none flex-6 ${mode === 'dark'? 'bg-[#2d3748] border-grey-500': 'bg-white border-grey-100'}`} type="text" name="lastName" onChange={handleFormChange} value={userForm.lastName} id="" required />
              </div>
            </div>
            <div className=''>
                <label className=' flex items-center' htmlFor="userName">username <CgAsterisk className=' text-red-400' /></label>
                <input className={` w-full border-[1px] rounded-md px-4 focus:border-primary-600 focus:border-[2px] py-1 outline-none ${mode === 'dark'? 'bg-[#2d3748] border-grey-500': 'bg-white border-grey-100'}`} type="text" name="userName" onChange={handleFormChange} value={userForm.userName} id="" required />
              </div>
            <div>
              <label className=' flex items-center' htmlFor="email">Email address <CgAsterisk className=' text-red-400' /></label>
              <input className={` w-full border-[1px] rounded-md px-4 focus:border-primary-600 focus:border-[2px] py-1 outline-none ${mode === 'dark'? 'bg-[#2d3748] border-grey-500': 'bg-white border-grey-100'}`} type="email" name='email' onChange={handleFormChange} value={userForm.email} required />
            </div>
            <div className=' flex flex-col'>
              <label className=' flex items-center' htmlFor="password">Password <CgAsterisk className=' text-red-400' /></label>
              <div className=' relative'>
                <input className={`w-full ${mode === 'dark'? 'bg-[#2d3748] border-grey-500': 'bg-white border-grey-100'}  border-[1px]  rounded-md px-4 focus:border-primary-600 focus:border-[2px] py-1 outline-none `} type={`${showPassword ? 'text': 'password'}`} name='password' onChange={handleFormChange} value={userForm.password} required />
                <FaEyeSlash className={`absolute right-0 top-3 mr-4 text-20 cursor-pointer ${!showPassword ? 'block' : 'hidden'}`} onClick={()=>setShowPassword(true)} />
                <FaEye className={`absolute right-0 top-3 mr-4 text-20 cursor-pointer ${showPassword ? 'block': 'hidden'}`} onClick={()=>setShowPassword(false)} />
              </div>
            </div>
            <div>
              <label className=' flex items-center' htmlFor="picture">picture </label>
              <input className={` w-full border-[1px] rounded-md px-4 focus:border-primary-600 focus:border-[2px] py-1 outline-none ${mode === 'dark'? 'bg-[#2d3748] border-grey-500': 'bg-white border-grey-100'}`} type="file" name='picture' onChange={handleFormChange} />
            </div>
            <button className=' text-20 font-semibold px-4 py-2 bg-primary-600 rounded-md w-full text-white' type='submit'>Sign up</button>
            <div className=' text-center pt-4'>
              Already a user? <Link className={` ${mode === 'dark'? 'text-primary-600': 'text-primary-300'}`} to={"/login"}>Login</Link>
            </div>
          </form>
        </div>
    </div>
  )
}

export default SignUpCard