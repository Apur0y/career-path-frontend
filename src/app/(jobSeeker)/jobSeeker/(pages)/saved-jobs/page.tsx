import React from 'react'
import SavedJobs from './SavedJobs'
import Container from '@/components/ui/Container'
import { BsFillBookmarkCheckFill } from 'react-icons/bs'

export default function page() {
  return (
    <div>
        <Container>
            <div className='flex px-7 md:mb-7 gap-1 md:gap-3'>
                <BsFillBookmarkCheckFill className='size-6 md:size-12 mt-1.5 md:mt-1' />
                <p className="text-2xl md:text-5xl font-semibold mb-6">Saved jobs</p>
            </div>

        <SavedJobs/>
        </Container>
    </div>
  )
}
