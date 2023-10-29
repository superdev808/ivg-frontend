import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Response } from "@/types/reponse";


export const workflowNodesApi = createApi({
  reducerPath: "workflowNodesApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/workflows/nodes`,
  }),
  endpoints: (builder) => ({
    getWorkflowNodes: builder.query<any[], null>({
      query: () => "",
      transformResponse: (response:Response) => response.data

    }),

  }),
});

export const { useGetWorkflowNodesQuery } = workflowNodesApi;