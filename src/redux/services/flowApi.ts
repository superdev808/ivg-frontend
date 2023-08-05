import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import  Flow  from "@/types/flow";
import Response from "@/types/response";


export const flowApi = createApi({
  reducerPath: "flowApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/flows`,
  }),
  endpoints: (builder) => ({
    getFlows: builder.query<Flow[], null>({
      query: () => "",
      transformResponse: (response:Response) => response.data

    }),

  }),
});

export const { useGetFlowsQuery } = flowApi;