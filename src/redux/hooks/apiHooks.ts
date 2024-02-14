import { publicApiSlice } from "../slices/api/publicApiSlice";
import { userApiSlice } from "../slices/api/userApiSlice";

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
  usePostActivateUserMutation,
  useSaveResultMutation,
  useDeleteSavedResultMutation,
} = userApiSlice;

export const { usePostSubmitContactFormMutation } = publicApiSlice;
