'use client'
import React from 'react'
// import RecentJobCard from './RecentJobCard'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { FreeMode, Navigation } from 'swiper/modules';
import CategoryCard from './CategoryCard';
import { RiHomeFill } from 'react-icons/ri';
import { BsBank2, BsFuelPumpFill } from 'react-icons/bs';
import { FaGraduationCap } from 'react-icons/fa';
import { IoIosRocket, IoIosStats } from 'react-icons/io';
import { PiBagSimpleFill } from 'react-icons/pi';





export default function AllCategory() {

      const categories=[
        {
            icon:<RiHomeFill className='text-white' />,
            name:"Remote",
            
        },
        {
            icon:<BsFuelPumpFill className='text-white'/>,
            name:"MNC",
       
        },
        {
            icon:<FaGraduationCap className='text-white'/>,
            name:"Fresher",
           
        },
        {
            icon:<IoIosRocket className='text-white'/>,
            name:"Startup",
               
        },
        {
            icon:<IoIosStats className='text-white'/>,
            name:"Anlytics ",
               
        },
        {
            icon:<PiBagSimpleFill className='text-white' />,
            name:"Internship",
               
        },
        {
            icon:<BsBank2 className='text-white' />,
            name:"Banking",
               
        },

    ]
    return (
        <div className='border-0 mb-3 mt-2'>
            <div className=' ml-0  2xl:ml-44'>
                <div className='py-2 md:py-2  px-11 md:px-15'>
                    


                    <div className="relative">
                     
                        <Swiper
                            spaceBetween={30}
                            freeMode={true}
                            navigation={{
                                nextEl: '.swiper-button-next-custom',
                                prevEl: '.swiper-button-prev-custom',
                            }}
                            modules={[FreeMode, Navigation]}
                            className="mySwiper"
                            breakpoints={{
                                320: { slidesPerView: 1.5 },
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 2.5 },
                                1024: { slidesPerView: 3 },
                                1280: { slidesPerView: 6.5 },
                            }}
                        >
                            {categories.map((category, index) => (
                                <SwiperSlide key={index} className='pb-2 scale-80'>
                                    <CategoryCard  key={category.name} category={category}  />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>

                </div>
            </div>
        </div>


    )
}
