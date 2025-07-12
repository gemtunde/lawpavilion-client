import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import axiosApi from "@/services/axiosApi";

export type ResendVerificationEmailResponseType = {
  message: string;
};

const ResendVerificationEmail = async (): Promise<
  AxiosResponse<ResendVerificationEmailResponseType>
> => {
  //return axiosApi.post('auth/resend-verification')
  const response = await axiosApi.post("/auth/resend-verification");
  return response.data;
};

const useResendVerificationEmail = () => {
  return useMutation<
    AxiosResponse<ResendVerificationEmailResponseType>,
    AxiosError
  >({
    mutationFn: () => ResendVerificationEmail(),
  });
};

export default useResendVerificationEmail;
