'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { CgArrowsV } from 'react-icons/cg';
import { Link2Icon, MoreHorizontal } from 'lucide-react';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import { useGetInterviewsQuery } from '@/redux/features/job/jobSlice';
import { useGetMeQuery } from '@/redux/features/auth/auth';

type SortField = 'companyName' | 'interviewerName' | 'position' | 'interviewDate' | 'interviewLink';
type SortDirection = 'asc' | 'desc' | null;

interface SortConfig {
  field: SortField | null;
  direction: SortDirection;
}

const aiLogData = [
  {
    id: 1,
    timestamp: 'Jun 30, 2025 | 10:45 AM',
    userName: 'Rafiq Islam',
    projectName: 'Skyline Tower',
    action: 'AI Extracted FloorPlan.pdf',
    status: 'Success',
    notes: 'No issues found.',
  },
  {
    id: 2,
    timestamp: 'Jun 30, 2025 | 09:10 AM',
    userName: 'Nusrat Jahan',
    projectName: 'Green Valley',
    action: 'AI Extraction Failed',
    status: 'Failed',
    notes: 'Unsupported file format.',
  },
  {
    id: 3,
    timestamp: 'Jun 29, 2025 | 03:33 PM',
    userName: 'Tanvir Hasan',
    projectName: 'Bridge Point',
    action: 'Updated certificate via AI',
    status: 'Success',
    notes: 'Manually reviewed post-extraction.',
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const isSuccess = status === 'Success';
  const bg = isSuccess ? 'bg-green-100' : 'bg-red-100';
  const text = isSuccess ? 'text-green-800' : 'text-red-800';
  const border = isSuccess ? 'border-green-200' : 'border-red-200';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text} ${border} border`}>
      {status}
    </span>
  );
};

const ActionButton = () => (
  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
    <MoreHorizontal size={16} className="text-gray-500" />
  </button>
);

export default function InterviewSheduler() {
  const { data: info } = useGetInterviewsQuery({});
  const { data: user } = useGetMeQuery({});
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: null, direction: null });

  const interviews = info?.data || [];

  // Sorting function
  const handleSort = (field: SortField) => {
    let direction: SortDirection = 'asc';
    
    if (sortConfig.field === field) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }
    
    setSortConfig({ field: direction ? field : null, direction });
  };

  // Sorted data
  const sortedInterviews = useMemo(() => {
    if (!sortConfig.field || !sortConfig.direction) {
      return interviews;
    }

    const sorted = [...interviews].sort((a, b) => {
      let aValue: string | number | Date;
      let bValue: string | number | Date;

      switch (sortConfig.field) {
        case 'companyName':
          aValue = a?.companyName?.toLowerCase() || '';
          bValue = b?.companyName?.toLowerCase() || '';
          break;
        case 'interviewerName':
          aValue = a?.interviewerName?.toLowerCase() || '';
          bValue = b?.interviewerName?.toLowerCase() || '';
          break;
        case 'position':
          aValue = a?.position?.toLowerCase() || '';
          bValue = b?.position?.toLowerCase() || '';
          break;
        case 'interviewDate':
          aValue = new Date(a?.interviewDate || 0).getTime();
          bValue = new Date(b?.interviewDate || 0).getTime();
          break;
        case 'interviewLink':
          aValue = a?.interviewLink?.toLowerCase() || '';
          bValue = b?.interviewLink?.toLowerCase() || '';
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortConfig.direction === 'asc' 
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

    return sorted;
  }, [interviews, sortConfig]);

  console.log(info);

  return (
    <Container>
      <div className="md:px-12 ">
        {/* Table Title */}
        <div className="py-4 border-gray-200  ">
          <h2 className="text-lg md:text-[32px] font-semibold text-gray-900">Interview Scheduler</h2>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          {
            aiLogData ? <>
              <div className="min-w-[1200px]">
                <div className="bg-primary px-6 rounded-t-lg">
                  <div className="grid grid-cols-12 gap-4 py-3 text-white text-md lg:text-xl ">
                    <div className="col-span-2 flex items-center cursor-pointer" onClick={() => handleSort('companyName')}>Company Name <CgArrowsV className="my-auto ml-1" /></div>
                    <div className="col-span-2 flex items-center cursor-pointer" onClick={() => handleSort('interviewerName')}>Interviewer name <CgArrowsV className="my-auto ml-1" /></div>
                    <div className="col-span-2 flex items-center cursor-pointer" onClick={() => handleSort('position')}>Position <CgArrowsV className="my-auto ml-1" /></div>
                    <div className="col-span-2 flex items-center cursor-pointer" onClick={() => handleSort('interviewDate')}>Interview Date <CgArrowsV className="my-auto ml-1" /></div>
                    <div className="col-span-2 flex items-center cursor-pointer" onClick={() => handleSort('interviewLink')}>Interview Link <CgArrowsV className="my-auto ml-1" /></div>
                    <div className="col-span-2 flex items-center">Action</div>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {sortedInterviews?.map((row: any) => (
                    <div key={row.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="grid grid-cols-12 gap-4 items-center text-sm md:text-[16px] text-secondary">
                        <div className="col-span-2">{row.companyName}</div>
                        <div className="col-span-2">{row.interviewerName}</div>
                        <div className="col-span-2">{row.position}</div>
                        <div className="col-span-2">
                          {new Date(row.interviewDate).toLocaleDateString("en-GB")}{" "}
                          {new Date(row.interviewDate).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                        <div className="col-span-2 flex gap-2 underline cursor-pointer text-blue-600 hover:text-blue-700 transition">
                          <Link className='flex items-center' href={row.interviewLink}>
                            <Link2Icon />Interview link
                          </Link>
                        </div>
                        <div className="col-span-2  underline text-primary cursor-pointer hover:text-green-700 transition">
                          <Link href={`/jobSeeker/chat/${row.jobOwnerId}`}>
                            Chat Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </> : <><div className="flex justify-center items-center h-[400px] bg-gray-50">
              <div className="text-center p-8 rounded-lg bg-white shadow-md">
                <div className="text-gray-500 text-xl font-medium">
                  No Interview Found
                </div>
                <p className="mt-2 text-gray-400">
                  Check the applied jobs and wait for the interview.
                </p>
              </div>
            </div>
            </>
          }
        </div>
      </div>
    </Container>
  );
}