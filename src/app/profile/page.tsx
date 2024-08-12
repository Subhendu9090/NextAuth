'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';



export default function profilePage() {

  const router = useRouter();
  const[data,setData] = useState("nothing")

  const getUserDetails =async()=>{
   const res= await axios.post("/api/users/me",)

   console.log(res.data.data);

   setData(res.data.data.name)
   

  }

  const logout = async()=>{
      try {
        await axios.get('/api/users/logout')
        router.push("/login")
      } catch (error:any) {
        console.log(error.message);
        toast.error(error.message)
      }
  }

  return (
    <div className=' flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile Page</h1>
      <hr/>
      <h2>{data === "nothing" ? "NOTHING" : <Link href={`/profile/${data}`}>Data</Link>}</h2>

      <hr/>

      <button 
      className='bg-green-500 mt-4 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-400'
      onClick={getUserDetails}> user </button>
      <button 
      className='bg-blue-500 mt-4 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-400'
      onClick={logout}>logout</button>
    </div>
  )
}

