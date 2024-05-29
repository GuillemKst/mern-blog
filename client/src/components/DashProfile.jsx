import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import {useSelector} from 'react-redux' 

{/*Serveix per selecionar dades de la DB*/ }
export default function DashProfile() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <div className='w-full max-w-lg mx-auto p-3 '>
      <h1 className='my-8 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <div className="w-48 h-48 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
        <img src={currentUser.profilePicture} alt='user' className='rounded-full w-full h-full object-cover border-8 border-[lightyellow]'/>
        </div>
        <div className='flex flex-col items-center gap-4'>
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} style={{ textAlign: 'center' }} className='w-80'/>
        <TextInput type='email' id='email' placeholder='email@gmail.com' defaultValue={currentUser.email} style={{ textAlign: 'center' }} className='w-80'/>
        <TextInput type='password' id='password' placeholder='password' style={{ textAlign: 'center' }} className='w-80'/>
        <Button type='submit' gradientDuoTone='purpleToBlue' outline className='shadow-md w-80'>
          Submit
        </Button>
        </div>

      </form>
      <div className='flex flex-col items-center'>
      <div className='text-red-500 items-center flex flex-row justify-between mt-5 w-80'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Delete Account</span>
      </div>
      </div>
    </div>
  )
}
