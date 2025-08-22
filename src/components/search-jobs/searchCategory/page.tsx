"use client";
import React from "react";
// import RecentJobCard from './RecentJobCard'

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import './styles.css';

// import required modules
import { FreeMode, Navigation } from "swiper/modules";
import CategoryCard from "@/components/seeker-home/TopCategory/CategoryCard";

export default function CategoryList() {
  const categories = [
    {
      icon: "/Frame.png",
      name: "Remote",
    },
    {
      icon: "/Frame 1.png",
      name: "MNC",
    },
    {
      icon: "/Frame 2.png",
      name: "Fresher",
    },
    {
      icon: "/Frame 3.png",
      name: "Startup",
    },
    {
      icon: "/Frame.png",
      name: "Anlytics ",
    },
    {
      icon: "/Frame.png",
      name: "Internship",
    },
    {
      icon: "/Frame.png",
      name: "Banking",
    },
  ];

  return (
    <div>
      <div className=" ml-0  2xl:ml-44">
        <div className=" py-15  px-11 md:px-15">
          <div className="relative">
            <Swiper
              spaceBetween={30}
              freeMode={true}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              modules={[FreeMode, Navigation]}
              className="mySwiper"
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 2.5 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 6.5 },
              }}
            >
              {categories.map((category, index) => (
                <SwiperSlide key={index} className="pb-2">
                  <CategoryCard key={category.name} category={category} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
