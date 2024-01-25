import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Response } from "@/types/reponse";


export const workflowMenuQuestionsApi = createApi({
  reducerPath: "workflowMenuQuestionsApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/workflows/menuquestions`,
  }),
  endpoints: (builder) => ({
    getWorkflowMenuQuestions: builder.query<any[], null>({
      query: () => "",
      transformResponse: (response:Response) => response.data

    }),

  }),
});

export const { useGetWorkflowMenuQuestionsQuery } = workflowMenuQuestionsApi;