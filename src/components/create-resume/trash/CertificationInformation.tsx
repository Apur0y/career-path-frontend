import Button from "@/components/shared/button/Button";
import FormInput from "@/components/ui/FormInput";
import { useFieldArray, useForm } from "react-hook-form";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IPersonal } from "../personalInfo";

// ✅ Corrected type
type WorkForm = {
  certificates: {
    certificateTitle: string;
    issuingOrganization: string;
    certificateIssuedDate: string;
    certificateExpiryDate: string;
  }[];
};

export default function CertificationInformation({ setStep, formData, setFormData, setCertificate, certificate }: IPersonal) {
  const { control, register, handleSubmit, getValues } = useForm<WorkForm>({
    defaultValues: {
      certificates: [
        {
          certificateTitle: formData.certificateTitle || "",
          issuingOrganization: formData.issuingOrganization || "",
          certificateIssuedDate: formData.certificateIssuedDate || "",
          certificateExpiryDate:  formData.certificateExpiryDate ||"",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certificates",
  });

  // Handle switching between sections
  const handleSwitch = (data: WorkForm) => {
    // Capture the current form data when switching between sections
    setFormData({
      ...formData,
      certificates: data.certificates ? data.certificates: [], // Preserve the certificate data
    });
    setCertificate(!certificate); // Toggle between Education and Certification sections
  };

  const handleBack = (): void => {
    setStep(3);
    console.log("Back");
  };

  // On form submission, update the form data
  const onSubmit = (data: WorkForm) => {
    console.log("Certification Data Submitted:", data);

    // Update the formData with the current certificate data and any other existing data
    setFormData({
      ...formData,
      certificates: data.certificates, // Add certification data to formData
    });

    setStep(5); // Move to the next step
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-center">
        <div className="w-full max-w-[1180px] h-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            {fields?.map((field, index) => (
              <div key={field.id} className="mb-8">
                {/* Certification Title */}
                <div className="mb-4">
                  <FormInput
                    label="Certification Title"
                    type="text"
                    placeholder="e.g., AWS Certified Developer"
                    {...register(`certificates.${index}.certificateTitle`)}
                  />
                </div>

                {/* Issuing Organization */}
                <div className="mb-4 w-1/2">
                  <FormInput
                    label="Issuing Organization"
                    type="text"
                    placeholder="e.g., Amazon Web Services"
                    {...register(`certificates.${index}.issuingOrganization`)}
                  />
                </div>

                {/* Issue Date and Expiry Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormInput
                    label="Issue Date"
                    type="date"
                    {...register(`certificates.${index}.certificateIssuedDate`)}
                  />
                  <FormInput
                    label="Expiry Date"
                    type="date"
                    {...register(`certificates.${index}.certificateExpiryDate`)}
                  />
                </div>

                {/* Remove Certification Button */}
                <div className="flex justify-end">
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 text-sm flex items-center"
                    >
                      <IoIosRemoveCircleOutline className="mr-1" /> Remove Certification
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Add Another Certification Button */}
            <div className="mb-12">
              <button
                type="button"
                onClick={() =>
                  append({
                    certificateTitle: "",
                    issuingOrganization: "",
                    certificateIssuedDate: "",
                    certificateExpiryDate: "",
                  })
                }
                className="text-[#28C76F] font-medium flex items-center"
              >
                <span className="mr-2">+</span> Add Another Certification
              </button>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => handleBack()}
                className="px-4 py-2 rounded-md bg-secondary text-white cursor-pointer hover:bg-black"
              >
                Back
              </button>
              <Button
                type="submit"
                text="Next"
                icon="arrow-right"
                action="submit"
                bgColor="#28C76F"
                name="Next"
                className="px-4 py-2 rounded-md"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Switch between sections button */}
      <button
        onClick={() => handleSwitch(getValues())} // Call handleSwitch with the current form data
        type="button"
        className="bg-secondary absolute top-0 right-0 rounded-lg px-3 py-2 md:px-6 md:py-3 text-white"
      >
        {certificate ? "Certifications" : "Education"}
      </button>
    </div>
  );
}
