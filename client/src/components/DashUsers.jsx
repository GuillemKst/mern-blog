import { Modal, Table, Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { set } from 'mongoose'



export default function DashUsers() {
const {currentUser} = useSelector(state => state.user)
const [users, setUsers] = useState([])
const [showMore, setShowMore] = useState(true)
const [showModal, setShowModal] = useState(false)
const [userIdToDelete, setUserIdToDelete] = useState('')
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`api/user/getusers`)
                const data = await res.json()
                if(res.ok){
                    setUsers(data.users)
                    if(data.users.length < 9){
                        setShowMore(false);
                }}
            } catch (error) {
                console.log(error.message)
            }
        };
        if(currentUser.isAdmin) {
            fetchUsers();
        }
    }, [currentUser._id])

    const handleShowMore = async () => {
        const startIndex = users.length;
        try {
            const res= await fetch(`api/user/getusers?startIndex=${startIndex}`);
            const data = await res.json();
            if(res.ok){
                setUsers(prev => [...prev, ...data.users]);
                if(data.users.length < 9){
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleDeleteUser = async () => {
        try {
            const res = await fetch(`api/user/delete/${userIdToDelete}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setUsers((prev) => prev.filter(user => user._id !== userIdToDelete));
                setShowModal(false);
            }
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-300 '>
        {currentUser.isAdmin && users.length > 0 ? (
            <>
            <Table hoverable className='shadow-md'>
                <Table.Head>
                    <Table.HeadCell>Date Created</Table.HeadCell>
                    <Table.HeadCell>User image</Table.HeadCell>
                    <Table.HeadCell>Username</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Admin</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                {users.map(user => (
                    <Table.Body key={user._id} className='divide-y'>
                        <Table.Row className='bg-white dark:border-gray-700  dark:bg-gray-900'>
                        <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                        <Table.Cell>
                            
                            <img src={user.profilePicture} alt={user.username} className='w-20 h-10 object-cover bg-gray-500 rounded-full'/>
                        
                        </Table.Cell>
                        <Table.Cell className='font-medium text-gray-900 dark:text-white'>{user.username}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>
                          
                            {user.isAdmin ? (<FaCheck className='text-green-500'/>) : (<FaTimes className='text-red-500'/>)}
                      
                        </Table.Cell>
                        <Table.Cell>
                            <span onClick={()=>{
                                setShowModal(true);
                                setUserIdToDelete(user._id);
                            }} className='bg-red-500 text-white px-2 py-1 rounded-md hover:underline cursor-pointer'>Delete</span>
                        </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                    
                ))}

            </Table>
            {
                showMore && (
                    <div className='flex justify-center mt-5'>
                        <button onClick={handleShowMore} className=' dark:text-white px-4 py-2 rounded-md mt-2 hover:underline'>Show more</button>
                    </div>
                )
            }
            </>
        ):(
            <p>There are no users yet</p>)}
    <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md' className=''>
        <Modal.Header/>
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this User? </h3>
              <div className='flex justify-center gap-6 mt-8'>
                <Button color='failure' onClick={handleDeleteUser} className='opacity-80 hover:opacity-100 transition-opacity duration-100'>Yes, I'm sure</Button>
                <Button color='grey' onClick={() => setShowModal(false)} className='text-gray-500 hover:text-gray-700 hover:border-gray-800 btransition-all border'>No, cancel</Button>
              </div>
            </div>
            
          </Modal.Body>
      </Modal>
    </div>
  )
}
