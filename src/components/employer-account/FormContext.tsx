'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

type FormData = {
  // Page 1 data
  page1Data: {
    email: string;
    phoneNumber: string;
    website: string;
    logo: File | null;
  };
  // Page 2 data (add your page 2 fields here)
  page2Data: {
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
};

type FormContextType = {
  formData: FormData;
  updatePage1Data: (data: Partial<FormData['page1Data']>) => void;
  updatePage2Data: (data: Partial<FormData['page2Data']>) => void;
  resetForm: () => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    page1Data: {
      email: "",
      phoneNumber: "",
      website: "",
      logo: null
    },
    page2Data: {
      companyName: "",
        industryType: "",
        roleInCompany: "",
        description: "",
        country: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
    }
  });

  const updatePage1Data = (data: Partial<FormData['page1Data']>) => {
    setFormData(prev => ({
      ...prev,
      page1Data: { ...prev.page1Data, ...data }
    }));
  };

  const updatePage2Data = (data: Partial<FormData['page2Data']>) => {
    setFormData(prev => ({
      ...prev,
      page2Data: { ...prev.page2Data, ...data }
    }));
  };

  const resetForm = () => {
    setFormData({
      page1Data: {
        email: "",
        phoneNumber: "",
        website: "https://www.google.com/",
        logo: null
      },
      page2Data: {
         companyName: "",
        industryType: "",
        roleInCompany: "",
        description: "",
        country: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
      }
    });
  };

  return (
    <FormContext.Provider value={{ formData, updatePage1Data, updatePage2Data, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};