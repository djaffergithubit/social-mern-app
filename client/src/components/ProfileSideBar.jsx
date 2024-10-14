import React from 'react'
import Avatar from './Avatar'
import { FiMapPin } from 'react-icons/fi'
// bag icon
import { FiShoppingBag } from 'react-icons/fi'
import { FaLinkedin, FaPen, FaTwitter } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { selectMode } from '../state/socialSlice'

const ProfileSideBar = () => {

    const mode = useSelector(selectMode)
    
  return (
    <div className={`${mode === 'dark'? 'bg-grey-800': 'bg-white'} text-white h-full xl:flex-3 flex-4 p-[24px] rounded-xl`}>
        <Avatar />
        <div className={`flex flex-col items-start gap-2 py-[16px] border-b-[1px] ${mode === 'dark' ? 'border-grey-700': 'border-grey-100'}`}>
            <div className=' flex items-center'>
                <FiMapPin className={`${mode === 'dark' ? 'text-grey-200': 'text-grey-500'} text-3xl mr-2`} />
                <span className={`${mode === 'dark' ? 'text-grey-400' : 'text-grey-300'} text-sm`}>Boghni</span>
            </div>
            <div className=' flex items-center'>
                <FiShoppingBag className={`${mode === 'dark' ? 'text-grey-200': 'text-grey-500'} text-3xl mr-2`} />
                <span className={`${mode === 'dark' ? 'text-grey-400': 'text-grey-300'} text-sm`}>skljklshdk</span>
            </div>
        </div>
        <div className={` flex flex-col gap-2 py-[16px] border-b-[1px] ${mode === 'dark' ? 'border-grey-700': 'border-grey-100'}`}>
            <p className={`${mode === 'dark'? 'text-grey-400' : 'text-grey-300'} text-sm flex justify-between items-center`}>Who's viewed your profile<span className={`font-bold ${mode === 'dark' ? 'text-grey-200': 'text-grey-500'}`}>2020</span></p>
            <p className={`${mode === 'dark' ? 'text-grey-400': 'text-grey-300'} text-sm flex justify-between items-center`}>Impressions of your post<span className={`font-bold ${mode === 'dark' ? 'text-grey-200': 'text-grey-500'}`}>2020</span></p>
        </div>
        <div className=' py-[16px]'>
            <h5 className={`text-16 text-start font-medium mb-4 ${mode === 'dark'? 'text-grey-200': 'text-grey-500'}`}>Social Profiles</h5>
            <div className=' flex justify-between items-center mb-2'>
                <div className=' flex'>
                    <FaTwitter className={` text-32 mr-4 ${mode === 'dark' ? 'text-grey-200 ': 'text-grey-300 '}`} />
                    <div className=' flex flex-col'>
                        <span className={` ${mode === 'dark'? 'text-grey-200': 'text-grey-500'} text-sm  text-start font-medium`}>Twitter</span>
                        <span className={`${mode === 'dark'? 'text-grey-400': 'text-grey-300'} text-sm`}>Social Network</span>
                    </div>
                </div>
                <FaPen className=' text-sm text-grey-200' />
            </div>
            <div className=' flex justify-between items-center'>
                <div className=' flex items-center'>
                    <FaLinkedin className={`text-32 mr-4 ${mode === 'dark' ? 'text-grey-200 ': 'text-grey-300 '}`} />
                    <div className=' flex flex-col'>
                        <span className={`${mode === 'dark' ? 'text-grey-200': 'text-grey-500'} text-sm text-start font-medium`}>Linkedin</span>
                        <span className={`${mode === 'dark' ? 'text-grey-400': 'text-grey-300'} text-sm`}>Social Network</span>
                    </div>
                </div>
                <FaPen className=' text-sm text-grey-200' />
            </div>
        </div>
    </div>
  )
}

export default ProfileSideBar