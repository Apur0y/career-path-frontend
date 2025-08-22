import { CreateJobRequest, Job, JobResponse, JobsListResponse, UpdateJobRequest } from "../../../types/AllTypes";
import { baseUrlApi } from "../../api/baseUrlApi";


export interface JobFilterType {
    companyName?: string[];
    title?: string[];
    educations?: string[];
    experience?: string;
    locations?: string[];
    salaryRange?: string[];
    jobType?: string[];
    searchTerm?: string[];
}

const jobApi = baseUrlApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllJobPosts: builder.query({
            query: (filters: JobFilterType & { page?: number; limit?: number }) => {
                const params = new URLSearchParams();

                // Handling jobType array and joining with commas
                if (filters.jobType?.length) {
                    params.append('jobType', filters.jobType.join(','));  // Join job types with commas
                }

                // Handling title array and joining with commas
                if (filters.title?.length) {
                    params.append('title', filters.title.join(','));  // Join titles with commas
                }

                // Handling location array and joining with commas
                if (filters.locations?.length) {
                    params.append('location', filters.locations.join(','));  // Join locations with commas
                }

                // Handling other fields (if applicable)
                if (filters.educations?.length) {
                    params.append('educations', filters.educations.join(','));  // Join educations with commas
                }

                if (filters.experience) {
                    // If experience is a range (e.g., "0 to 4 years")
                    if (filters.experience.includes("to")) {
                        params.append('experience', filters.experience); // Directly append the range like "0 to 4 years"
                    } else {
                        // Otherwise, handle as a single experience value (e.g., "8 years")
                        params.append('experience', filters.experience.toString());
                    }
                }


                if (filters.salaryRange?.length) {
                    params.append('salaryRange', filters.salaryRange.join(','));  // Join salary range values with commas
                }

                if (filters.companyName?.length) {
                    params.append('companyName', filters.companyName.join(','));  // Join company names with commas
                }
                if (filters.searchTerm?.length) {
                    params.append('searchTerm', filters.searchTerm.join(','));  // Join company names with commas
                }

                // Pagination fields (single value)
                if (filters.page) params.append('page', filters.page.toString());
                if (filters.limit) params.append('limit', filters.limit.toString());

                // Return the final URL with query parameters
                return {
                    url: `/jobs/posts?${params.toString()}`,  // Automatically constructs the query string
                    method: "GET",
                };
            },
            providesTags: ['appliedJobs']
        }),

        getMyJobPosts: builder.query({
            query: () => "/jobs/my-job-posts",
            providesTags: ['appliedJobs']
        }),

        getAppliedJobs: builder.query({
            query: () => '/apply/apply-job',
            providesTags: ['appliedJobs'],
        }),
        getInterviews: builder.query({
            query: () => '/interviews/my'
        }),

        recomandationJobs: builder.query({
            query: (profileId) => `/jobs/recommended-jobs/${profileId}`
        }),

        applyJob: builder.mutation({
            query: (jobId) => ({
                url: `/apply/apply-job`,
                method: "POST",
                body: jobId
            }),
            invalidatesTags: ['appliedJobs']
        }),

        createJobPost: builder.mutation({
            query: (data) => ({
                url: "/jobs/create-job-post",
                method: "POST",
                body: data,
            }),

        }),

        deleteJobPost: builder.mutation({
            query: (id) => ({
                url: `/jobs/${id}`,
                method: "DELETE",
            }),

        }),

        updateJobPost: builder.mutation({
            query: ({ id, data }) => ({
                url: `/jobs/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['appliedJobs']

        }),
        saveJobPost: builder.mutation({
            query: (data) => ({
                url: `/save-jobs/save`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["SaveJob"]

        }),
        getSavedJobs: builder.query({
            query: () => '/save-jobs', // This is the correct syntax
            providesTags: ['SaveJob', 'appliedJobs'],
        }),
        deleteSavedPost: builder.mutation({
            query: (id) => ({
                url: `/save-jobs/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["SaveJob"]
        }),

    }),
});


export const {
    useCreateJobPostMutation,
    useGetMyJobPostsQuery,
    useGetAllJobPostsQuery,
    useLazyGetAllJobPostsQuery,
    useDeleteJobPostMutation,
    useUpdateJobPostMutation,
    useApplyJobMutation,
    useGetAppliedJobsQuery,
    useRecomandationJobsQuery,
    useSaveJobPostMutation,
    useDeleteSavedPostMutation,
    useGetSavedJobsQuery,
    useGetInterviewsQuery
} = jobApi;

