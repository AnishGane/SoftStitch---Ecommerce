import React from 'react'
import assets from '../assets/assets.js'
import { Link } from 'react-router-dom'
const Navbar = ({setToken}) => {
  return (
    <div className='flex justify-between items-center py-4 px-[4%]'>
      <Link to="/add">
        <img className='w-[max(15%,80px)]' src={assets.logo} alt="logo" />
      </Link>
      <button onClick={()=>setToken('')} className='bg-white text-black hover:text-white hover:bg-black border-2 border-black px-5 py-2 sm:px-7 sm:py-2  text-sm font-medium transition-all ease-in-out duration-200 sm:text-sm cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar