"use client";
import {
  useGetAllLocationsQuery,
  useGetCompanyNamesQuery,
  useGetDepartmentsQuery,
  useGetWorkModesQuery,
} from "@/redux/features/filters/filterSlice";
import {
  JobFilterType,
  useGetAllJobPostsQuery,
  useLazyGetAllJobPostsQuery,
} from "@/redux/features/job/jobSlice";
import { RootState } from "@/redux/store";
import { Department, WorkMode } from "@/types/categoryType/Category";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

// const allLocation = [
//   { name: "Erdmannhausen", count: "" },
//   { name: "München", count: "" },
//   { name: "Wembach", count: "" },
//   { name: "Malgersdorf", count: "" },
//   { name: "Neustetten", count: "" },
//   { name: "The Black Forest", count: "" },
//   { name: "Cologne Cathedral", count: "" },

//   // { name: 'In velit eu est co', count: '(98)' },
//   // { name: 'Exercitation sapient', count: '(87)' },
// ];

const salaryRanges = [
  { range: "$1000-$2000", count: "" },
  { range: "$2000 - $5000", count: "" },
  { range: "$1000-$7000", count: "" },
  { range: "$9,000 - $12,000", count: "" },
  // { range: '80k - 1lakh', count: '' },
  // { range: '1lakh - 2lakh', count: '(123)' },
  // { range: 'Negotiable', count: '(89)' },
];

const educationQualifications = [
  { qual: "Any Postgraduate", count: "" },
  { qual: "Graduate", count: "" },
  { qual: "MSC", count: "" },
  { qual: "B.Sc Honours", count: "" },
  { qual: "B.Sc Engineer", count: "" },
  { qual: "Diploma Engineer", count: "" },
];

