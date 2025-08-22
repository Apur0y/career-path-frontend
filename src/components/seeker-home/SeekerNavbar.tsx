
import React from 'react'
import Navbar from '../shared/Navbar/Navbar';

export default function JobSeekerNavbar() {
    const navitem=[
    { name: "Job", href: "/jobseekeruser/searchJobPage" },
    { name: "Company", href: "/jobseekeruser/jobDetailsPage" },
    { name: "Course", href: "#" },
   
  ];
  return (
    <div className='sticky top-0 z-50'>
        <Navbar navItem={navitem} />
    </div>
  )
}
