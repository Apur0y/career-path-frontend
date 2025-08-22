
import PopularCompanyCard from '@/components/seeker-home/popularCompany/PopularCompanyCard'
import { Loader } from '@/components/shared/MainLoader'
import CourseCard from '@/components/Suggested/CourseCard'
import { useGetAllCompaniesQuery } from '@/redux/features/company/companySlice'
import { useGetRecommandedCourseQuery } from '@/redux/features/course/courseSlice'
import { Company, Course } from '@/types/AllTypes'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
// import PopularCompanyCard from '../../jobSeekerHome/popularCompany/PopularCompanyCard'
// import CourseCard from '@/app/alloveruser/Suggested/CourseCard'


export default function SerachRightSideBar() {

    
    const {data:course} = useGetRecommandedCourseQuery({limit: 10});
  
    
  

  const [companies, setCompanies] = useState<Company[]>([])
  const { data: res, isLoading } = useGetAllCompaniesQuery();



  useEffect(() => {

    if (res?.data) {
      setCompanies(res.data)
    }
  }, [res?.data]);

  if (isLoading) return <div className='flex gap-5  overflow-auto'>{
                              ["f","f","f"].map(()=>    <div className=''>
                          <div className='flex items-center gap-2'><Skeleton circle height={50} width={50} /><h2><Skeleton width={200} /></h2></div>
                          <h2><Skeleton width={440} /></h2>
                          <p><Skeleton height={100} width={440} /></p>
                      </div>)
                          }</div> 
  console.log(companies)




  return (
    <div>
      <div className=" bg-white w-full  border-gray-200 mb-12">
        {/* Top Company Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Top Company</h2>
          {/* <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SM</span>
            </div>
            <div>
              <h3 className="font-semibold">SM Technology</h3>
              <p className="text-sm text-gray-500">Software Company</p>
            </div>
          </div>
          <div className="w-full h-24 bg-gray-200 rounded-lg mb-3 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white text-sm">Office Interior</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>4.9</span>
            </div>
            <div className="flex items-center space-x-4 text-gray-500">
              <span>Active Company</span>
              <span>58 Employee</span>
              <span>Top 10</span>
            </div>
          </div>
        </div> */}
          {
            companies?.slice(0,1).map((company, index) => <PopularCompanyCard company={company} key={index} />)
          }
        </div>

        {/* Suggested Course Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Suggested Course</h2>

          <div className='space-y-4'>
           {course?.data?.courses?.slice(0,2).map((course:Course, index:any) => (
                   <div className="flex justify-center" key={index}>
                     <CourseCard key={index} course={course}></CourseCard>
                   </div>
                 ))}
          </div>


        </div>
      </div>
    </div>
  )
}
