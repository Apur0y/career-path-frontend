'use client'
import React, { useState } from 'react';
import { MapPin, Star, Save, Eye } from 'lucide-react';

// Filter Sidebar Component
const FilterSidebar = () => {
//   const [workMode, setWorkMode] = useState('');
  const [experience, setExperience] = useState(5);

  return (
    <div className="w-80 bg-white p-6 border-r border-gray-200 h-screen overflow-y-auto">
      <h2 className="text-lg font-semibold mb-6">All Filters</h2>
      
      {/* Work Mode Filter */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">Work mode</h3>
          <span className="text-blue-500 text-sm cursor-pointer">Applied (1)</span>
        </div>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm">On Desk</span>
            <span className="text-gray-400 text-xs ml-auto">(375)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm">Remote</span>
            <span className="text-gray-400 text-xs ml-auto">(267)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded text-primary" defaultChecked />
            <span className="text-sm">Hybrid</span>
            <span className="text-gray-400 text-xs ml-auto">(156)</span>
          </label>
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
              onChange={(e) => setExperience(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
              {experience}
            </div>
          </div>
          <span className="text-sm">25 Yr</span>
        </div>
      </div>

      {/* Department Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Department</h3>
        <div className="space-y-2">
          {[
            { name: 'UI/UX Designer', count: '(573)' },
            { name: 'Font-End Development', count: '(387)' },
            { name: 'Back-End Development', count: '(287)' },
            { name: 'Data Entry Operator', count: '(167)' },
            { name: 'Graphics Designer', count: '(123)' },
            { name: 'Data Analytics', count: '(98)' },
            { name: 'Devops Engineer', count: '(87)' }
          ].map((dept, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">{dept.name}</span>
              <span className="text-gray-400 text-xs ml-auto">{dept.count}</span>
            </label>
          ))}
        </div>
        <button className="text-blue-500 text-sm mt-2">View More</button>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Location</h3>
        <div className="space-y-2">
          {[
            { name: 'Dhaka', count: '(2706)' },
            { name: 'Chittagong', count: '(567)' },
            { name: 'Cumilla', count: '(234)' },
            { name: 'Jashore', count: '(187)' },
            { name: 'Barishal', count: '(156)' },
            { name: 'Rangpur', count: '(98)' },
            { name: 'Sylhet', count: '(87)' }
          ].map((location, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">{location.name}</span>
              <span className="text-gray-400 text-xs ml-auto">{location.count}</span>
            </label>
          ))}
        </div>
        <button className="text-blue-500 text-sm mt-2">View More</button>
      </div>

      {/* Salary Range Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Salary Range</h3>
        <div className="space-y-2">
          {[
            { range: '1tk - 20k', count: '(1760)' },
            { range: '20k - 40k', count: '(876)' },
            { range: '40k - 60k', count: '(567)' },
            { range: '60k - 80k', count: '(345)' },
            { range: '80k - 1lakh', count: '(234)' },
            { range: '1lakh - 2lakh', count: '(123)' },
            { range: 'Negotiable', count: '(89)' }
          ].map((salary, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">{salary.range}</span>
              <span className="text-gray-400 text-xs ml-auto">{salary.count}</span>
            </label>
          ))}
        </div>
        <button className="text-blue-500 text-sm mt-2">View More</button>
      </div>

      {/* Education Qualification Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Education Qualification</h3>
        <div className="space-y-2">
          {[
            { qual: 'Any Postgraduate', count: '(1240)' },
            { qual: 'Graduate', count: '(876)' },
            { qual: 'MSC', count: '(567)' },
            { qual: 'B.Sc Honours', count: '(456)' },
            { qual: 'B.Sc Engineer', count: '(345)' },
            { qual: 'Diploma Engineer', count: '(234)' }
          ].map((edu, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">{edu.qual}</span>
              <span className="text-gray-400 text-xs ml-auto">{edu.count}</span>
            </label>
          ))}
        </div>
        <button className="text-blue-500 text-sm mt-2">View More</button>
      </div>

      {/* Companies Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Companies</h3>
        <div className="space-y-2">
          {[
            { company: 'SM Technology', count: '(8)' },
            { company: 'Ocean Lab', count: '(6)' },
            { company: 'NexTech Agency', count: '(5)' },
            { company: 'Software Agency', count: '(4)' },
            { company: 'Creative Agency', count: '(3)' }
          ].map((comp, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">{comp.company}</span>
              <span className="text-gray-400 text-xs ml-auto">{comp.count}</span>
            </label>
          ))}
        </div>
        <button className="text-blue-500 text-sm mt-2">View More</button>
      </div>
    </div>
  );
};

// Job Card Component
type Job = {
  company: string;
  title: string;
  location: string;
  rating: string;
  reviews: string;
  skills: string;
  salary: string;
  timePosted: string;
};

const JobCard = ({ job }: { job: Job }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">SM</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{job.company}</h3>
            <p className="text-gray-500 text-sm">{job.timePosted}</p>
          </div>
        </div>
        <Save className="w-5 h-5 text-gray-400 cursor-pointer hover:text-blue-500" />
      </div>
      
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h2>
      
      <div className="flex items-center space-x-4 mb-3">
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{job.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm">{job.rating}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Eye className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{job.reviews} Reviews</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        <span className="font-medium">Skill Needed:</span> {job.skills}
      </p>
      
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-900">
          ${job.salary} <span className="text-sm font-normal text-gray-500">/month</span>
        </div>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

// Job List Component
const JobList = () => {
  const jobs = [
    {
      company: "SM Technology",
      title: "UI/UX Designer", 
      location: "Dhaka, Bangladesh (Onsite)",
      rating: "2.9",
      reviews: "4.0 (50 Reviews)",
      skills: "Figma • Adobe Illustrator • Adobe Photoshop • Adobe XD(optional)",
      salary: "4,500",
      timePosted: "Updated 2 days ago"
    },
    {
      company: "SM Technology",
      title: "UI/UX Designer", 
      location: "Dhaka, Bangladesh (Onsite)",
      rating: "2.9",
      reviews: "4.0 (50 Reviews)",
      skills: "Figma • Adobe Illustrator • Adobe Photoshop • Adobe XD(optional)",
      salary: "4,500",
      timePosted: "Updated 2 days ago"
    },
    {
      company: "SM Technology",
      title: "UI/UX Designer", 
      location: "Dhaka, Bangladesh (Onsite)",
      rating: "2.9",
      reviews: "4.0 (50 Reviews)",
      skills: "Figma • Adobe Illustrator • Adobe Photoshop • Adobe XD(optional)",
      salary: "4,500",
      timePosted: "Updated 2 days ago"
    },
    {
      company: "SM Technology",
      title: "UI/UX Designer", 
      location: "Dhaka, Bangladesh (Onsite)",
      rating: "2.9",
      reviews: "4.0 (50 Reviews)",
      skills: "Figma • Adobe Illustrator • Adobe Photoshop • Adobe XD(optional)",
      salary: "4,500",
      timePosted: "Updated 2 days ago"
    },
    {
      company: "SM Technology",
      title: "UI/UX Designer", 
      location: "Dhaka, Bangladesh (Onsite)",
      rating: "2.9",
      reviews: "4.0 (50 Reviews)",
      skills: "Figma • Adobe Illustrator • Adobe Photoshop • Adobe XD(optional)",
      salary: "4,500",
      timePosted: "Updated 2 days ago"
    },
    {
      company: "SM Technology",
      title: "UI/UX Designer", 
      location: "Dhaka, Bangladesh (Onsite)",
      rating: "2.9",
      reviews: "4.0 (50 Reviews)",
      skills: "Figma • Adobe Illustrator • Adobe Photoshop • Adobe XD(optional)",
      salary: "4,500",
      timePosted: "Updated 2 days ago"
    }
  ];

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
      {jobs.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
    </div>
  );
};

// Right Sidebar Component
const RightSidebar = () => {
  return (
    <div className="w-80 bg-white p-6 border-l border-gray-200 h-screen overflow-y-auto">
      {/* Top Company Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Top Company</h2>
        <div className="bg-gray-50 rounded-lg p-4">
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
        </div>
      </div>

      {/* Suggested Course Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Suggested Course</h2>
        <div className="space-y-4">
          {/* Course 1 */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-4 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">GRAPHICS DESIGN</h3>
              <div className="mb-3">
                <h4 className="font-semibold">Graphic Design Masterclass</h4>
                <p className="text-sm opacity-90">Instructor: Rafiul Rahman</p>
              </div>
              <button className="bg-white text-gray-800 px-4 py-2 rounded text-sm font-medium hover:bg-gray-100">
                See Details
              </button>
            </div>
            <div className="absolute right-0 top-0 w-24 h-24 bg-yellow-400 rounded-full opacity-20 transform translate-x-8 -translate-y-8"></div>
          </div>

          {/* Course 2 */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">GRAPHICS DESIGN</h3>
              <div className="mb-3">
                <h4 className="font-semibold">Graphic Design Masterclass</h4>
                <p className="text-sm opacity-90">Instructor: Rafiul Rahman</p>
              </div>
              <button className="bg-white text-gray-800 px-4 py-2 rounded text-sm font-medium hover:bg-gray-100">
                See Details
              </button>
            </div>
            <div className="absolute right-0 top-0 w-24 h-24 bg-pink-400 rounded-full opacity-20 transform translate-x-8 -translate-y-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Job Search Page Component
const JobSearchPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <FilterSidebar />
      <JobList />
      <RightSidebar />
    </div>
  );
};

export default JobSearchPage;