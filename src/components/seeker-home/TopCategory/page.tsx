import React from 'react'
import AllCategory from './AllCategory'
import Container from '@/components/ui/Container'
import CategoryCard from './CategoryCard'
import { RiHomeFill } from 'react-icons/ri';
import { BsBank2, BsFuelPumpFill } from 'react-icons/bs';
import { FaGraduationCap } from 'react-icons/fa';
import { IoIosRocket, IoIosStats } from 'react-icons/io';
import { PiBagSimpleFill } from 'react-icons/pi';

const categories = [
    {
        icon: <RiHomeFill className='text-white' />,
        name: "Remote",

    },
    {
        icon: <BsFuelPumpFill className='text-white' />,
        name: "MNC",

    },
    {
        icon: <FaGraduationCap className='text-white' />,
        name: "Fresher",

    },
    {
        icon: <IoIosRocket className='text-white' />,
        name: "Startup",

    },
    {
        icon: <IoIosStats className='text-white' />,
        name: "Anlytics ",

    },
    {
        icon: <PiBagSimpleFill className='text-white' />,
        name: "Internship",

    },
    {
        icon: <BsBank2 className='text-white' />,
        name: "Banking",

    },

]


export default function TopCategory() {
    return (
        <div>
            <Container>
                <h1 className='text-2xl md:text-5xl font-semibold text-center mb-12'> Top Seaching Category  </h1>
                {/* <AllCategory /> */}


                <div className='flex gap-4 md:gap-16 flex-wrap justify-center'>
                    {categories.map((category, index) => (

                        <CategoryCard key={category.name} category={category} />

                    ))}
                </div>




            </Container>

        </div>
    )
}
