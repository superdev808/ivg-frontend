import { Response } from '@/types/ApiResponseTypes';

import { apiSlice } from './apiSlice';
import { ContactForm } from '@/types/PublicTypes';

export const publicApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		postSubmitContactForm: builder.mutation<Response, ContactForm>({
			query: (body) => ({
				url: '/submit-contact-form',
				method: 'POST',
				body,
			}),
			transformErrorResponse(baseQueryReturnValue) {
				return baseQueryReturnValue;
			},
		}),
	}),
	overrideExisting: true,
});
