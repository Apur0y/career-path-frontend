import { useEffect, useState } from "react";

interface SocialLinksEditModalProps {
  isModalOpenEdit: boolean;
  setIsModalOpenEdit: (value: boolean) => void;
  field?: string;
  value?: string;
  onSave: (value: string) => void;
}

export const SocialLinksEditModal: React.FC<SocialLinksEditModalProps> = ({
  isModalOpenEdit,
  setIsModalOpenEdit,
  field,
  value,
  onSave,
}) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(inputValue);
  };

  const handleCancel = () => {
    setIsModalOpenEdit(false);
    setInputValue(value || '');
  };

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  if (!field) return null;

  const getFieldLabel = () => {
    switch (field) {
      case 'github_url': return 'GitHub URL';
      case 'linkedin_profile_url': return 'LinkedIn URL';
      case 'personal_website_url': return 'Personal Website URL';
      case 'portfolio_url': return 'Portfolio URL';
      case 'twitter_url': return 'Twitter URL';
      case 'other_social_media_url': return 'Other Social Media URL';
      default: return 'Social Media URL';
    }
  };

  return (
    <div>
      {isModalOpenEdit && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit {getFieldLabel()}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">{getFieldLabel()}</label>
                <input
                  type="url"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder={`Enter ${getFieldLabel()}`}
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 cursor-pointer "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-green-600 cursor-pointer "
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};













// import React, { useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";

// interface FormData {
//   title: string;
//   linkedin: string;
// }

// interface SocailContactModal {
//   isModalOpenEdit: boolean;
//   setIsModalOpenEdit: any;
// }

// const SocialLinksEditModal: React.FC<SocailContactModal> = ({
//   isModalOpenEdit,
//   setIsModalOpenEdit,
// }) => {
//   const { register, handleSubmit, reset, formState } = useForm<FormData>({
//     defaultValues: {
//       title: "LinkedIn",
//       linkedin: "linkedin.com/in/ux.saifur.info",
//     },
//   });

//   const onSubmit: SubmitHandler<FormData> = (data) => {
//     console.log(data);
//     setIsModalOpenEdit(false); // Close modal after submission
//     reset(data); // Update default values with submitted data
//   };

//   const handleEdit = () => {
//     setIsModalOpenEdit(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpenEdit(false);
//     reset();
//   };

//   const { defaultValues } = formState;

//   return (
//     <div className="">
//       {isModalOpenEdit && (
//         <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4">Edit LinkedIn</h2>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <div>
//                 <label className="block text-gray-700">Title</label>
//                 <input
//                   {...register("title")}
//                   className="w-full border-b border-gray-300 focus:outline-none"
//                   placeholder="Title"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700">LinkedIn URL</label>
//                 <input
//                   {...register("linkedin")}
//                   className="w-full border-b border-gray-300 focus:outline-none"
//                   placeholder="Enter LinkedIn URL"
//                 />
//               </div>
//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   onClick={handleCancel}
//                   className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-primary text-white rounded hover:bg-green-600"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SocialLinksEditModal;
