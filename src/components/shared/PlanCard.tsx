import { GiCheckMark } from "react-icons/gi";
import { FaCrown, FaFire, FaStar, FaCheckCircle } from "react-icons/fa";

interface PackageCardProps {
  price: string;
  planType: string;
  packageName: string;
  permissions: string[];
  buttonText?: string;
  onButtonClick?: () => void;
  popular?: boolean;
  recommended?: boolean;
  savings?: string;
  features?: string[];
}

export default function PackageCard({
  price,
  planType,
  packageName,
  permissions,
  onButtonClick,
  buttonText,
  popular = false,
  recommended = false,
  savings,
  features = []
}: PackageCardProps) {

  const getPlanIcon = () => {
    if (recommended) return <FaCrown className="text-yellow-500 text-lg" />;
    if (popular) return <FaFire className="text-orange-500 text-lg" />;
    return <FaStar className="text-blue-400 text-lg" />;
  };

  return (
    <div className={`relative w-full max-w-[400px] border rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl
      ${popular ? 'border-2 border-blue-500 shadow-xl' : 'border-gray-200 shadow-md'}`}>
      
      {/* Premium Badge */}
      {recommended && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            <FaCrown className="text-white" />
            <span>RECOMMENDED</span>
          </div>
        </div>
      )}

      {/* Popular Badge */}
      {popular && !recommended && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow flex items-center gap-1">
            <FaFire className="text-white text-xs" />
            <span>POPULAR</span>
          </div>
        </div>
      )}

      {/* Card Header with Gradient */}
      <div className={`bg-gradient-to-r p-6 text-center
        ${popular ? 'from-blue-600 to-blue-800' : 'from-gray-800 to-gray-900'}`}>
        
        <div className="flex justify-center items-center gap-2 mb-2">
          {getPlanIcon()}
          <p className="text-sm font-medium text-blue-100 uppercase tracking-wider">
            {planType}
          </p>
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-2">
          {packageName}
        </h1>
        
        <div className="flex items-baseline justify-center gap-1 mb-2">
          <span className="text-4xl font-bold text-white">€{price}</span>
          <span className="text-gray-300 text-sm">/month</span>
        </div>
        
        {savings && (
          <p className="text-green-300 text-sm font-medium">
            Save {savings} compared to monthly
          </p>
        )}
      </div>

      {/* Card Body */}
      <div className="bg-white p-6">
        {/* Features Summary */}
        {features.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Key Features</p>
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <span key={index} className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Permissions */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <FaCheckCircle className="text-green-500" />
            What's included:
          </p>
          
          <ul className="space-y-3">
            {permissions.map((permission, index) => (
              <li key={index} className="flex items-start gap-3">
                <GiCheckMark className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700 leading-tight">{permission}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <button
          onClick={onButtonClick}
          disabled={!!buttonText}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4
            ${popular 
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl' 
              : 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-gray-800 text-white shadow-md hover:shadow-lg'
            }
            ${buttonText ? 'opacity-75 cursor-not-allowed' : 'hover:-translate-y-1'}`}
        >
          {buttonText || 'Get Started Now'}
        </button>

        {/* Additional info */}
        <p className="text-xs text-gray-500 text-center mt-4">
          No hidden fees · Cancel anytime · 14-day money-back guarantee
        </p>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
    </div>
  );
}