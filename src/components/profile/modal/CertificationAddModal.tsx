import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
    certification_name?: string;
    issuing_organization?: string;
}

interface CertificationAddModal {
    isCertificationAddModalOpen: boolean;
    setIsCertificationAddModalOpen: any;
    onAddCertification: (certification: any) => void;
}

const CertificationAddModal: React.FC<CertificationAddModal> = ({
    isCertificationAddModalOpen,
    setIsCertificationAddModalOpen,
    onAddCertification,
}) => {
    const { register, handleSubmit, reset, formState } = useForm<FormData>({
        defaultValues: {
            certification_name: "",
            issuing_organization: "",
        },
    });

    // Reset form with selectedExperience data when modal is opened
    useEffect(() => {
        reset({
            certification_name: "",
            issuing_organization: "",
        });
    }, [isCertificationAddModalOpen, reset]);



    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log("Certification Name: ", data);

        const newCertification = {
            certification_name: data.certification_name,
            issuing_organization: data.issuing_organization,
            issue_date: null,
            expiry_date: null
        };

        onAddCertification(newCertification);

        setIsCertificationAddModalOpen(false); // Close modal after submission
        reset(data); // Update default values with submitted data
    };

    const handleEdit = () => {
        setIsCertificationAddModalOpen(true);
    };

    const handleCancel = () => {
        setIsCertificationAddModalOpen(false);
        reset();
    };

    const { defaultValues } = formState;

    return (
        <div className="">
            {isCertificationAddModalOpen && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
                        <h2 className="text-xl font-bold mb-4">Add Certification</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-semibold">
                                    Certification Name
                                </label>
                                <input
                                    {...register("certification_name")}
                                    className="w-full border-b border-gray-300 focus:outline-none"
                                    placeholder="enter degree name..."
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold">
                                    Institution Name
                                </label>
                                <input
                                    {...register("issuing_organization")}
                                    className="w-full border-b border-gray-300 focus:outline-none"
                                    placeholder="enter institution name...."
                                />
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white rounded hover:bg-green-600 cursor-pointer"
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

export default CertificationAddModal;
