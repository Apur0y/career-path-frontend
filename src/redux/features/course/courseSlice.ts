import { baseUrlApi } from "@/redux/api/baseUrlApi";

const jobStatsApi = baseUrlApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecommandedCourse: builder.query({
      query: () => "/courses/recommendations",
    }),
  }),
});

// ✅ Export hooks

export const {
useGetRecommandedCourseQuery
} = jobStatsApi;