import React from 'react'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

function Settings() {
  return (
    <>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">Edit Profile</h1>
        {/* Profile */}
        <EditProfile/>
        {/* change password */}
        <UpdatePassword/>
        {/* delete profile */}
        <DeleteAccount/>
    </>
  )
}

export default Settings