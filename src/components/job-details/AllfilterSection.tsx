import React, { useState } from 'react'
import AllfinterCard from './AllfinterCard'
import Link from 'next/link'

export default function AllFilterSection() {
    const filters = [
        {
            name: "All Filter",
        },
        {
            name: "Work Mode",
        },
        {
            name: "Experience",
        },
        {
            name: "Department",
        },
        {
            name: "Location ",
        },
        {
            name: "Salary",
        },
        {
            name: "Education Qualification",
        },
    ]

    const [currentFilter, setCurrentFilter] = useState(filters[0].name)

    return (
        <div className='flex gap-2 md:gap-8 justify-center flex-wrap' >
            {
                filters?.map((filter) =>
                    <div key={filter.name} onClick={() => setCurrentFilter(filter.name)} className={`${currentFilter === filter.name ? "bg-sprimary rounded-lg" : ""}`}>
                      <Link href={"/jobSeeker/search-jobs"}>
                       <AllfinterCard key={filter.name} name={filter.name} />
                      </Link>  
                    </div>)
            }
        </div>
    )
}
