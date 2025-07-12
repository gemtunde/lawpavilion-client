import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import axiosApi from "@/services/axiosApi";

export type RegisterResponseType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  message: string;
};

type RegisterInputType = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  password: string;
  agreeTerms?: boolean;
};

const register = (
  input: RegisterInputType
): Promise<AxiosResponse<RegisterResponseType>> => {
  return axiosApi.post("auth/register", input);
};

const useRegister = () => {
  return useMutation<
    AxiosResponse<RegisterResponseType>,
    AxiosError,
    RegisterInputType
  >({
    mutationFn: (input: RegisterInputType) => register(input),
  });
};

export default useRegister;
