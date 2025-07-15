import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import axiosApi from "@/services/axiosApi";

export type UpdateProfileResponseType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  message: string;
};

type UpdateProfileInputType = {
  firstName: string;
  lastName: string;
  email: string;
};

const updateProfile = (
  input: UpdateProfileInputType
): Promise<AxiosResponse<UpdateProfileResponseType>> => {
  return axiosApi.post("user/profile", input);
};

const useUpdateProfile = () => {
  return useMutation<
    AxiosResponse<UpdateProfileResponseType>,
    AxiosError,
    UpdateProfileInputType
  >({
    mutationFn: (input: UpdateProfileInputType) => updateProfile(input),
  });
};

export default useUpdateProfile;
