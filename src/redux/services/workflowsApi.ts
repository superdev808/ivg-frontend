import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Response } from "@/types/reponse";


export const workflowsApi = createApi({
  reducerPath: "workflowsApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/workflows`,
  }),
  endpoints: (builder) => ({
    getWorkflows: builder.query<any[], null>({
      query: () => "",
      transformResponse: (response:Response) => response.data

    }),

  }),
});

export const { useGetWorkflowsQuery } = workflowsApi;