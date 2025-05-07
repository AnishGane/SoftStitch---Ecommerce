import React, { useState } from 'react'

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign up");
  const onSubmitHandler = async (e) =>{
    e.preventDefault();
  }

  return (
   
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-0.5 w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? "" : <input type="text" className='w-full px-3 py-2 border border-gray-800 outline-none' placeholder='Name' required/>}
      <input type="email" className='w-full px-3 py-2 border border-gray-800 outline-none' placeholder='Email address' required/>
      <input type="password" className='w-full px-3 py-2 border border-gray-800 outline-none' placeholder='Password' required/>

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentState === 'Login' ? <p className='cursor-pointer' onClick={() => setCurrentState("Sign up")}>Create account</p> : <p className='cursor-pointer' onClick={() => setCurrentState("Login")}>Login here</p>
        }
      </div>
      <button className='bg-black text-white px-8 py-2 mt-4 font-light'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login