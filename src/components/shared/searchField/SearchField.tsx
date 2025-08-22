'use client';
import { useGetAllJobPostsQuery } from '@/redux/features/job/jobSlice';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaRegBuilding, FaSearch } from 'react-icons/fa';
import { RiHomeSmile2Line, RiMenuSearchFill, RiUserLocationLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, setSearchTerm } from '@/redux/features/search/searchSlice';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';
import { IoSearchSharp } from 'react-icons/io5';

export default function SearchField({ setAnimate, animate }: any) {
  interface SearchFormInputs {
    jobName: string;
    location: string;
  }

  const { register, setValue, watch } = useForm<SearchFormInputs>();
  const watchFields = watch();
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { data: info } = useGetAllJobPostsQuery({ page: 1, limit: 1000 });
  const allJobsPost = info?.data?.data || [];
  const containerRef = useRef<HTMLDivElement>(null);
  const [warning, setWarning] = useState(false)

  const watchedJobName = watch('jobName');
  const watchedLocation = watch('location');

  const [focusedInput, setFocusedInput] = useState<'jobName' | 'location' | null>(null);
  const [activeInput, setActiveInput] = useState<'jobName' | 'location' | null>(null);

  const dispatch = useDispatch();

  // Get unique job titles and locations for better suggestions
  const getUniqueJobTitles = () => {
    const titles = allJobsPost.map((job: any) => job.title);
    return [...new Set(titles)].sort();
  };

  const getUniqueLocations = () => {
    const locations = allJobsPost.map((job: any) => job.location);
    return [...new Set(locations)].sort();
  };
  const getUniqueType = () => {
    const workMode = allJobsPost.map((job: any) => job.jobType);
    return [...new Set(workMode)].sort();
  };
  const getUniqueConpany = () => {
    const workMode = allJobsPost.map((job: any) => job.company.companyName);
    return [...new Set(workMode)].sort();
  };


  // Enhanced filtering logic based on focused input
  useEffect(() => {
    if (!activeInput) {
      setSuggestions([]);
      setShowResults(false);
      return;
    }

    const inputValue = activeInput === 'jobName' ? watchedJobName : watchedLocation;

    if (!inputValue || inputValue.trim() === '') {
      setSuggestions([]);
      setShowResults(false);
      return;
    }

    let filteredSuggestions: any[] = [];

    if (activeInput === 'jobName') {
      // Get unique job titles, types, and companies
      const uniqueTitles = getUniqueJobTitles();
      const getTypes = getUniqueType();
      const getCompany = getUniqueConpany();

      // Combine titles, types, and companies into a single array with type information
      const combinedSuggestions = [
        ...uniqueTitles.map((title: any) => ({
          type: 'title',
          value: title,
          displayText: title
        })),
        ...getTypes.map((type: any) => ({
          type: 'type',
          value: type,
          displayText: type
        })),
        ...getCompany.map((company: any) => ({
          type: 'company',
          value: company,
          displayText: company
        }))
      ];

      // Filter suggestions based on the input value
      filteredSuggestions = combinedSuggestions
        .filter((item: any) =>
          item.value.toLowerCase().includes(inputValue.toLowerCase())
        )
        .slice(0, 8); // Limit to 8 suggestions
    }
    else if (activeInput === 'location') {
      // Filter unique locations
      const uniqueLocations = getUniqueLocations();
      filteredSuggestions = uniqueLocations
        .filter((location: any) =>
          location.toLowerCase().includes(inputValue.toLowerCase())
        )
        .slice(0, 8) // Limit to 8 suggestions
        .map(location => ({
          type: 'location',
          value: location,
          displayText: location
        }));
    }

    setSuggestions(filteredSuggestions);
    setShowResults(filteredSuggestions.length > 0);
  }, [watchedJobName, watchedLocation, activeInput, allJobsPost]);

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setActiveInput(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const router = useRouter()

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${latitude},${longitude}&aqi=yes`
            );
            const data = await response.json();
            setValue('location', data.location.name || "Germany");
          } catch (error) {
            toast.error('Unable to fetch location data.');
            setValue('location', "Germany");
          }
        },
        () => toast.error('Unable to retrieve your location.')
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  };

  const handleSearch = () => {
    if (!watchedJobName && !watchedLocation) {
      // toast.error('Please enter a job title or location to search.');
      setFocusedInput('jobName');
      setActiveInput('jobName');
      setWarning(true)
      return;
    }

    setShowResults(false);
    setActiveInput(null);
    dispatch(setSearchTerm({ id: 1, searchTerm: "jobName" }));
    dispatch(setFilters({ id: 1, searchFilters: [watchedJobName, watchedLocation] }));
    router.push(`/jobSeeker/search-jobs/?searchTerm=${encodeURIComponent(watchedJobName)}&&location=${encodeURIComponent(watchedLocation)}`)
    setAnimate(!animate);
  };

  const handleSuggestionSelect = (suggestion: any) => {
    if (suggestion.type === 'title') {
      setValue('jobName', suggestion.value);  // Set the job name
    } else if (suggestion.type === 'type') {
      setValue('jobName', suggestion.value);  // Set the job type if type is selected
    } else if (suggestion.type === 'company') {
      setValue('jobName', suggestion.value);  // Set the job type if type is selected
    } else if (suggestion.type === 'location') {
      setValue('location', suggestion.value);  // Set the location if location is selected
    }

    // Hide the suggestion results and reset the active input field
    setShowResults(false);
    setActiveInput(null);
  };


  const handleInputFocus = (inputType: 'jobName' | 'location') => {
    setFocusedInput(inputType);
    setActiveInput(inputType);
    setWarning(false)
  };

  const handleInputBlur = () => {
    // Delay hiding results to allow for click on suggestions
    setTimeout(() => {
      setFocusedInput(null);
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent, inputType: 'jobName' | 'location') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowResults(false);
      setActiveInput(null);
    }
  };

  // Clear individual input
  const clearInput = (inputType: 'jobName' | 'location') => {
    setValue(inputType, '');
    setActiveInput(inputType);
  };
  const searchConfig = useSelector((state: RootState) =>
    state.search.find((config: any) => config.id === 1)
  );
  const { searchFilters }: any = searchConfig

  return (
    <div className="relative" ref={containerRef}>
      <h1 className="text-xl text-secondary font-medium">Find Your Favorite Job</h1>
      <div className="bg-white p-4 rounded-lg shadow flex flex-col 2xl:flex-row items-stretch gap-4 mt-2">
        {/* Job Name Input */}
        <div className={`flex items-center border-b px-3 py-2 flex-1 gap-2 transition-colors ${focusedInput === 'jobName' ? 'border-secondary' : 'border-gray-300'
          }`}>
          <IoSearchSharp className={`transition-colors size-5 ${focusedInput === 'jobName' ? 'text-secondary' : 'text-gray-500'
            }`} />
          <input
            type="text"
            placeholder="Keywords, Job Title, Company"
            className="flex-1 bg-transparent focus:outline-none"
            {...register('jobName')}
            onFocus={() => handleInputFocus('jobName')}
            onBlur={handleInputBlur}
            onKeyDown={(e) => handleKeyDown(e, 'jobName')}
            autoComplete="off"
            defaultValue={searchFilters[0]}
          />
          {watchedJobName && (
            <button
              type="button"
              onClick={() => clearInput('jobName')}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              ✕
            </button>
          )}
        </div>

        {/* Location Input */}
        <div className={`flex items-center border-b px-3 py-2 flex-1 gap-2 transition-colors ${focusedInput === 'location' ? 'border-secondary' : 'border-gray-300'
          }`}>
          <FaMapMarkerAlt className={`transition-colors ${focusedInput === 'location' ? 'text-secondary' : 'text-gray-500'
            }`} />
          <input
            type="text"
            placeholder="Postcode, City, Country"
            className="flex-1 bg-transparent focus:outline-none"
            {...register('location')}
            onFocus={() => handleInputFocus('location')}
            onBlur={handleInputBlur}
            onKeyDown={(e) => handleKeyDown(e, 'location')}
            autoComplete="off"
            defaultValue={searchFilters[1]}
          />
          {watchedLocation && (
            <button
              type="button"
              onClick={() => clearInput('location')}
              className="text-gray-400 hover:text-gray-600 text-sm mr-2"
            >
              ✕
            </button>
          )}
          <button
            type="button"
            onClick={getCurrentLocation}
            className="text-subtitle hover:text-secondary transition-colors"
            title="Use current location"
          >
            <RiUserLocationLine />
          </button>
        </div>

        {/* Search Button */}
        <button
          type="button"
          className="flex items-center gap-2 px-6 py-2 bg-secondary text-white rounded cursor-pointer hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSearch}

        >
          <FaSearch />
          Search
        </button>
      </div>
      {warning && <p className='text-red-600'>Please enter a job title or location to search.</p>}
      <p className='md:text-[16px] text-subtitle pt-2 '>Popular : UI Designer, UX Researcher, Android, Admin</p>

      {/* Enhanced Search Suggestions */}
      {showResults && suggestions.length === 0 && activeInput && (
        <div className="absolute top-28 bg-white shadow-lg rounded-lg px-4 py-3 w-full z-10 border">
          <p className="text-center text-gray-500">
            No {activeInput === 'jobName' ? 'job titles' : 'locations'} found
          </p>
        </div>
      )}

      {showResults && suggestions.length > 0 && (
        <div className="absolute top-28 bg-white shadow-lg rounded-lg w-full max-h-64 overflow-auto z-10 border border-gray-300">
          <div className="py-2">
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b">
              {activeInput === 'jobName' ? 'Keywords' : 'Locations'}
            </div>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionSelect(suggestion)}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {suggestion.type === 'title' ? (
                    <FaBriefcase className="text-gray-400 text-sm" />
                  ) : suggestion.type === 'company' ? (
                    <FaRegBuilding />

                  ) : suggestion.type === 'type' ?(
                    <><RiHomeSmile2Line /> </>
                  ):(
                    <><FaMapMarkerAlt className="text-gray-400 text-sm" /></>
                  )
                  }

                  <span className="text-gray-900 font-medium">
                    {suggestion.displayText}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}