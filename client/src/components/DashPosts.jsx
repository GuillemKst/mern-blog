import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'



export default function DashPosts() {
const {currentUser} = useSelector(state => state.user)
const [userPosts, setUserPosts] = useState([])
console.log(userPosts)
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`api/post/getposts?userId=${currentUser._id}`)
                const data = await res.json()
                if(res.ok){
                    setUserPosts(data.posts)
                }
            } catch (error) {
                console.log(error.message)
            }
        };
        if(currentUser.isAdmin) {
            fetchPosts();
        }
    }, [currentUser._id])
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-300 '>
        {currentUser.isAdmin && userPosts.length > 0 ? (
            <>
            <Table hoverable className='shadow-md'>
                <Table.Head>
                    <Table.HeadCell>Date Updated</Table.HeadCell>
                    <Table.HeadCell>Post image</Table.HeadCell>
                    <Table.HeadCell>Post title</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                    <Table.HeadCell>
                        <span>Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                {userPosts.map(post => (
                    <Table.Body className='divide-y'>
                        <Table.Row className='bg-white dark:border-gray-700  dark:bg-gray-900'>
                        <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                        <Table.Cell>
                            <Link to={`/post/${post._id}`}>
                            <img src={post.image} alt={post.title} className='w-20 h-10 object-cover bg-gray-500'/>
                            </Link>
                        </Table.Cell>
                        <Table.Cell className='font-medium text-gray-900 dark:text-white'>{post.title}</Table.Cell>
                        <Table.Cell>{post.category}</Table.Cell>
                        <Table.Cell>
                            <span className='bg-red-500 text-white px-2 py-1 rounded-md hover:underline cursor-pointer'>Delete</span>
                        </Table.Cell>
                        <Table.Cell>
                            <Link to={`/upadte-post/${post._id}`} >
                            <span className='bg-blue-500 text-white px-2 py-1 rounded-md hover:underline'>Edit</span>
                            </Link>
                        </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                    
                ))}

            </Table>
            </>
        ):(
            <p>You have no posts yet</p>)}
    </div>
  )
}
