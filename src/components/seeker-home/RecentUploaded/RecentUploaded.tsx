
import React from 'react'
import RecentUploadedPost from './RecentUploadedPost'
import Link from 'next/link'
import { IoMdArrowForward } from 'react-icons/io'
import Container from '@/components/ui/Container'
import { BsArrowRight } from 'react-icons/bs'

export default function RecentUpload() {
    return (
        <div className='bg-card mx-4'>
            <Container>

                <h1 className='text-2xl md:text-5xl font-semibold text-center mb-12'>Recent Uploaded Jobs</h1>
                <RecentUploadedPost />


                <div className='flex justify-center items-center mt-9 md:mt-14 group'>
                    <Link href={"/jobSeeker/search-jobs"}>
                        <button className='border border-gray-400 text-secondary rounded font-medium py-[11px] px-6 flex hover:bg-primary cursor-pointer  hover:border-primary hover:text-white  transition-all duration-300 '>View all Jobs
                             <BsArrowRight className="my-auto ml-2 transition-transform text-xl mt-1 duration-300 group-hover:translate-x-2" /></button>
                    </Link>
                </div>



            </Container>

        </div>
    )
}
