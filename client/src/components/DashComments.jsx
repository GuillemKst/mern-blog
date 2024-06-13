import { Modal, Table, Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { set } from 'mongoose'



export default function DashComments() {
const {currentUser} = useSelector(state => state.user)
const [comments, setComments] = useState([])
const [showMore, setShowMore] = useState(true)
const [showModal, setShowModal] = useState(false)
const [commentIdToDelete, setCommentIdToDelete] = useState('')
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`api/comment/getcomments`)
                const data = await res.json()
                if(res.ok){
                    setComments(data.comments)
                    if(data.comments.length < 9){
                        setShowMore(false);
                }}
            } catch (error) {
                console.log(error.message)
            }
        };
        if(currentUser.isAdmin) {
            fetchComments();
        }
    }, [currentUser._id])

    const handleShowMore = async () => {
        const startIndex = comments.length;
        try {
            const res= await fetch(`api/comment/getcomments?startIndex=${startIndex}`);
            const data = await res.json();
            if(res.ok){
                setComments(prev => [...prev, ...data.comments]);
                if(data.users.length < 9){
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleDeleteComment = async () => {
        try {
            const res = await fetch(`api/comment/deletecomment/${commentIdToDelete}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setComments((prev) => prev.filter(comment => comment._id !== commentIdToDelete));
                setShowModal(false);
            }
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-300 '>
        {currentUser.isAdmin && comments.length > 0 ? (
            <>
            <Table hoverable className='shadow-md'>
                <Table.Head>
                    <Table.HeadCell>Date Updated</Table.HeadCell>
                    <Table.HeadCell>Comment content</Table.HeadCell>
                    <Table.HeadCell>Number of Likes</Table.HeadCell>
                    <Table.HeadCell>PostId</Table.HeadCell>
                    <Table.HeadCell>UserId</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                {comments.map(comment => (
                    <Table.Body key={comment._id} className='divide-y'>
                        <Table.Row className='bg-white dark:border-gray-700  dark:bg-gray-900'>
                        <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
                        <Table.Cell>
                            
                           {comment.content}
                        
                        </Table.Cell>
                        <Table.Cell className='font-medium text-gray-900 dark:text-white'>{comment.numberOfLikes}</Table.Cell>
                        <Table.Cell>{comment.postId}</Table.Cell>
                        <Table.Cell>{comment.userId}</Table.Cell>
                        
                        <Table.Cell>
                            <span onClick={()=>{
                                setShowModal(true);
                                setCommentIdToDelete(comment._id);
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
            <p>There are no comments yet</p>)}
    <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md' className=''>
        <Modal.Header/>
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this comment? </h3>
              <div className='flex justify-center gap-6 mt-8'>
                <Button color='failure' onClick={handleDeleteComment} className='opacity-80 hover:opacity-100 transition-opacity duration-100'>Yes, I'm sure</Button>
                <Button color='grey' onClick={() => setShowModal(false)} className='text-gray-500 hover:text-gray-700 hover:border-gray-800 btransition-all border'>No, cancel</Button>
              </div>
            </div>
            
          </Modal.Body>
      </Modal>
    </div>
  )
}
