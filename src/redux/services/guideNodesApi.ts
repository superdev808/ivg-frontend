import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Response } from "@/types/reponse";


export const guideNodesApi = createApi({
  reducerPath: "guideNodesApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/guides/nodes`,
  }),
  endpoints: (builder) => ({
    getGuideNodes: builder.query<any[], null>({
      query: () => "",
      transformResponse: (response:Response) => response.data

    }),

  }),
});

export const { useGetGuideNodesQuery } = guideNodesApi;