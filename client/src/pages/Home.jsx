import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import Post from '../../../api/models/post.model';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
        const res = await fetch('/api/post/getposts');
        const data = await res.json();
        setPosts(data.posts);

    };
    fetchPosts();
  }, []);
    return (
        <div className="">
          <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
            <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to ###</h1>
            <p className='text-gray-500 text-xs sm:text-sm'> Our cutting-edge SaaS platform empowers your temas to treamline workflows, booost productivity, and drive sustainable growth.</p>
            <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>View all posts</Link>
          </div>
          <div className='p-3 bg-amber-100 dark:bg-slate-700'>
            <CallToAction/>
          </div>
          <div className='max-w-full mx-auto p-3 flex flex-col gap-8 py-7'>
            {
              posts && posts.length > 0 && (
                <div className='flex flex-col gap-6 p-7'>
                  <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
                  <div className='flex flex-wrap gap-4 justify-center'>
                    {
                      posts.map((posts) => (
                        
                          <PostCard post={posts} key={posts._id}/>
                        
                      ))
                    }
                  </div>
                  <Link to={'/search'} className='text-lg text-teal-500 hover:underline text-center'>
                  View al posts
                  </Link>
                </div>
              )
            }
          </div>
        </div>
      );
}
