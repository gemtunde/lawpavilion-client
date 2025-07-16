"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAuth } from "@/context/useAuth";
import { useTransactionHistory } from "@/hooks/query/transactions";
import { TransactionsTable } from "../shared/TransactionsTable";
import { useMetrics } from "@/hooks/query/metrics";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface ITransactionProps {
  _id: string;
  userid: string;
  currency: string;
  amount: number;
  status: string;
  stripePaymentIntentId: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchItem, setSearchItem] = useState("");

  const {
    data: transactionsData,
    isLoading: isLoadingTransactions,
    refetch,
  } = useTransactionHistory(searchItem, pageSize, currentPage);

  const { data: metrics, isLoading: isLoadingMetrics } = useMetrics();
  const metricsData = metrics?.data || {};

  console.log("Metrics Data: ", metricsData);

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600">
            Here is what is happening with your legal practice today.
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {!isLoadingMetrics
                  ? metricsData?.revenueThisMonth?.toFixed(2)
                  : 0}
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

        {/* Charts and Analytics */}
        <div className="mb-4">
          {!isLoadingMetrics ? (
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Daily revenue over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={metricsData?.revenueTrend || []}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => `$${value.toFixed(2)}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          ) : (
            <p>...Loading</p>
          )}
        </div>

        <div className="grid grid-cols-1">
          <TransactionsTable
            transactions={transactionsData?.data || []}
            isLoading={isLoadingTransactions}
            currentPage={currentPage}
            pages={transactionsData?.pages || 0}
            total={transactionsData?.total || 10}
            pageSize={pageSize}
            searchItem={searchItem}
            onSearch={(value: string) => {
              setSearchItem(value);
              setCurrentPage(1);
            }}
            onPageChange={(page: number) => setCurrentPage(page)}
            onPageSizeChange={(size: number) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
            onRefetch={() => refetch()}
          />
        </div>
      </div>
    </main>
  );
}
