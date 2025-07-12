import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import axiosApi from "@/services/axiosApi";

export type ForgotPasswordResponseType = {
  message: string;
  accessToken: string;
  refreshToken: string;
};

type ForgotPasswordInputType = {
  email: string;
};

const ForgotPassword = (
  input: ForgotPasswordInputType
): Promise<AxiosResponse<ForgotPasswordResponseType>> => {
  return axiosApi.post("auth/forgot-password", input);
};

const useForgotPassword = () => {
  return useMutation<
    AxiosResponse<ForgotPasswordResponseType>,
    AxiosError,
    ForgotPasswordInputType
  >({
    mutationFn: (input: ForgotPasswordInputType) => ForgotPassword(input),
  });
};

export default useForgotPassword;
