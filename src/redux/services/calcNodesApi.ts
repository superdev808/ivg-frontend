import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Response } from "@/types/reponse";


export const calcNodesApi = createApi({
  reducerPath: "calcNodesApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/calculators/nodes`,
  }),
  endpoints: (builder) => ({
    getCalcNodes: builder.query<any[], null>({
      query: () => "",
      transformResponse: (response:Response) => response.data

    }),

  }),
});

export const { useGetCalcNodesQuery } = calcNodesApi;