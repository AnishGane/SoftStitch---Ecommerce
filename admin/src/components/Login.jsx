import React, { useState } from 'react'
import { backendUrl } from '../App';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = ({setToken}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const onSubmitHalndler = async (e) => {
        try {
            e.preventDefault();
            // API Call
            const response = await axios.post(backendUrl + '/api/user/admin-login', {
                email,
                password
            });
            if(response.data.success){
                setToken(response.data.token);
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
            <form onSubmit={onSubmitHalndler}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:border-gray-500 focus:border-2' type="email" placeholder='your@email.com' name="" id="" required/>
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:border-gray-500 focus:border-2' type="password" placeholder='password' name="" id="" required/>
                </div>
                <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login