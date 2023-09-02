import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Response } from "@/types/reponse";


export const guidesApi = createApi({
  reducerPath: "guidesApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/guides`,
  }),
  endpoints: (builder) => ({
    getGuides: builder.query<any[], null>({
      query: () => "",
      transformResponse: (response:Response) => response.data

    }),

  }),
});

export const { useGetGuidesQuery } = guidesApi;