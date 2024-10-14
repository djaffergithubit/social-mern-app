import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken, selectUser, setUser } from '../state/socialSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import MyLoader from './MyLoader'

const FollowButton = ({ followedUser }) => {

    const [loading, setLoading] = useState(false)
    const user = useSelector(selectUser)
    const token = useSelector(selectToken)
    const currentPath = window.location.pathname
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const followUnFollow = async (Email, token) => {
        await axios.post('http://localhost:4000/users/add-remove-follower', {email: Email}, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            dispatch(setUser(response.data.user))
            if (!response.data.follow) {                
                toast.info(`You have unfollowed ${followedUser.userName}`, {
                    className: 'text-base'
                })
            }else{
                toast.info(`You are now following ${followedUser.userName}`, {
                    className: 'text-base'
                })
            }
        })
        .catch((err) => {
            toast.error('Error following user', { className: 'text-base' })
        })

        setLoading(false)
      }

    const followUser = () => {
        setLoading(true)
        followUnFollow(followedUser.email, token)
    }

    const editProfile = () => {
        Navigate('/edit-profile')
    }
  return (
    <button 
        className={`${!currentPath.includes('/profile') ? 'bg-primary-500 text-white px-4 rounded-md text-16' : 'bg-grey-600 px-3 rounded-md text-grey-50 text-sm'} py-1 w-[120px] flex items-center justify-center`} 
        onClick={user._id !== followedUser._id ? followUser : editProfile }>
            {
              loading ?
                <MyLoader />
             : user._id === followedUser._id ? 
                'Update profile'
                : 
                user.followees.includes(followedUser._id) ? 
                'unFollow'
                : 
                'Follow'
            }
    </button>
    )
}

export default FollowButton