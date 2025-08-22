"use client";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { useGetRecommandedCourseQuery } from "@/redux/features/course/courseSlice";
import { Course } from "@/types/AllTypes";
import {
  useGetMeQuery,
  useGetMyProfileQuery,
} from "@/redux/features/auth/auth";

export default function CourseSection() {
  // const courses = [
  //   {
  //     image: "/graphics.jpg",
  //     title: "Graphics Design",
  //     instructor: "Saiful Islam",
  //   },
  //   {
  //     image: "/graphics.jpg",
  //     title: "Graphics Design",
  //     instructor: "Saiful Islam",
  //   },
  //   {
  //     image: "/graphics.jpg",
  //     title: "Graphics Design",
  //     instructor: "Saiful Islam",
  //   },
  //   {
  //     image: "/graphics.jpg",
  //     title: "Graphics Design",
  //     instructor: "Saiful Islam",
  //   },
  // ];

  // const { data: course } = useGetRecommandedCourseQuery({ limit: 10 });
  // console.log(course);
  const { data: currentUser } = useGetMeQuery({});
  const { data: myProfile } = useGetMyProfileQuery(currentUser?.data?.id);
  const profileId = myProfile?.data?.profileId;
  console.log(profileId);
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    if (!myProfile?.data?.profileId) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://31.97.216.98:8000/api/v1/course-recommendations/regenerate/${myProfile.data.profileId}?limit=20`,
          {
            method: "POST", // 👈 Important: GET instead of POST
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch recommendations");
        }

        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchData();
  }, [myProfile?.data?.profileId]);

  console.log(course);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
      {course?.data?.recommended_courses?.map((course: Course, index: any) => (
        <div className="flex justify-center" key={index}>
          <CourseCard key={index} course={course}></CourseCard>
        </div>
      ))}
    </div>
  );
}
