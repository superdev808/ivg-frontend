import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Response } from "@/types/reponse";


export const workflowMenuItemsApi = createApi({
  reducerPath: "workflowMenuItemsApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/workflows/menuitems`,
  }),
  endpoints: (builder) => ({
    getWorkflowMenuItems: builder.query<any[], null>({
      query: () => "",
      transformResponse: (response:Response) => response.data

    }),

  }),
});

export const { useGetWorkflowMenuItemsQuery } = workflowMenuItemsApi;