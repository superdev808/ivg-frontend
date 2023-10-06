import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Response } from "@/types/reponse";


export const calcEdgesApi = createApi({
  reducerPath: "calcEdgesApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/calculators/edges`,
  }),
  endpoints: (builder) => ({
    getCalcEdges: builder.query<any[], null>({
      query: () => "",
      transformResponse: (response:Response) => response.data

    }),

  }),
});

export const { useGetCalcEdgesQuery } = calcEdgesApi;