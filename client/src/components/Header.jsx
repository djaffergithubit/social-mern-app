import React, { useEffect, useState } from 'react'
import { FaBell, FaMoon , FaChevronDown, FaSearch, FaSun, FaBars } from 'react-icons/fa';
import {  MdMessage } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import 
{ 
    selectMode, 
    selectUser, 
    selectUserNotifications, 
    setMode, 
    setToken 
} from '../state/socialSlice';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import XIcon from '../assets/x.svg'
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { socket } from '../socket';
import { toast } from 'react-toastify';

const Header = ({ currentChat, setCurrentChat }) => {
    
    const mode = useSelector(selectMode)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const userNotifications = useSelector(selectUserNotifications)
    const [sideBar, setSideBar] = useState(false)

    const handleLogout = async () => {
        await axios.get('http://localhost:4000/users/logout')
        .then(res => {
            dispatch(setToken(''))
            socket.emit('logout', { userId: user._id })
            setCurrentChat('')
            toast.success('User logged out successfully', {
                className: 'text-base'
            })
            setTimeout(() => {
                Navigate('/login')
            }, 2000);
        })
        .catch(err => {s
            console.log(err)
            toast.error(
                'Something went wrong, please try again later',
                { className: 'text-base' }
            )
        })
    }

    useEffect(() => {
        socket.on('chat notification',(data) => {
            const { chat, notificationSender, chatParticipants } = data
            console.log(data);
            if (notificationSender !== '') {
                if (
                    chatParticipants?.includes(user._id) && window.location.pathname !== '/chat'
                    ||
                    chatParticipants?.includes(user._id) && window.location.pathname === '/chat' && currentChat === '' 
                    || 
                    chatParticipants?.includes(user._id) && currentChat !== chat 
                ){
                    socket.emit('new message notification', { chatId: chat, isMessageNotification: true, notificationSender: notificationSender })
                }
            }else{
                console.log('no notification sender');
            }
        })

        return () => {
            socket.off('chat notification')
        }
    }, [currentChat])

    useEffect(() => {
        if (userNotifications?.length > 0) {            
            const chatHaveNotifications = userNotifications?.filter(notification => notification.chat._id === currentChat)
            if (chatHaveNotifications.length > 0) {
                socket.emit('message notification removed', {notificationsToRemove: chatHaveNotifications, message: 'notification removed'})
            }
        }
    }, [currentChat, userNotifications])

    useEffect(() => {
        console.log('the current user notifications', userNotifications);
    }, [userNotifications])

  return (
    <div className={`flex justify-between ${mode === 'dark' ? 'bg-grey-800': 'bg-white'} py-4 lg:px-20 md:px-20 sm:px-8 px-4`}>
        <div className={`flex lg:w-auto w-full lg:justify-start justify-between items-center gap-4 flex-items-6`}>
           <Link to={"/"}>
                <h1 className=' text-32 text-primary-500 font-rubik font-bold'>Sociopedia</h1></Link>
            <div className=' relative lg:hidden cursor-pointer'  onClick={()=>setSideBar(true)}>
                {userNotifications?.length > 0 && 
                    <p className={`bg-red-500 text-white rounded-full text-sm  ${userNotifications?.length >= 9 ?'px-0.5 -top-3 -right-2' : ' -top-2 -right-2 text-sm w-4 h-4'} font-medium flex justify-center items-center absolute`}>{userNotifications?.length <= 20 ? userNotifications?.length : '20+'}</p>
                }
                <FaBars className=' lg:hidden block text-16 text-grey-600 font-extralight'/>
            </div>
            <div className=' justify-end items-center relative max-w-[300px] w-full lg:flex hidden'>
                <input className={` px-6 py-1 text-14 ${mode === 'dark' ? 'text-white bg-grey-700' : ' bg-grey-50 text-grey-700'} outline-none w-full rounded-lg relative`} placeholder='search...' type="text" name="" id="" />
                <button className={`flex items-center justify-center absolute ${mode === 'dark' ? 'text-white': 'text-grey-400'} text-14 top-1/2 right-0 -translate-y-1/2 mr-6 hover:${mode === 'dark' ? 'bg-grey-600' : 'bg-grey-400'} p-2 rounded-full`}>
                    <FaSearch className='' />
                </button>
            </div>
        </div>
        <div className=' justify-end items-center space-x-8 flex-items-6 lg:flex hidden'>
            <div className=' flex items-center space-x-10'>
                {mode === 'dark' ? <FaMoon className=' text-white cursor-pointer text-22' onClick={()=>dispatch(setMode('light'))}/> : <FaSun className=' text-grey-700 cursor-pointer text-22' onClick={()=>dispatch(setMode('dark'))} />}
                <Link to={"/chat"} className='h-full relative' >
                    {userNotifications?.length > 0 && 
                        <p className={`bg-red-500 text-white rounded-full text-sm  ${userNotifications?.length >= 9 ?'px-0.5 -top-2 -right-2' : ' -top-1 -right-1 text-sm w-4 h-4'} font-medium flex justify-center items-center absolute`}>{userNotifications?.length <= 20 ? userNotifications?.length : '20+'}</p>
                    }
                    <MdMessage className={`${mode === 'dark' ? 'text-white' : ' text-grey-700'} cursor-pointer text-22`} />
                </Link>
                <div className=' relative'>
                    <FaBell className={`${mode === 'dark' ? 'text-white' : ' text-grey-700'} cursor-pointer text-22`} />
                    {/* <p className=' absolute top-0 right-0 text-12 text-white bg-red-600 h-4'>
                    </p> */}
                </div>
                <FaArrowRightFromBracket className={`${mode === 'dark' ? 'text-white' : ' text-grey-700'} cursor-pointer text-22`} onClick={handleLogout} />
            </div>
            <button className={`flex items-center text-14 px-4 py-1 ${mode === 'dark' ? 'bg-grey-700 text-white' : 'bg-grey-50 text-grey-700 '}`}>{`${user?.firstName} ${user?.lastName}`} <FaChevronDown className=' ml-4' /></button>
        </div>
        {sideBar && <section className={` lg:hidden fixed top-0 left-0 z-10 ${mode === 'dark' ? ' bg-grey-800': 'bg-grey-10'} max-w-sm w-full h-full p-10`}>
            <div className='flex justify-between items-center w-full'>
                <h1 className=' text-32 text-primary-500 font-rubik font-bold'>Sociopedia</h1>
                <button onClick={()=>setSideBar(false)}>
                    <img src={XIcon} alt="" />
                </button>
            </div>
            <br />
            <div className=' flex flex-col gap-4'>
                <div className=' flex items-center cursor-pointer' onClick={()=> {mode === 'dark' ? dispatch(setMode('light')) : dispatch(setMode('dark')); setSideBar(false)}}>
                    {mode === 'dark' ? <FaMoon className=' text-white cursor-pointer text-22 mr-2' /> : <FaSun className=' text-grey-700 cursor-pointer text-22 mr-2' />}
                    <h3 className={`${mode === 'dark' ? 'text-white': 'text-grey-700'} text-20`}>{mode === 'dark' ? 'Light': 'Sombre'}</h3>
                </div>
                <Link to={'/chat'} className=' flex items-center cursor-pointer' onClick={()=>{setSideBar(false)}}>
                    <div className='relative'>
                        {userNotifications.length > 0 && 
                            <p className={`bg-red-500 text-white rounded-full text-sm  ${userNotifications.length >= 9 ?'px-0.5 -top-2 ' : ' -top-1 text-sm w-4 h-4'} font-medium flex justify-center items-center absolute right-2`}>{userNotifications.length <= 20 ? userNotifications.length : '20+'}</p>
                        }
                        <MdMessage className={`${mode === 'dark' ? 'text-white' : ' text-grey-700'} cursor-pointer text-22 mr-2`} />
                    </div>
                    <h3 className={`${mode ==='dark' ? 'text-white': 'text-grey-700'} text-20 `}>Messages</h3>
                </Link>
                <div className=' flex items-center'>
                    <FaBell className={`${mode === 'dark' ? 'text-white' : ' text-grey-700'} cursor-pointer text-22 mr-2`} />
                    <h3 className={`${mode === 'dark' ? 'text-white': 'text-grey-700'} text-20`}>Notifications</h3>
                </div>
                <div className=' flex items-center cursor-pointer' onClick={handleLogout}>
                    <FaArrowRightFromBracket className={`${mode === 'dark' ? 'text-white' : ' text-grey-700'} cursor-pointer text-22 mr-2`} />
                    <h3 className={`${mode === 'dark' ? 'text-white': 'text-grey-700'} text-20`}>Disconnection</h3>
                </div>
            </div>
        </section>}
    </div>
  )
}

export default Header