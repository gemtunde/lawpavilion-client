import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface Transaction {
  _id: string;
  description: string;
  amount: number;
  status: string;
  currency: string;
  createdAt: string;
}
interface TransactionsTableProps {
  transactions: Transaction[];
  isLoading: boolean;
  currentPage: number;
  pages: number;
  total: number;
  pageSize: number;
  searchItem: string;
  onSearch: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void; // optional if not used
  onRefetch: () => void;
}

export function TransactionsTable({
  transactions,
  isLoading,
  currentPage,
  pages,
  total,
  pageSize,
  searchItem,
  onSearch,
  onPageChange,
  //onPageSizeChange,
  onRefetch,
}: TransactionsTableProps) {
  const renderPaginationItems = () => {
    const items = [];
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className={
            currentPage === 1
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    for (let i = 1; i <= pages; i++) {
      if (
        i === 1 ||
        i === pages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => onPageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        items.push(
          <PaginationItem key={`ellipsis-${i}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() => onPageChange(Math.min(pages, currentPage + 1))}
          className={
            currentPage === pages
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );
    return items;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>Transaction history and details</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onRefetch}>
            Refresh
          </Button>
        </div>

        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search transactions..."
            value={searchItem}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-pulse w-full">
              {[...Array(pageSize)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded mb-2" />
              ))}
            </div>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No transactions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  transactions.map((t) => (
                    <TableRow key={t._id}>
                      <TableCell>{t._id.slice(0, 6)}...</TableCell>
                      <TableCell>{t.currency}</TableCell>
                      <TableCell>${t.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge>{t.status}</Badge>
                      </TableCell>
                      <TableCell>
                        {formatDistanceToNow(new Date(t.createdAt), {
                          addSuffix: true,
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {pages >= 1 && (
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                  Showing {(currentPage - 1) * pageSize + 1} to{" "}
                  {Math.min(currentPage * pageSize, total)} of {total}
                </div>
                <Pagination>
                  <PaginationContent>
                    {renderPaginationItems()}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
