export interface CreateJobRequest {
  title: string;
  experience: string;
  deadline: string;
  location: string;
  salaryType: string;
  salaryRange: string;
  skills: string[];
  features: {
    featureTitle: string;
    paragraph?: string;
    point?: string[];
  }[];
  userId: string;
  companyId: string;
  type: string;
  status?: string;
}

export interface JobResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Job;
}

export interface JobsListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    data: Job[];
  };
}

export interface Job {
  id: string;
  jobId: string;
  title: string;
  experience: string;
  deadline: string;
  location: string;
  salaryType: string;
  salaryRange: string;
  noOfApplicants: number;
  skills: string[];
  features: {
    featureTitle: string;
    paragraph?: string;
    point?: string[];
  }[];
  userId: string;
  companyId: string;
  jobType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    profilePic: string;
    role: string;
    isVerified?: boolean;
  };
  company?: {
    companyName: string;
    logo: string;
    industryType: string;
    email: string;
    phoneNumber: string;
  };
}

export type UpdateJobRequest = Partial<CreateJobRequest>;

//Companies Types
export interface Company {
  id: string;
  companyName: string;
  industryType: string;
  roleInCompany: string;
  description: string;
  logo: string; // URL to logo image
  country: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  website: string;
  userId: string; // MongoDB ObjectId (reference to user)
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

export interface CompanyListResponse {
  success: boolean;
  message: string;
  data: Company[];
}

export interface CompanyResponse {
  success: boolean;
  message: string;
  data: Company;
}

export interface CreateCompanyRequest {
  companyName: string;
  logo: string;
  industryType: string;
  email: string;
  phoneNumber: string;
}

export interface UpdateCompanyRequest extends Partial<CreateCompanyRequest> {}

export type FormData = {
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

export interface ProfileData {
  // Personal Info
  phoneNumber: string;
  countryRegion: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  linkedInProfileUrl: string;
  personalWebsiteUrl: string;
  otherSocialMedia: string;
  otherSocialMediaUrl: string;

  // Experience
  recentJobTitle: string;
  jobExplanation: string;
  jobTitle: string;
  CompanyName: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  jobDescription: string;

  // Skills
  skills: string[];

  // Education
  degree: string;
  institutionName: string;
  major: string;
  graduationStartDate: string;
  graduationEndDate: string;

  // Certificate
  certificateTitle: string;
  issuingOrganization: string;
  certificateIssuedDate: string;
  certificateExpiryDate: string;

  // Files
  achievementFiles: File;
  graduationCertificateFiles: File;
}

// export interface ResumeState {
//   personalInfo: Partial<ResumeFormData>; // store personal info separately
//   experience: Array<Partial<ResumeFormData>>;
//   education: Array<Partial<ResumeFormData>>;
//   certifications: Array<Partial<ResumeFormData>>;
//   skills: string[];
//   projects: any[]; // adjust this if needed
//   graduationCertificateFiles: File | null;
//   achievementFiles: File | null;
//   currentStep: number;
//   isSubmitting: boolean;
//   submitError: string | null;
// }

// types.ts (or anywhere you store types in your project)
export interface Course {
  id: number;
  title: string;
  instructor: string;
  description: string;
  image: string;
  image_url?: string;
  rating: number;
  num_reviews: number;
  num_lectures: number;
  url?: string;
  price_detail: {
    price_string: string;
    amount: number;
    currency: string;
  };
  is_paid: boolean;
  visible_instructors: {
    url: string;
    name: string;
  }[];
}
