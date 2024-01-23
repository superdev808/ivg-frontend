import { getCookie } from '@/helpers/cookie';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { RootState } from 'src/store/store';

const baseUrl = process.env.NEXT_PUBLIC_APP_SERVER_URL || '';

const baseQuery = fetchBaseQuery({
	baseUrl,

	prepareHeaders: (headers, { getState }) => {
		const token = getCookie('appToken');

		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		}

		return headers;
	},

	credentials: 'include',
});

const tags = ['USER'];

export const apiSlice = createApi({
	baseQuery,
	tagTypes: tags,
	endpoints: (builder) => ({}),
});
