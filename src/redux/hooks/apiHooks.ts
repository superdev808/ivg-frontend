import { use } from 'react';
import { userApiSlice } from '../slices/api/userApiSlice';

// RTK Query Hooks

export const {
  usePostCheckEmailMutation,
  usePostRegisterUserMutation,
  useGetVerifyUserQuery,
  usePostRequestPasswordResetMutation,
  usePostValidateTokenMutation,
  usePostResetPasswordMutation,
  useGetUserInfoQuery,
  usePutUpdateUserInfoMutation,
  usePutUpdateUserMutation,
  usePostSendResetPasswordMutation,
  usePostUploadLogoMutation,
  useGetUsersListQuery,
  usePostSendVerificationEmailMutation,
  usePostDeactivateUserMutation,
  usePostVerifyTokenMutation,
  usePostActivateUserMutation
} = userApiSlice;
