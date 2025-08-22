'use client';
import { useCreateCompanyMutation } from '@/redux/features/company/companySlice';
import { Company } from '@/types/AllTypes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useFormContext } from './FormContext';
import { ArrowRight } from 'lucide-react';

type FormData = {
    companyName: string;
    industryType: string;
    roleInCompany: string;
    description: string;
    country: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
};

type FormErrors = {
    [K in keyof FormData]?: string;
};

const roleOptions = [
    { label: "Owner", value: "owner" },
    { label: "Developer", value: "developer" },
    { label: "Designer", value: "designer" },
    { label: "Manager", value: "manager" },
    { label: "Marketer", value: "marketer" },
    { label: "Other", value: "other" },
];

const regionOptions = [
    { label: "Bangladesh", value: "bangladesh" },
    { label: "India", value: "india" },
    { label: "United States", value: "usa" },
    { label: "United Kingdom", value: "uk" },
    { label: "Canada", value: "canada" },
    { label: "Australia", value: "australia" },
];

function AboutCompany() {
    const [company] = useCreateCompanyMutation();
    const navigate = useRouter();
    const { formData: data, updatePage2Data } = useFormContext();
    const [formData, setFormData] = useState<FormData>({
        companyName: "",
        industryType: "",
        roleInCompany: "",
        description: "",
        country: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};

        Object.keys(formData).forEach((key) => {
            if (!formData[key as keyof FormData]) {
                newErrors[key as keyof FormData] = "This field is required";
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // If no errors, return true
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            updatePage2Data(formData);
            // try {
            //     const res = await company(formData);
            //     if (res && 'data' in res && res.data?.success) {
            navigate.push("/logo-contact");
            //     }
            // } catch (error) {
            //     console.log(error);
            // }
        }
    };

    return (
        <div className="max-w-[1180px] mx-auto p-6 bg-white">
            <div className="space-y-6">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                        Tell Us About Your Company
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        This is your company's opportunity to shine - provide some basic details to help potential candidates understand your business better.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Company Name */}
                    <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name
                        </label>
                        <input
                            id="companyName"
                            name="companyName"
                            type="text"
                            placeholder="SM Technology"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
                            required
                        />
                        {errors.companyName && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.companyName}</span>
                        )}
                    </div>

                    <div className="md:flex items-start gap-6 space-y-6 md:space-y-0">
                        {/* Industry Type */}
                        <div className="w-full md:w-1/2">
                            <label htmlFor="industryType" className="block text-sm font-medium text-gray-700 mb-1">
                                Industry Type
                            </label>
                            <input
                                id="industryType"
                                name="industryType"
                                type="text"
                                placeholder="Tech, Marketing, Finance, etc."
                                value={formData.industryType}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            {errors.industryType && (
                                <span className="text-red-500 text-sm mt-1 block">{errors.industryType}</span>
                            )}
                        </div>

                        {/* Role */}
                        <div className="w-full md:w-1/2">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                What is your role in the company?
                            </label>
                            <select
                                id="role"
                                name="roleInCompany"
                                value={formData.roleInCompany}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Select your role</option>
                                {roleOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {errors.roleInCompany && (
                                <span className="text-red-500 text-sm mt-1 block">{errors.roleInCompany}</span>
                            )}
                        </div>
                    </div>

                    {/* Company Description */}
                    <div>
                        <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700 mb-1">
                            Company Description
                        </label>
                        <textarea
                            id="companyDescription"
                            name="description"
                            rows={5}
                            placeholder="Tell us about your company..."
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors.description && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.description}</span>
                        )}
                    </div>

                    {/* Country/Region */}
                    <div className="w-full md:w-[30%]">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                            Company Country/Region
                        </label>
                        <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Select country</option>
                            {regionOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {errors.country && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.country}</span>
                        )}
                    </div>

                    {/* Company Address */}
                    <div className="w-full md:w-[70%]">
                        <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700 mb-1">
                            Company Address
                        </label>
                        <input
                            id="companyAddress"
                            name="address"
                            type="text"
                            placeholder="Road-06, Berlin"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors.address && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.address}</span>
                        )}
                    </div>

                    {/* City, State, Zip Code */}
                    <div className="flex flex-col md:flex-row gap-4 space-y-6 md:space-y-0">
                        <div className="w-full md:w-1/3">
                            <label htmlFor="cityName" className="block text-sm font-medium text-gray-700 mb-1">
                                City
                            </label>
                            <input
                                id="cityName"
                                name="city"
                                type="text"
                                placeholder="Berlin"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            {errors.city && (
                                <span className="text-red-500 text-sm mt-1 block">{errors.city}</span>
                            )}
                        </div>

                        <div className="w-full md:w-1/3">
                            <label htmlFor="stateName" className="block text-sm font-medium text-gray-700 mb-1">
                                State
                            </label>
                            <input
                                id="stateName"
                                name="state"
                                type="text"
                                placeholder="Berlin"
                                value={formData.state}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            {errors.state && (
                                <span className="text-red-500 text-sm mt-1 block">{errors.state}</span>
                            )}
                        </div>

                        <div className="w-full md:w-1/3">
                            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                                ZIP Code
                            </label>
                            <input
                                id="zipCode"
                                name="zipCode"
                                type="text"
                                placeholder="1216"
                                value={formData.zipCode}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            {errors.zipCode && (
                                <span className="text-red-500 text-sm mt-1 block">{errors.zipCode}</span>
                            )}
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full bg-primary hover:bg-green-600 text-white font-medium py-4 cursor-pointer px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 group"
                        >
                            <span>Next</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutCompany;
