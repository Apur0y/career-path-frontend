import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const EductionEditModal = ({
  isModalOpenEdit,
  setIsModalOpenEdit,
  education,
  certification,
  onEducationUpdate,
  onCertificationUpdate,
  onClose
}: any) => {

  if (education) {
    console.log("Education: ", education);
  }

  if (certification) {
    console.log("Certification: ", certification);
  }


  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      degree: education?.degree || "",
      institution_name: education?.institution_name || "",
      major: education?.major || "",
      issuing_organization: certification?.issuing_organization || "",
      certification_name: certification?.certification_name || ""
    }
  });

  // Reset form with selectedExperience data when modal is opened
  useEffect(() => {
    if (education) {
      reset({
        degree: education?.degree || "",
        institution_name: education?.institution_name || "",
        major: education?.major || "",
      });
    }

    if (certification) {
      reset({
        certification_name: certification?.certification_name || "",
        issuing_organization: certification?.issuing_organization || "",
      })
    }
  }, [isModalOpenEdit, education, certification, reset]);

  const onSubmit = (data: any) => {
    if (education) {
      onEducationUpdate(data);
    } else if (certification) {
      onCertificationUpdate(data);
    }
    setIsModalOpenEdit(false);
    onClose();
  };

  const handleCancel = () => {
    setIsModalOpenEdit(false);
    onClose();
    reset();
  };

  return (
    <div>
      {isModalOpenEdit && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4">
              {education ? "Edit Education" : "Edit Certification"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {education ? (
                <>
                  <div>
                    <label className="block text-gray-700">Degree</label>
                    <input
                      {...register("degree")}
                      className="w-full border-b border-gray-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Institution</label>
                    <input
                      {...register("institution_name")}
                      className="w-full border-b border-gray-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Major</label>
                    <input
                      {...register("major")}
                      className="w-full border-b border-gray-300 focus:outline-none"
                    />
                  </div>
                </>
              ) : (
                // ""
                <>
                  <div>
                    <label className="block text-gray-700">Certification Name</label>
                    <input
                      {...register("certification_name")}
                      className="w-full border-b border-gray-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Issuing Organization</label>
                    <input
                      {...register("issuing_organization")}
                      className="w-full border-b border-gray-300 focus:outline-none"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400  cursor-pointer "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-green-600  cursor-pointer "
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

