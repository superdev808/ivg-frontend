import { publicApiSlice } from '../slices/api/publicApiSlice';
import { userApiSlice } from '../slices/api/userApiSlice';

export const {
	usePostCheckEmailMutation,
	usePostRegisterUserMutation,
	useGetVerifyUserQuery,
	usePostRequestPasswordResetMutation,
	usePostValidateTokenMutation,
	usePostResetPasswordMutation,
	useGetUserInfoQuery,
	useGetUserInfoAdditionalQuery,
	usePutUpdateUserInfoMutation,
	usePostSendResetPasswordMutation,
	usePostUploadLogoMutation,
} = userApiSlice;

export const { usePostSubmitContactFormMutation } = publicApiSlice;
