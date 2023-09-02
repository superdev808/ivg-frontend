import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Response } from "@/types/reponse";


export const usersApi = createApi({
  reducerPath: "usersApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/users`,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<any[], null>({
      query: () => "",
      transformResponse: (response:Response) => response.data

    }),

  }),
});

export const { useGetUsersQuery } = usersApi;