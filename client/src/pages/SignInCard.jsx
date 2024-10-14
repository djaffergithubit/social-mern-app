import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CgAsterisk } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { selectMode, selectUser, setToken} from '../state/socialSlice';
import axios from 'axios';
import { socket } from '../socket';
import { toast } from 'react-toastify';

const SignInCard = () => {

  const mode = useSelector(selectMode)
  const user = useSelector(selectUser)
  const [showPassword, setShowPassword] = useState(false)
  const [userForm, setUserForm] = useState ({
    email: '',
    password: ''
  })
  const dispatch = useDispatch()
  const Navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserForm(prevUserForm => {
      return{
        ...prevUserForm,
        [name]: value
      }
    })
  }

const handleFormSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:4000/users/login', userForm)
    .then(res => {
      dispatch(setToken(res.data.token))
      socket.emit('login', { userId: user._id })
      toast.success('User logged in successfully', {
        className: 'text-base'
      })
      setTimeout(() => {
        Navigate('/');
      }, 2000);
      
    })
    .catch(err => {
      console.log(err)
      toast.error(
        'Something went wrong, please try again later',
        { className: 'text-base' }
      )
    })
  }

  return (
    <div className={`${mode === 'dark'? 'bg-[#1a202c]': 'bg-grey-50'} min-h-screen h-full`}>
      <div className='py-12 px-6'>
        <h1 className={` text-center ${mode === 'dark'? 'text-white': 'text-grey-700'} font-bold text-4xl`}>Sign in</h1>
          <p className=' text-center text-20 text-[#4a5568]'>to enjoy all of our cool features ✌️</p>
          <br />
          <form action="" className={`max-w-md w-full mx-auto ${mode === 'dark' ? 'bg-[#2d3748] text-white': 'bg-white text-grey-800'} px-8 py-6 flex flex-col gap-4 text-start text-16 rounded-lg shadow-xl`} onSubmit={handleFormSubmit} encType='multipart/form-data'>
            <div>
              <label className=' flex items-center' htmlFor="email">Email address <CgAsterisk className=' text-red-400' /></label>
              <input className={` w-full border-[1px] rounded-md px-4 focus:border-primary-600 focus:border-[2px] py-1 outline-none ${mode === 'dark'? 'bg-[#2d3748] border-grey-500': 'bg-white border-grey-100'}`} type="email" name='email' onChange={handleChange} value={userForm.email} />
            </div>
            <div className=' flex flex-col'>
              <label className=' flex items-center' htmlFor="password">Password <CgAsterisk className=' text-red-400' /></label>
              <div className=' relative'>
                <input className={`w-full ${mode === 'dark'? 'bg-[#2d3748] border-grey-500': 'bg-white border-grey-100'}  border-[1px]  rounded-md px-4 focus:border-primary-600 focus:border-[2px] py-1 outline-none `} type={`${showPassword ? 'text': 'password'}`} name='password' onChange={handleChange} value={userForm.password} />
                <FaEyeSlash className={`absolute right-0 top-3 mr-4 text-20 cursor-pointer ${!showPassword ? 'block' : 'hidden'}`} onClick={()=>setShowPassword(true)} />
                <FaEye className={`absolute right-0 top-3 mr-4 text-20 cursor-pointer ${showPassword ? 'block': 'hidden'}`} onClick={()=>setShowPassword(false)} />
              </div>
            </div>
            <button className=' text-20 font-semibold px-4 py-2 bg-primary-600 rounded-md w-full text-white' type='submit'>Sign in</button>
            <div className=' text-center pt-4'>
              Already a user? <Link className={` ${mode === 'dark'? 'text-primary-600': 'text-primary-300'}`} to={"/register"}>Register</Link>
            </div>
          </form>
        </div>
    </div>
  )
}

export default SignInCard