// Filter Sidebar Component
export const FilterSidebar = ({ setFiltersData, isFilterSidebarVisible, setIsFilterSidebarVisible }: any) => {

  const [experience, setExperience] = useState("0");
  const [showAll, setShowAll] = useState(false);
  const [showAllCompanies, setShowAllCompanies] = useState(false);
  // State for tracking selected filters
  const [selectedWorkModes, setSelectedWorkModes] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSalaries, setSelectedSalaries] = useState<string[]>([]);
  const [selectedEducations, setSelectedEducations] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedSearchTerm, setSelectedSearchTerm] = useState<string[]>([]);

  // Handle All Location Button
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [showAllSalaries, setShowAllSalaries] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  // const [showAllCompanies, setShowAllCompanies] = useState(false);

  // Filter store data
  const filters: JobFilterType = {
    companyName: [],
    title: [],
    educations: [],
    experience: "0",
    locations: [],
    salaryRange: [],
    jobType: [],
  };

  const { data: type } = useGetWorkModesQuery({});
  const { data: department } = useGetDepartmentsQuery({});
  const { data: comName } = useGetCompanyNamesQuery({});
  const { data: location } = useGetAllLocationsQuery({})
  const [filterJobPostsTrigger, { data: info, isFetching }] =
    useLazyGetAllJobPostsQuery();
  // const { data: info, isFetching } = useGetAllJobPostsQuery(filters);

  const workType = type?.data;
  const allDepartment = department?.data || [];
  const allCompany = comName?.data;
  const allLocation = location?.data


  // Sort departments by length (highest to lowest) and slice based on showAll state
  const displayedDepartments = useMemo(() => {
    const sorted = [...allDepartment].sort((a, b) => b.length - a.length);
    return showAll ? sorted : sorted.slice(0, 6);
  }, [allDepartment, showAll]);
  const hasMoreDepartments = allDepartment.length > 5;

  const displayedCompanies = useMemo(() => {
    if (!Array.isArray(allCompany)) return [];
    const sorted = [...allCompany].sort((a, b) => b.length - a.length);
    return showAllCompanies ? sorted : sorted.slice(0, 6);
  }, [allCompany, showAllCompanies]);
  const hasMoreCompanies = Array.isArray(allCompany) && allCompany.length > 5;


  const handleWorkModeChange = (jobType: string) => {
    setSelectedWorkModes((prev) =>
      prev.includes(jobType)
        ? prev.filter((item) => item !== jobType)
        : [...prev, jobType]
    );
  };

  const handleDepartmentChange = (title: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const handleLocationChange = (name: string) => {
    setSelectedLocations((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const handleSalaryChange = (range: string) => {
    setSelectedSalaries((prev) =>
      prev.includes(range)
        ? prev.filter((item) => item !== range)
        : [...prev, range]
    );
  };

  const handleEducationChange = (qual: string) => {
    setSelectedEducations((prev) =>
      prev.includes(qual)
        ? prev.filter((item) => item !== qual)
        : [...prev, qual]
    );
  };

  const handleCompanyChange = (companyName: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyName)
        ? prev.filter((item) => item !== companyName)
        : [...prev, companyName]
    );
  };

  const searchConfig = useSelector((state: RootState) =>
    state.search.find((config: any) => config.id === 1)
  );
  const { searchFilters }: any = searchConfig

  const searchParams = useSearchParams()

  useEffect(() => {
    // Ensure the code runs only in the browser (client-side)
    if (typeof window !== 'undefined') {
      // Update selectedDepartments and selectedLocations based on the URL query params
      const urlParams = new URLSearchParams(window.location.search);
      const searchQuery = urlParams.get("jobName");
      const locationQuery = urlParams.get("location");
      const keywordQuery = urlParams.get("searchTerm");

      if (keywordQuery) {
        setSelectedSearchTerm([keywordQuery]); // Reset and set only the current keywordQuery
      }else{
        setSelectedSearchTerm([])
      }



      // const res= workType?.find((item: WorkMode) => item?.jobType === keywordQuery);
      //  const resDep = allDepartment?.find((item: Department) => item?.title === keywordQuery);
      //  console.log("Res dipp",resDep)
      //  console.log("Res WOrk",res)
      //     if( keywordQuery && res) {

      //       if(res) {
      //         setSelectedWorkModes((prev) =>
      //           prev.includes(res.jobType)
      //             ? prev
      //             : [...prev, res.jobType]
      //         );
      //       }else{
      //         setSelectedWorkModes([]); // Reset when keywordQuery is null
      //       }

      //     }else if(keywordQuery ){

      //       if (resDep) {
      //         setSelectedDepartments((prev) =>
      //           prev.includes(resDep?.title)
      //             ? prev
      //             : [...prev, resDep?.title]
      //         );
      //       }else{
      //         setSelectedDepartments([]); // Reset when keywordQuery is null
      //       }
      //     }else if(keywordQuery){
      //       const res = allCompany?.find((item: any) => item.companyName === keywordQuery);
      //       if (res) {
      //         setSelectedCompanies((prev) =>
      //           prev.includes(res?.companyName)
      //             ? prev
      //             : [...prev, res?.companyName]
      //         );
      //       }else{
      //         setSelectedCompanies([]); // Reset when keywordQuery is null
      //       }
      //     }

      console.log(urlParams);
      console.log("Search:", searchQuery, "Location:", locationQuery);

      // Update selectedDepartments based on the searchQuery
      if (searchQuery) {
        setSelectedDepartments((prev) =>
          prev.includes(searchQuery)
            ? prev
            : [...prev, searchQuery]
        );
      } else {
        setSelectedDepartments([]); // Reset when searchQuery is null
      }

      // Update selectedLocations based on the locationQuery
      if (locationQuery) {
        setSelectedLocations((prev) =>
          prev.includes(locationQuery)
            ? prev
            : [...prev, locationQuery]
        );
      } else {
        setSelectedLocations([]); // Reset when locationQuery is null
      }
    }
  }, [searchParams]);


  // useEffect(() => {
  //   if (searchFilters.length > 0) {
  //     setSelectedDepartments((prev) =>
  //       prev.includes(searchFilters[0])
  //         ? prev.filter((item) => item !== searchFilters[0])
  //         : [...prev, searchFilters[0]]
  //     );

  //     if (searchFilters[1] != "") {

  //       setSelectedLocations((prev) =>
  //         prev.includes(searchFilters[1])
  //           ? prev.filter((item) => item !== searchFilters[1])
  //           : [...prev, searchFilters[1]]
  //       );
  //     }
  //   }
  // }, [searchFilters,locationQuery])

  useEffect(() => {
    const formData = {
      jobType: selectedWorkModes,
      // experience: Number(experience) > 0 && `${Number(experience) === 1 ? `${experience}-year` : `${experience}-years`}`,
      experience: Number(experience) > 0
        ? `${Number(experience) === 1 ? `${experience}-year` : `${experience}-years`}`
        : undefined,
      title: selectedDepartments,
      locations: selectedLocations,
      salaryRange: selectedSalaries,
      educations: selectedEducations,
      companyName: selectedCompanies,
      searchTerm: selectedSearchTerm
    };
    console.log("Form Data printed:", formData);

    // filterJobPostsTrigger(formData);
    const fetchData = async () => {



      const response = await filterJobPostsTrigger(formData);
      setFiltersData(response?.data?.data?.data);
      setIsFilterSidebarVisible(!isFilterSidebarVisible)
    }

    fetchData();
  }, [selectedWorkModes, selectedDepartments, selectedCompanies, selectedEducations, selectedSalaries, experience, searchFilters, selectedLocations])

  return (
    <div className="md:w-[337px] h-[600px] lg:h-max overflow-auto lg:bg-white p-6 border border-gray-200 ml-3 2xl:ml-0 shadow-lg rounded-lg lg:rounded-none bg-green-50 relative z-50">
      <h2 className="text-lg font-semibold mb-6">All Filters</h2>

      {/* Work Mode Filter */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">Work mode</h3>
          <span className="text-blue-500 text-sm cursor-pointer">
            Applied ({selectedWorkModes.length + selectedDepartments.length + selectedCompanies.length + selectedLocations.length + selectedSalaries.length})
          </span>
        </div>
        <div className="space-y-2">
          {workType?.map((type: WorkMode) => (
            <label key={type.jobType} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                checked={selectedWorkModes.includes(type.jobType)}
                onChange={() => handleWorkModeChange(type.jobType)}
              />
              <span className="text-sm">{type.jobType.charAt(0).toUpperCase() + type.jobType.slice(1).toLowerCase()}</span>
              <span className="text-gray-400 text-xs ml-auto">
                ({type.length})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Experience</h3>
        <div className="flex items-center space-x-4">
          <span className="text-sm">0</span>
          <div className="flex-1 relative">
            <input
              type="range"
              min="0"
              max="10"
              value={experience}
              // onChange={(e) => setExperience(Number(e.target.value))}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
              {experience}
            </div>
          </div>
          <span className="text-sm">10 Yr</span>
        </div>
      </div>

      {/* Position Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Position</h3>
        <div className="space-y-2">
          {displayedDepartments.map((dept: Department, index: number) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                checked={selectedDepartments.includes(dept.title)}
                onChange={() => handleDepartmentChange(dept.title)}
              />
              <span className="text-sm">{dept.title}</span>
              <span className="text-gray-400 text-xs ml-auto">
                {dept.length}
              </span>
            </label>
          ))}
        </div>
        {hasMoreDepartments && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-500 text-sm mt-2 hover:text-blue-600 transition-colors"
          >
            {showAll ? "View Less" : "View More"}
          </button>
        )}
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Location</h3>
        <div className="space-y-2">
          {(showAllLocations ? allLocation : allLocation?.slice(0, 5))?.map(
            (location: any, index: any) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded "
                  checked={selectedLocations.includes(location.location)}
                  onChange={() => handleLocationChange(location.location)}
                />
                <span className="text-sm">{location.location}</span>
                <span className="text-gray-400 text-xs ml-auto">
                  {location.length}
                </span>
              </label>
            )
          )}
        </div>
        {allLocation?.length > 5 && (
          <button
            className="text-blue-500 text-sm mt-2"
            onClick={() => setShowAllLocations(!showAllLocations)}
          >
            {showAllLocations ? "Show Less" : "View More"}
          </button>
        )}
      </div>

      {/* Salary Range Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Salary Range</h3>
        <div className="space-y-2">
          {(showAllSalaries ? salaryRanges : salaryRanges.slice(0, 5)).map(
            (salary, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={selectedSalaries.includes(salary.range)}
                  onChange={() => handleSalaryChange(salary.range)}
                />
                <span className="text-sm">{salary.range}</span>
                <span className="text-gray-400 text-xs ml-auto">
                  {salary.count}
                </span>
              </label>
            )
          )}
        </div>
        {salaryRanges.length > 5 && (
          <button
            className="text-blue-500 text-sm mt-2"
            onClick={() => setShowAllSalaries(!showAllSalaries)}
          >
            {showAllSalaries ? "Show Less" : "View More"}
          </button>
        )}
      </div>

      {/* Education Qualification Filter */}
      {/* <div className="mb-6">
        <h3 className="font-medium mb-3">Education Qualification</h3>
        <div className="space-y-2">
          {(showAllEducations ? educationQualifications : educationQualifications.slice(0, 4)).map((edu, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                checked={selectedEducations.includes(edu.qual)}
                onChange={() => handleEducationChange(edu.qual)}
              />
              <span className="text-sm">{edu.qual}</span>
              <span className="text-gray-400 text-xs ml-auto">{edu.count}</span>
            </label>
          ))}
        </div>
        {educationQualifications.length > 4 && (
          <button
            className="text-blue-500 text-sm mt-2"
            onClick={() => setShowAllEducations(!showAllEducations)}
          >
            {showAllEducations ? "Show Less" : "View More"}
          </button>
        )}
      </div> */}

      {/* Companies Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Company</h3>
        <div className="space-y-2">
          {displayedCompanies.map((company, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                checked={selectedCompanies.includes(company.companyName)}
                onChange={() => handleCompanyChange(company.companyName)}
              />
              <span className="text-sm">{company.companyName}</span>
              <span className="text-gray-400 text-xs ml-auto">
                {company.length}
              </span>
            </label>
          ))}
        </div>
        {hasMoreCompanies && (
          <button
            onClick={() => setShowAllCompanies(!showAllCompanies)}
            className="text-blue-500 text-sm mt-2 hover:text-blue-600 transition-colors"
          >
            {showAllCompanies ? "View Less" : "View More"}
          </button>
        )}
      </div>

      {/* Apply Button */}
      {/* <div className="flex justify-end">
        <button
          onClick={handleApply}
          className="px-3 py-1 border border-gray-200 rounded-md shadow-md bg-primary text-white hover:bg-green-600 cursor-pointer transition-all duration-300"
          disabled={isFetching}
        >
          {isFetching ? "Applying..." : "Apply"}
        </button>
      </div> */}
    </div>
  );
};
