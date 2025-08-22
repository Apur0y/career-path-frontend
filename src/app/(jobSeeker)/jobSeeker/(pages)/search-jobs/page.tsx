"use client"
import { FilterSidebar } from "@/components/search-jobs/filterSidebar/page";
import JobList from "@/components/search-jobs/jobList/page";
import SerachRightSideBar from "@/components/search-jobs/rightSearchBar/page";
import JobSeekerNavbar from "@/components/seeker-home/SeekerNavbar";
import AllCategory from "@/components/seeker-home/TopCategory/AllCategory";
import Container from "@/components/ui/Container";
import { resetStore, setFilters } from "@/redux/features/search/searchSlice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function SearchJobPage() {

    const [isFilterSidebarVisible, setIsFilterSidebarVisible] = useState(true);
    const [filtersData, setFiltersData] = useState([]);

    const searchConfig = useSelector((state: RootState) =>
        state.search.find((config: any) => config.id === 1)
    );
    const dispatch = useDispatch()

    const { searchFilters }: any = searchConfig;

    // Initialize state to store query parameters
    const [searchQuery, setSearchQuery] = useState<string | null>();
    const [locationQuery, setLocationQuery] = useState<string | null>();
    const [keywordQuery, setKeywordQuery] = useState<string | null>();

    useEffect(() => {
        // Update the state from URL if URL changes without reloading the page
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);

            setSearchQuery(urlParams.get("jobName"));
            setLocationQuery(urlParams.get("location"));
            setKeywordQuery(urlParams.get("searchTerm"));
        }
    }, [window?.location.search]); // This will run only once when the component mounts

    const handleCross = (query: string) => {
        dispatch(resetStore())
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);

            // Conditionally remove either 'jobName' or 'location' based on the passed argument
            if (query === "jobName") {
                urlParams.delete("jobName");
                setSearchQuery(null); // Update the state to reflect the removal of the query
            } else if (query === "location") {
                urlParams.delete("location");
                setLocationQuery(null); // Update the state to reflect the removal of the query
            } else if (query === "searchTerm") {
                urlParams.delete("searchTerm");
                setKeywordQuery(null);
                
            }
            // Update the URL without reloading the page
            window.history.replaceState(
                null,
                "",
                window.location.pathname + "?" + urlParams.toString()
            );
        }
    };


    return (
        <div className="mt-8">
            {/* <AllCategory /> */}

            <div className="max-w-[1420px] mx-5 xl:mx-auto mb-7 flex gap-4 items-center">
                {
                    searchQuery && locationQuery ? (
                        <div className="flex gap-4 items-center">
                            <p className="md:text-2xl">Search:</p>
                            <p className="md:text-xl bg-gray-200 px-5 py-1 rounded-full flex gap-3 items-center">
                                {searchQuery}
                                <button onClick={() => handleCross("jobName")} className="mt-1 text-sm cursor-pointer">✕</button>
                            </p>

                            <p className="md:text-2xl">Location:</p>
                            <p className="md:text-xl bg-gray-200 px-5 py-1 rounded-full flex gap-3 items-center">
                                {locationQuery}
                                <button onClick={() => handleCross("location")} className="mt-1 text-sm cursor-pointer">✕</button>
                            </p>
                        </div>
                    ) : searchQuery ? (
                        <div className="flex gap-4 items-center">
                            <p className="md:text-2xl">Search:</p>
                            <p className="md:text-xl bg-gray-200 px-5 py-1 rounded-full flex gap-3 items-center">
                                {searchQuery}
                                <button onClick={() => handleCross("jobName")} className="mt-1 text-sm cursor-pointer">✕</button>
                            </p>
                        </div>
                    ) : locationQuery ? (
                        <div className="flex gap-4 items-center">
                            <p className="md:text-2xl">Location:</p>
                            <p className="md:text-xl bg-gray-200 px-5 py-1 rounded-full flex gap-3 items-center">
                                {locationQuery}
                                <button onClick={() => handleCross("location")} className="mt-1 text-sm cursor-pointer">✕</button>
                            </p>
                        </div>
                    ) : keywordQuery ? (
                        <div className="flex gap-4 items-center">
                            <p className="md:text-2xl">Keyword:</p>
                            <p className="md:text-xl bg-gray-200 px-5 py-1 rounded-full flex gap-3 items-center">
                                {keywordQuery}
                                <button onClick={() => handleCross("searchTerm")} className="mt-1 text-sm cursor-pointer">✕</button>
                            </p>
                        </div>
                    ) : null
                }


            </div>


            {/* Toggle Button for FilterSidebar */}
            <button
                className="px-4 py-2 border rounded-md shadow-md border-gray-200 ml-2 mb-4 lg:hidden"
                onClick={() => setIsFilterSidebarVisible(!isFilterSidebarVisible)}
            >
                All Filter
            </button>

            <div className="max-w-[1420px] flex mx-auto">
                <div
                    className={`
    transition-all duration-300

    // Small screens (mobile/tablet)
    absolute
    ${isFilterSidebarVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}

    // Large screens (desktop and up)
    lg:relative
    lg:translate-x-0
    lg:opacity-100
    lg:visible
    lg:block
  `}
                >
                    <FilterSidebar setIsFilterSidebarVisible={setIsFilterSidebarVisible} isFilterSidebarVisible={isFilterSidebarVisible} setFiltersData={setFiltersData} />
                </div>


                <div className="flex-1 gap-5 px-4 md:px-6 lg:px-8 md:flex">

                    <JobList filtersData={filtersData} />
                    <SerachRightSideBar />
                </div>
            </div>
        </div>
    )
}
