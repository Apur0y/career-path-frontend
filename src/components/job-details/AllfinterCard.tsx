import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

export default function AllfinterCard({ name }: { name: string }) {

  return (
    <div>
      <div className='p-2 md:p-[20px] flex md:gap-4 border border-gray-300 rounded-md shadow-md cursor-pointer hover:shadow-primary/60 transition'>
        <div className='flex justify-center items-center '>
          <p className='text-xs md:text-lg text-secondary flex '>{name}<IoIosArrowForward className='my-auto' /></p>
        </div>
      </div>
    </div>
  )
}
