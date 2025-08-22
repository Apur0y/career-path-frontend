
import React from 'react'
import SearchField from '../shared/searchField/SearchField'

export default function SeekerBanner() {
    return (
        <div className='flex flex-col justify-center items-center my-20 mx-4'>
            <div className='max-w-[1179px]'>
                <h1 className="text-5xl md:text-7xl text-left font-semibold md:font-bold">
                   Find Your <span className="text-primary">dream job</span> now
                </h1>
                <p className='text-xl text-subtitle font-medium text-center mt-4 mb-14' >5 lakh+ jobs for you to explore</p>
                <SearchField/>
            </div>
        </div>
    )
}
