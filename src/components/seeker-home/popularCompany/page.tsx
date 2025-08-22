
import React from 'react'
import CompaniesList from './CompaniesList'
import Link from 'next/link'
import { IoMdArrowForward } from 'react-icons/io'
import Container from '@/components/ui/Container'
import { BsArrowRight } from 'react-icons/bs'

export default function PopularCompany() {
  return (
    <div>
      <Container>
               <h1 className='text-2xl md:text-5xl font-semibold text-center mb-12'>Top Popular Companies</h1>
               <CompaniesList/>
                 <div className='flex justify-center items-center mt-9 md:mt-14 group'>
                    <Link href={"/jobSeeker/search-jobs"}>
                        <button className='border border-gray-400 text-scheer-primary-dark rounded font-medium py-[11px] px-6 flex cursor-pointer hover:border-primary hover:text-white hover:bg-primary  transition-all duration-400 hover:border-gray-300' >
                          View all Companies  <BsArrowRight className="my-auto ml-2 transition-transform text-xl mt-1 duration-300 group-hover:translate-x-2" /></button>
                    </Link>
                </div>

      </Container>
        
    </div>
  )
}
