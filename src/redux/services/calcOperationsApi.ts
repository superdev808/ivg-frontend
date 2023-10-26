import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Response } from "@/types/reponse";

export const calcOperationsApi = createApi({
  reducerPath: "calcOperationsApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/calculators/operations`,
  }),
  endpoints: (builder) => ({
    getCalcOperations: builder.query<any, string>({
      query: (id) => `/${id}`,
      transformResponse: (response:Response) => response.data
    }),

  }),
});

export const { useGetCalcOperationsQuery } = calcOperationsApi;
