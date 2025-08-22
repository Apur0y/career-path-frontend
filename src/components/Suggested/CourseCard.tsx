import type { Course } from "@/types/AllTypes";
import Image from "next/image";
import Link from "next/link";
import { Star, BookOpen, Users } from "lucide-react";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="group w-full  bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col relative hover:shadow-md hover:border-gray-300 transition-all duration-500 ">
      {/* Course Image */}
      <span className="absolute inset-0 bg-primary/10 transition-all origin-top-left duration-300 ease-in-out scale-0 group-hover:scale-100 rounded-lg z-0"></span>
      <div className="relative w-full h-[250px] overflow-hidden ">
        <Image
          src={course.image || course.image_url || "/placeholder.svg"}
          alt={course.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          height={220}
          width={400}
        />
        {/* Price Badge */}
        {course.is_paid && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
            <span className="text-sm font-bold text-gray-900">
              {course.price_detail.price_string}
            </span>
          </div>
        )}
        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold text-gray-900">
            {course.rating}
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="flex flex-col flex-grow p-5 z-20">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-3 group-hover:text-primary transition-colors duration-300">
          {course.title}
        </h3>

        <div
          className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: course.description }}
        />

        {/* Course Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.num_reviews} reviews</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.num_lectures} lectures</span>
          </div>
        </div>

        {/* Instructor Info */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                Instructor
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {/* {course?.visible_instructors[0]?.name || "Unknown"} */}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <Link
            target="_blank"
            href={`${course.url || "#"}`}
            // href={`/`}
            className="flex justify-end "
          >
            <button className="text-primary underline font-semibold cursor-pointer">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
