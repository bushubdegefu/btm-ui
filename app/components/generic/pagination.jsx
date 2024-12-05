"use client";
import { useUtilStore } from "@/app/store/utilcommon";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import jsCookie from "js-cookie";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PaginagtionBottom() {
  const router = useRouter();
  const pageSize = useUtilStore((state) => state.size);
  const setPageSize = useUtilStore((state) => state.setSize);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    jsCookie.set("page_size", pageSize, { expires: 7, path: "/" });
    router.refresh();
  }, [pageSize]);

  useEffect(() => {
    jsCookie.set("current_page", currentPage, { expires: 7, path: "/" });
    router.refresh();
  }, [currentPage]);

  return (
    <>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span>Show</span>
          <Select value={pageSize} onValueChange={setPageSize}>
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder={`${pageSize}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span>per page</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {/* <span>{`Page ${currentPage} of ${Math.ceil(filteredTests.length / itemsPerPage)}`}</span> */}
          <span>{`Page ${currentPage}`}</span>
          <Button onClick={() => setCurrentPage(currentPage + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
