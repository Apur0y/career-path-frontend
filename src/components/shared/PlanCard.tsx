import { GiCheckMark } from "react-icons/gi";


interface PackageCardProps {
  price: string;
  planType: string;
  packageName: string;
  permissions: string[];
  buttonText: string;
  onButtonClick?: () => void;
}

export default function PackageCard({
  price,
  planType,
  packageName,
  permissions,
  onButtonClick,
  buttonText,
}: PackageCardProps) {




  return (
    <div className="relative w-full max-w-[457px]  2xl:min-w-[457px] border border-gray-100 bg-white rounded-lg px-6 py-5 flex flex-col justify-between sm:px-8 sm:py-6">
      <div>
        {/* Badge - Responsive Position */}
        {
          buttonText && <div className="absolute top-2 right-4 sm:right-6">
            <span className="bg-green-300 text-xs font-medium px-3 py-1 rounded-full">
              {buttonText}
            </span>
          </div>
        }


        {/* Price Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-baseline gap-1">
            <span className="text-primary text-3xl sm:text-5xl font-bold">
              €{price}
            </span>
            <span className="text-gray-600 text-sm sm:text-base">/month</span>
          </div>
        </div>

        {/* Package Name & Type */}
        <p className="text-xs sm:text-sm text-gray-500 text-center mb-2">
          {planType}
        </p>
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 leading-tight">
          {packageName}
        </h1>

        {/* Permissions */}
        <ul className="space-y-3 sm:space-y-4 mb-6 text-gray-700">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Permissions:
          </p>
          {permissions?.map((permission, index) => (
            <li key={index} className="flex items-start gap-2">
              <GiCheckMark />
              <span className="text-xs sm:text-sm leading-tight">
                {permission}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      {
        buttonText ? <button
    
          className={`${buttonText ? "bg-gray-300 cursor-not-allowed disabled" : "bg-primary hover:cursor-pointer hover:bg-white hover:text-black hover:border-gray-400 "} w-full px-4 py-2.5  text-white text-sm font-medium rounded-lg   border border-transparent  transition-all duration-300`}
        >
          Get Started
        </button> : <button
          onClick={onButtonClick}
          className={`w-full px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:cursor-pointer hover:bg-white hover:text-black hover:border-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-300`}
        >
          Get Started
        </button>
      }

    </div>
  );
}
