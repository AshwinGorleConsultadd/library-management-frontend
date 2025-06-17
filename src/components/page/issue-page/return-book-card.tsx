import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import Spinner from "@/components/spinner";
import useGetIssuedBooks from "@/hooks/issue/useGetIssuedBooks";
import { useReturnBook } from "@/hooks/issue/useReturnBook";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function ReturnBookCard() {
  const { data: issuedBooks, loading } = useGetIssuedBooks();
  const { loading: returnBookLoading, handleReturnBook } = useReturnBook();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "returned" | "pending">("all");

  const handleReturn = (issueId: number) => {
    handleReturnBook(issueId);
  };

  const filteredBooks = useMemo(() => {
    return (
      issuedBooks?.filter((entry) => {
        const matchesSearch =
          entry.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.book?.title.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDate = selectedDate
          ? format(new Date(entry.issue_date), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
          : true;

        const matchesStatus =
          filterStatus === "all"
            ? true
            : filterStatus === "returned"
            ? !!entry.return_date
            : !entry.return_date;

        return matchesSearch && matchesDate && matchesStatus;
      }) ?? []
    );
  }, [issuedBooks, searchTerm, selectedDate, filterStatus]);

  return (
    <Card className="w-full max-w-6xl mx-auto p-6 border border-gray-300 shadow-md rounded-2xl bg-white dark:bg-[#111]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          📄 Return Issued Books
        </CardTitle>

        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex flex-col">
            <Label className="text-gray-700 dark:text-gray-200">Search</Label>
            <Input
              placeholder="Search by member or book..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>

          <div className="flex flex-col">
            <Label className="text-gray-700 dark:text-gray-200">Filter by Issue Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[200px] justify-start text-left font-normal bg-background border dark:border-gray-600",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "dd MMM yyyy") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col">
            <Label className="text-gray-700 dark:text-gray-200">Status</Label>
            <RadioGroup
              defaultValue="all"
              value={filterStatus}
              onValueChange={(value) => setFilterStatus(value as "all" | "returned" | "pending")}
              className="flex space-x-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="returned" id="returned" />
                <Label htmlFor="returned">Returned</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pending" id="pending" />
                <Label htmlFor="pending">Pending</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <Skeleton className="h-40 w-full" />
        ) : (
          <div className="overflow-auto rounded-lg border dark:border-gray-700 mt-4">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Member</th>
                  <th className="px-4 py-2 border">Book</th>
                  <th className="px-4 py-2 border">Issue Date</th>
                  <th className="px-4 py-2 border">Return Date</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((entry, index) => (
                  <tr key={entry.id} className="border-t dark:border-gray-600">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{entry.user?.name || "N/A"}</td>
                    <td className="px-4 py-2 border">{entry.book?.title || "N/A"}</td>
                    <td className="px-4 py-2 border">
                      {entry.issue_date
                        ? format(new Date(entry.issue_date), "dd MMM yyyy")
                        : "—"}
                    </td>
                    <td className="px-4 py-2 border">
                      {entry.return_date ? (
                        format(new Date(entry.return_date), "dd MMM yyyy")
                      ) : (
                        <span className="text-red-500">Not returned</span>
                      )}
                    </td>
                    <td className="px-4 py-2 border">
                      {entry.return_date ? (
                        <span className="text-green-600 font-medium">Returned</span>
                      ) : (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleReturn(entry.id)}
                          disabled={returnBookLoading}
                        >
                          {returnBookLoading ? <Spinner /> : "Return"}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredBooks.length === 0 && (
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                No matching entries found.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
