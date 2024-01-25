import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { RootState } from 'src/store/store';

const baseUrl = 'http://localhost:8000/v1';

const baseQuery = fetchBaseQuery({
	baseUrl,

	// credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		// const token = (getState() as RootState).auth.token;
		// if (token) {
		// 	headers.set('Authorization', `Bearer ${token}`);
		// }

		return headers;
	},

	credentials: 'include',
});

const tags = [
    'USER'

]

export const apiSlice = createApi({
	baseQuery,
	tagTypes: tags,
	endpoints: (builder) => ({}),
});



