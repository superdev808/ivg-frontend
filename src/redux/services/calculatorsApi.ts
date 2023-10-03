import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Response } from "@/types/reponse";


export const calculatorsApi = createApi({
  reducerPath: "calculatorsApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/calculators`,
  }),
  endpoints: (builder) => ({
    getCalculators: builder.query<any[], null>({
      query: () => "",
      transformResponse: (response:Response) => response.data
    }),

  }),
});

export const { useGetCalculatorsQuery } = calculatorsApi;