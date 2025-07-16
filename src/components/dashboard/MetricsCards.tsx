"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MetricsData {
  revenueThisMonth: number;
  activeUsersThisMonth: number;
  churnedUsers: number;
}

interface MetricsCardsProps {
  metricsData: MetricsData;
  isLoadingMetrics: boolean;
}

export function MetricsCards({
  metricsData,
  isLoadingMetrics,
}: MetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
          <CardDescription>This month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${!isLoadingMetrics ? metricsData?.revenueThisMonth?.toFixed(2) : 0}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Active Users</CardTitle>
          <CardDescription>This month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {!isLoadingMetrics ? metricsData?.activeUsersThisMonth : 0}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Churned Users</CardTitle>
          <CardDescription>From last month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {!isLoadingMetrics ? metricsData?.churnedUsers : 0}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
