import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import { useSelector } from 'react-redux'
import { selectMode, selectUser } from '../state/socialSlice'
import { getUsers } from '../api/users'
import FollowButton from './FollowButton'

const RightSideBar = () => {

    const mode = useSelector(selectMode)
    const user = useSelector(selectUser)
    const users = getUsers()
    const [suggestedUsers, setSuggestedUsers] = useState([])

    useEffect(()=>{
        if (user) {
            setSuggestedUsers(users.filter(u => u._id !== user._id ))
        }
    }, [user.followees, user, users])

  return (
    <section className='lg:block hidden flex-4 w-full lg:sticky top-0 '>
        <h1 className={`${mode === 'dark' ? ' text-white': 'text-grey-800'} font-medium text-start text-20`}>Suggested Users</h1>
        <div className=' flex flex-col py-[24px] space-y-3'>
            {suggestedUsers.map((user, index)=>(
                <div className=' flex justify-between items-center' key={index}>
                    <Avatar 
                       key={index}
                       user={user}
                    />
                    <FollowButton 
                        // key={index}
                        followedUser={user}
                    /> 
                </div>
            )) }
        </div>
    </section>
  )
}

export default RightSideBar