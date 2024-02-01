import { User } from '@/types/UserTypes';
import { ErrorResponse, Response } from '@/types/ApiResponseTypes';
import {CheckEmail} from '@/types/UserTypes';
import { apiSlice } from './apiSlice';
import { updateUser, addUser } from '../auth/userSlice';
import { get } from 'lodash';



export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
    postCheckEmail: builder.mutation<CheckEmail, string>({
      query: (email) => ({
        url: '/check-email',
        method: 'POST',
        body: { email },
      }),
      transformErrorResponse(baseQueryReturnValue) {
				return baseQueryReturnValue;
			},
			transformResponse: (res: Response) => {
				return res.status === 'Success' ? res.data : res.status;
			},
    }),
    postRegisterUser: builder.mutation<User, any>({
      query: (user) => ({
        url: '/register',
        method: 'POST',
        body: user,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
			transformResponse: (res: Response) => {
				return res.status === 'Success' ? res.data : res.status;
			},
    }),
    getVerifyUser: builder.query<User, string>({
      query: (token) => ({
        url: `/verify-user`,
        params: { token: token },
        method: 'GET',
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
    }),
    postRequestPasswordReset: builder.mutation<any, {email: string}>({
      query: (email) => ({
        url: '/request-password-reset',
        method: 'POST',
        body: email,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
			transformResponse: (res: Response) => {
				return res.status === 'Success' ? res.data : res.status;
			},
    }),
    postResetPassword: builder.mutation<any, {token: string, password:string}>({
      query: (body) => ({
        url: '/reset-password',
        method: 'POST',
        body: body,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
			transformResponse: (res: Response) => {
				return res.status === 'Success' ? res.data : res.status;
			},
    }),

    postValidateToken: builder.mutation<any, {token: string}>({
      query: (body) => ({
        url: '/validate-reset-token',
        method: 'POST',
        body: body,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
			transformResponse: (res: Response) => {
				return res.status === 'Success' ? res.data : res.status;
			},
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: `/user-info`,
        method: 'GET',
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
    }),
    putUpdateUserInfo: builder.mutation({
      query: (body) => ({
        url: '/update-user-info',
        method: 'PUT',
        body: body,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
			transformResponse: (res: Response) => {
				return res.status === 'Success' ? res.data : res.status;
			},
    }),
    postSendResetPassword: builder.mutation({
      query: () => ({
        url: '/send-reset-password',
        method: 'POST',
        
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
			transformResponse: (res: Response) => {
				return res.status === 'Success' ? res.data : res.status;
			},
    }),
	}),
	overrideExisting: true
});

