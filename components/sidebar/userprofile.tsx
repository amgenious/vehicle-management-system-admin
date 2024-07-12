import React from 'react'

const UserProfile = () => {
  return (
    <div className='flex gap-5 w-full p-2'>
        <div className='bg-primary rounded-full w-16 h-16'></div>
        <div className='flex flex-col justify-center '>
            <p className='font-semibold text-white'>Full Name or email</p>
            <p className='text-sm text-gray-400'>Admin</p>
        </div>
    </div>
  )
}

export default UserProfile