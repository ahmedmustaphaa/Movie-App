import React from 'react'
import { Link } from 'react-router'
import { assets } from '../../assets/assets'

function Adminnavbar() {
  return (
  <div className='flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30'>
  <Link to='/'>
    <h1 className='text-3xl font-extrabold bg-gradient-to-r from-red-500 via-yellow-400 to-orange-500 text-transparent bg-clip-text drop-shadow-lg tracking-wide animate-pulse'>
      AhmedFlix 🎬
    </h1>
  </Link>
</div>

  )
}

export default Adminnavbar