import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import axiosApi from "@/services/axiosApi";

export type VerifyEmailResponseType = {
  message: string;
  accessToken: string;
  refreshToken: string;
};

type VerifyEmailInputType = {
  token: string;
};

const VerifyEmail = (
  input: VerifyEmailInputType
): Promise<AxiosResponse<VerifyEmailResponseType>> => {
  return axiosApi.post(`auth/verify-email/${input.token}`);
};

const useVerifyEmail = () => {
  return useMutation<
    AxiosResponse<VerifyEmailResponseType>,
    AxiosError,
    VerifyEmailInputType
  >({
    mutationFn: (input: VerifyEmailInputType) => VerifyEmail(input),
  });
};

export default useVerifyEmail;
