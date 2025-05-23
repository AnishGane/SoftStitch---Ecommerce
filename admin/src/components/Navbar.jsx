import React from 'react'
import assets from '../assets/assets.js'
import { Link, NavLink } from 'react-router-dom'
const Navbar = ({setToken}) => {
  return (
    <div className='flex justify-between items-center py-4 px-[4%]'>
      <Link to="/add">
        <img className='w-[max(15%,80px)]' src={assets.logo} alt="logo" />
      </Link>
      <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar