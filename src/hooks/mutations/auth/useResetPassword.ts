import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import axiosApi from "@/services/axiosApi";

export type ResetPasswordResponseType = {
  message: string;
  accessToken: string;
  refreshToken: string;
};

type ResetPasswordInputType = {
  newPassword: string;
  token: string;
};

const ResetPassword = (
  input: ResetPasswordInputType
): Promise<AxiosResponse<ResetPasswordResponseType>> => {
  return axiosApi.post("auth/reset-password", input);
};

const useResetPassword = () => {
  return useMutation<
    AxiosResponse<ResetPasswordResponseType>,
    AxiosError,
    ResetPasswordInputType
  >({
    mutationFn: (input: ResetPasswordInputType) => ResetPassword(input),
  });
};

export default useResetPassword;
