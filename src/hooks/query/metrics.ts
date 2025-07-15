"use client";
import { useQuery } from "@tanstack/react-query";
import axiosApi from "@/services/axiosApi";

export const useMetrics = () => {
  return useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: async () => {
      const response = await axiosApi.get(`/metrics`);
      return response.data;
    },
    refetchInterval: 60000,
  });
};
