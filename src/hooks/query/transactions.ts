"use client";
import { useQuery } from "@tanstack/react-query";
import axiosApi from "@/services/axiosApi";
// Transaction history query
export const useTransactionHistory = (
  search: string,
  pageSize = 10,
  page = 1
) => {
  return useQuery({
    queryKey: ["transactions", search, pageSize, page],
    queryFn: async () => {
      const response = await axiosApi.get(
        `/transactions?page=${page}&pageSize=${pageSize}&search=${search}`
      );
      return response.data;
    },
    refetchInterval: 60000,
    //keepPreviousData: true,
  });
};
