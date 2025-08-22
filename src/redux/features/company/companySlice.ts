import {
  Company,
  CompanyListResponse,
  CompanyResponse,
  CreateCompanyRequest,
  UpdateCompanyRequest,
} from "../../../types/AllTypes";
import { baseUrlApi } from "../../api/baseUrlApi";

const companyApi = baseUrlApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompanies: builder.query<CompanyListResponse, void>({
      query: () => "/companies",
    }),
    getMyCompany: builder.query({
      query: () => "/companies/my-company",
    }),

    getCompanyById: builder.query<CompanyResponse, string>({
      query: (id) => `/companies/${id}`,
    }),

    createCompany: builder.mutation({
      query: (data) => ({
        url: "/companies/create",
        method: "POST",
        body: data,
      }),
    }),

    updateCompany: builder.mutation({
        query: ({data }) => ({
          url: `/companies/update`,
          method: "PATCH",
          body: data,
        }),
      }),

    deleteCompany: builder.mutation<CompanyResponse, string>({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useGetCompanyByIdQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useGetMyCompanyQuery
} = companyApi;
