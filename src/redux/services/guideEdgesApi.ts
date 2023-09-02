import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Response } from "@/types/reponse";


export const guideEdgesApi = createApi({
  reducerPath: "guideEdgesApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/guides/edges`,
  }),
  endpoints: (builder) => ({
    getGuideEdges: builder.query<any[], null>({
      query: () => "",
      transformResponse: (response:Response) => response.data

    }),

  }),
});

export const { useGetGuideEdgesQuery } = guideEdgesApi;