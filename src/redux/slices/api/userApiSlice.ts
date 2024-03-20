import { User } from "@/types/UserTypes";
import { Response } from "@/types/ApiResponseTypes";
import { CheckEmail } from "@/types/UserTypes";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postCheckEmail: builder.mutation<CheckEmail, string>({
      query: (email) => ({
        url: "/check-email",
        method: "POST",
        body: { email },
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformResponse: (res: Response) => {
        return res.status === "Success" ? res.data : res.status;
      },
    }),
    postRegisterUser: builder.mutation<User, any>({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformResponse: (res: Response) => {
        return res.status === "Success" ? res.data : res.status;
      },
    }),
    getVerifyUser: builder.query<User, string>({
      query: (token) => ({
        url: `/verify-user`,
        params: { token: token },
        method: "GET",
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
    }),
    postRequestPasswordReset: builder.mutation<any, { email: string }>({
      query: (email) => ({
        url: "/request-password-reset",
        method: "POST",
        body: email,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformResponse: (res: Response) => {
        return res.status === "Success" ? res.data : res.status;
      },
    }),
    postResetPassword: builder.mutation<
      any,
      { token: string; password: string }
    >({
      query: (body) => ({
        url: "/reset-password",
        method: "POST",
        body: body,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformResponse: (res: Response) => {
        return res.status === "Success" ? res.data : res.status;
      },
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: `/user-info`,
        method: "GET",
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
    }),
    putUpdateUserInfo: builder.mutation({
      query: (body) => ({
        url: "/update-user-info",
        method: "PUT",
        body: body,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformResponse: (res: Response) => {
        return res.status === "Success" ? res.data : res.status;
      },
    }),
    postSendResetPassword: builder.mutation({
      query: () => ({
        url: "/send-reset-password",
        method: "POST",
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformResponse: (res: Response) => {
        return res.status === "Success" ? res.data : res.status;
      },
    }),
    postUploadLogo: builder.mutation({
      query: (imageData) => ({
        url: "/upload-logo",
        method: "POST",
        body: imageData,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformResponse: (res: Response) => {
        return res.status === "Success" ? res.data : res.status;
      },
    }),
    saveResult: builder.mutation({
      query: (resultData) => ({
        url: "/saveResult",
        method: "POST",
        body: resultData,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformResponse: (res: Response) => {
        return res.status === "Success" ? res.data : res.status;
      },
    }),
    updateSavedResult: builder.mutation({
      query: ({ id, data }) => ({
        url: `/savedResult/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformResponse: (res: Response) => {
        return res.status === "Success" ? res.data : res.status;
      },
    }),
    deleteSavedResult: builder.mutation({
      query: (resultId) => ({
        url: `/savedResult/${resultId}`,
        method: "DELETE",
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformResponse: (res: Response) => {
        return res.status === "Success" ? res.data : res.status;
      },
    }),
    postVerifyToken: builder.mutation({
      query: (body) => ({
        url: "/verify-token",
        method: "POST",
        body,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformResponse: (res: Response) => {
        return res.status === "Success" ? res.data : res.status;
      },
    }),
    postDeactivateUser: builder.mutation<any, { id: string }>({
      query: (body) => ({
        url: "/deactivate-user",
        method: "POST",
        body,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformResponse: (res: Response) => {
        return res.status === "Success" ? res.data : res.status;
      },
    }),
    postSendVerificationEmail: builder.mutation<any, { email: string }>({
      query: (email) => ({
        url: "/send-verification-email",
        method: "POST",
        body: email,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformResponse: (res: Response) => {
        return res.status === "Success" ? res.data : res.status;
      },
    }),
    postActivateUser: builder.mutation<any, { id: string }>({
      query: (body) => ({
        url: "/activate-user",
        method: "POST",
        body,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformResponse: (res: Response) => {
        return res.status === "Success" ? res.data : res.status;
      },
    }),
    postValidateToken: builder.mutation<any, { token: string }>({
      query: (body) => ({
        url: "/validate-reset-token",
        method: "POST",
        body: body,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformResponse: (res: Response) => {
        return res.status === "Success" ? res.data : res.status;
      },
    }),
    getUsersList: builder.query({
      query: () => ({
        url: `/users-list`,
        method: "GET",
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
    }),
    putUpdateUser: builder.mutation({
      query: (body) => ({
        url: "/update-user",
        method: "PUT",
        body: body,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformResponse: (res: Response) => {
        return res.status === "Success" ? res.data : res.status;
      },
    }),
    getAnnouncementsList: builder.query<any, any>({
      query: () => ({
        url: "/announcements/get_all",
        method: "GET",
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformResponse: (res: Response) => {
        return res.status === "Success" ? res.data : res.status;
      },
    }),
    getLatestAnnouncement: builder.query<any, any>({
      query: () => ({
        url: "/announcements/get_latest",
        method: "GET",
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformResponse: (res: Response) => {
        return res.status === "Success" ? res.data : res.status;
      },
    }),
    createAnnouncement: builder.mutation<
      any,
      { content: string; _id?: string }
    >({
      query: (body) => ({
        url: "/announcements/create",
        method: "POST",
        body: body,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformResponse: (res: Response) => {
        return res.status === "Success" ? res.data : res.status;
      },
    }),
    deleteAnnouncement: builder.mutation<any, { _id: string }>({
      query: (body) => ({
        url: "/announcements/delete",
        method: "POST",
        body: body,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformResponse: (res: Response) => {
        return res.status === "Success" ? res.data : res.status;
      },
    }),
    uploadCalculatorData: builder.mutation({
      query: (body) => ({
        url: "/uploadCalculatorData",
        method: "POST",
        body,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformResponse: (res: Response) => {
        return res.status === "Success" ? res.data : res.status;
      },
    }),
  }),
  overrideExisting: true,
});
