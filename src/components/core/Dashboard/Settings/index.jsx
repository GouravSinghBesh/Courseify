import React from 'react'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'
import ChangeProfilePicture from './ChangeProfilePicture'

function Settings() {
  return (
    <div className='w-full h-full overflow-hidden max-w-maxContent'>
      <div className='h-[99%] w-full overflow-auto'>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">Edit Profile</h1>
        {/* change profile picture */}
        <ChangeProfilePicture />
        {/* Profile */}
        <EditProfile />
        {/* change password */}
        <UpdatePassword />
        {/* delete profile */}
        <DeleteAccount />
      </div>

    </div>
  )
}

export default Settings