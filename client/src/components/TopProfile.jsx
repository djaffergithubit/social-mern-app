import React from 'react'
import instagramIcon from "../assets/icons/instagram (1).svg"
import { useSelector } from 'react-redux'
import { selectMode, selectUser } from '../state/socialSlice'
import icon2 from "../assets/icons/more-horizontal (1).svg"
import icon from "../assets/icons/more-horizontal.svg"
import instagramIcon2 from "../assets/icons/instagram.svg"
import FollowButton from './FollowButton'
import userPicture from '../assets/icons/user.png'

const TopProfile = ({ user }) => {

    const mode = useSelector(selectMode)
    const currentUser = useSelector(selectUser)
    const image = user?.picture ? `http://localhost:4000/uploads/${user.picture}` : userPicture

  return (
    <section className=' text-start'>
        <div className=' flex justify-between items-start'>
            <div>
                <h1 className={`text-20 ${mode === 'dark' ? 'text-white': 'text-grey-900'} font-medium`}>{`${user?.firstName} ${user?.lastName}`}</h1>
                <div className=' max-w-md w-full'>
                    <p className={`text-sm ${mode === 'dark'? 'text-grey-200': 'text-grey-300'} font-medium w-full`}>{user.description ? user.description : 'No Description Found'}</p>
                </div>
            </div>
            <img className=' w-24 h-24 rounded-full' src={image} alt="" />
        </div>
        <div>
            <p className={`${mode === 'dark' ? 'text-grey-200': 'text-grey-300'} text-sm`}>I'm the Owner of X</p>
            <FollowButton 
                followedUser={user}
            /> 
        </div>
        <br />
        <div className=' flex justify-between items-center text-sm'>
            <p className=' text-grey-600 font-medium'>{user.followers ? user.followers.length : '0'} followers . Instagram</p>
            <div className=' flex items-center justify-center gap-2'>
                {mode === 'dark' ? (<>
                    <img src={instagramIcon} alt="" />
                    <img src={icon} alt="" />
                </>)
                :
                (<>
                    <img src={instagramIcon2} alt="" />
                    <img src={icon2} alt="" />
                </>)}
            </div>
        </div>
    </section>
  )
}

export default TopProfile