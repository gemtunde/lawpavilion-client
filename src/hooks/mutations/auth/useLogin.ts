import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import axiosApi from "@/services/axiosApi";

export type LoginResponseType = {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isVerified: boolean;
  };
};

type LoginInputType = {
  password: string;
  email: string;
};

const login = (
  input: LoginInputType
): Promise<AxiosResponse<LoginResponseType>> => {
  return axiosApi.post("auth/login", input, {
    withCredentials: true,
  });
};

const useLogin = () => {
  return useMutation<
    AxiosResponse<LoginResponseType>,
    AxiosError,
    LoginInputType
  >({
    mutationFn: (input: LoginInputType) => login(input),
  });
};

export default useLogin;
