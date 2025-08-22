import { Company } from '@/types/AllTypes';
import Image from 'next/image';
import { CiLocationOn } from 'react-icons/ci';

export default function PopularCompanyCard({ company }: { company: Company }) {
    console.log(company)
    return (
        <div className="w-full md:max-w-[457px] mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-[18px] border border-gray-200 flex flex-col justify-between">
            <div className="relative ">
                <Image
                    src={company?.logo || "/c1.jpg"} // Add your actual image in the public folder
                    alt="Office Space"
                    className='rounded-lg'
                    objectFit="cover"
                    width={421}
                    height={270}
                />

                <div className='bg-white rounded-tr-lg pt-2 pr-2 absolute bottom-0'>

                    <div className=" bg-purple-600 text-white text-sm font-medium rounded-tr-lg p-3 w-[84px] h-[84px]  flex items-center justify-center ">
                        <div className=" text-white rounded-full font-bold text-3xl">
                            <h3 className="text-lg font-semibold">
                                {company?.companyName
                                    ? company?.companyName.split(" ").slice(0, 3).map((word) => word.charAt(0).toUpperCase()).join("")
                                    : "N/A"}
                            </h3>

                        </div>
                    </div>
                </div>

            </div>

            <div className="p-4">
                <div className="flex items-center space-x-4">
                    <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                        <h3 className="text-lg font-semibold">
                            {company?.companyName
                                ? company?.companyName.split(" ").slice(0, 3).map((word) => word.charAt(0).toUpperCase()).join("")
                                : "N/A"}
                        </h3>

                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">{company?.companyName}</h3>
                        <p className="text-sm text-gray-500">{company?.industryType}</p>
                    </div>
                </div>

                {/* <div className="mt-4 flex items-center text-yellow-500 space-x-1">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.868 1.4-8.168-5.934-5.787 8.2-1.191z" />
                    </svg>
                    <span className="text-sm font-semibold">4.9</span>
                </div> */}

                <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-700">
                    <p className='flex items-center gap-1'>   Location:<span className="bg-gray-100 px-3 py-1 rounded flex items-center gap-1"> <CiLocationOn />  {company?.city},{company?.country}</span></p>

                    {/* <span className="bg-gray-100 px-3 py-1 rounded">Software Company</span> */}
                    {/* <span className="bg-gray-100 px-3 py-1 rounded">256 Employees</span>
                    <span className="bg-gray-100 px-3 py-1 rounded">Two slots left</span> */}
                </div>
            </div>
        </div>
    );
}