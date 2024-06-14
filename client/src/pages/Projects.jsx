import React from 'react'
import CallToAction from '../components/CallToAction'

export default function Projects() {
  return (
    <div className='min-h-screen max-w-2xl  mx-auto flex mt-8 flex-col gap-6 items-center'>
      <h1 className='text-3xl font-semibold'>Projects</h1>
      <p className='text-md text-gray-500 '>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dictum at sapien sit amet posuere.</p>
      <CallToAction />
    </div>
  )
}
