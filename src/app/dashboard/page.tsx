"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/useAuth";
import { useTransactionHistory } from "@/hooks/query/transactions";
import { TransactionsTable } from "../shared/TransactionsTable";
import { useMetrics } from "@/hooks/query/metrics";

export interface ITransactionProps {
  _id: string;
  userid: string;
  currency: string;
  amount: number;
  status: string;
  stripePaymentIntentId: string;
  createdAt: string;
}
// Lazy import components
const MetricsCards = dynamic(
  () =>
    import("@/components/dashboard/MetricsCards").then(
      (mod) => mod.MetricsCards
    ),
  {
    loading: () => <p>Loading metrics...</p>,
    ssr: false,
  }
);
const RevenueChart = dynamic(
  () =>
    import("@/components/dashboard/RevenueChart").then(
      (mod) => mod.RevenueChart
    ),
  {
    loading: () => <p>Loading chart...</p>,
    ssr: false,
  }
);

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

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600">
            Here is what is happening with your legal practice today.
          </p>
        </div>

        {/* Metrics Cards */}
        <MetricsCards
          metricsData={metricsData}
          isLoadingMetrics={isLoadingMetrics}
        />

        {/* Chart */}
        <div className="mb-4">
          {!isLoadingMetrics && metricsData?.revenueTrend ? (
            <RevenueChart data={metricsData.revenueTrend} />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>

        {/* Transactions */}
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
