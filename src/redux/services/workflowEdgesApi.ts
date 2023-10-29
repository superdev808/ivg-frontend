import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Response } from "@/types/reponse";


export const workflowEdgesApi = createApi({
  reducerPath: "workflowEdgesApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/workflows/edges`,
  }),
  endpoints: (builder) => ({
    getWorkflowEdges: builder.query<any[], null>({
      query: () => "",
      transformResponse: (response:Response) => response.data

    }),

  }),
});

export const { useGetWorkflowEdgesQuery } = workflowEdgesApi;