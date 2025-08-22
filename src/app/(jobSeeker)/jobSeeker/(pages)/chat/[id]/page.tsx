'use client'
import React from 'react'
import Chat from '../Chat'
import { useParams } from 'next/navigation';


export default function page() {
   const {id}=useParams();
   console.log(id)
  return (
    <div>
        <Chat receviedId={id}/>
    </div>
  )
}
