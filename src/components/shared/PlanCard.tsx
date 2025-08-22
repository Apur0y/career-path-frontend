

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 24 25"
                fill="none"
                className="flex-shrink-0 mt-0.5"
              >
                <path
                  d="M9.62388 22.029C14.1234 22.029 17.771 18.3814 17.771 13.8819C17.771 9.38243 14.1234 5.73486 9.62388 5.73486C5.12438 5.73486 1.47681 9.38243 1.47681 13.8819C1.47681 18.3814 5.12438 22.029 9.62388 22.029Z"
                  fill="#B0EF8F"
                />
                <path
                  d="M9.71605 20.1789L9.61271 20.0028C8.03425 17.3134 3.83969 11.6061 3.79732 11.5488L3.73682 11.4666L5.16588 10.0543L9.68951 13.213C12.5377 9.51708 15.1949 6.97853 16.9281 5.49611C18.8242 3.8745 20.0584 3.12796 20.0708 3.1208L20.0989 3.104H22.523L22.2914 3.31022C16.3363 8.6145 9.88146 19.8882 9.81717 20.0015L9.71605 20.1789Z"
                  fill="#009045"
                />
              </svg>
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
