"use client";
import { useUtilStore } from "@/app/store/utilcommon";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import jsCookie from "js-cookie";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PaginagtionBottom({ total_items }) {
  // const router = useRouter();
  // const path = usePathname();
  const pageSize = useUtilStore((state) => state.size);
  const setPage = useUtilStore((state) => state.setPage);

  const setPageSize = useUtilStore((state) => state.setSize);
  const [currentPage, setCurrentPage] = useState(1);

  const total_pages =
    Math.ceil(parseFloat(total_items) / pageSize) > 1
      ? Math.ceil(parseFloat(total_items) / pageSize)
      : 1;

  useEffect(() => {
    setPageSize(pageSize);
    jsCookie.set("page_size", pageSize, { expires: 7, path: "/" });
  });

  useEffect(() => {
    setCurrentPage(1);
    jsCookie.set("page_size", pageSize, { expires: 7, path: "/" });
  }, [pageSize]);

  useEffect(() => {
    setPage(currentPage);
    jsCookie.set("current_page", currentPage, { expires: 7, path: "/" });
  }, [currentPage]);

  return (
    <>
      <div className="p-5 m-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span>Show</span>
          <Select value={pageSize} onValueChange={setPageSize}>
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder="20" />
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
          <span>{`Page ${currentPage} of ${total_pages}`}</span>

          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage == total_pages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
