import { get_sprints } from "../actions";
import SprintCard from "./client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import PaginagtionBottom from "../components/generic/pagination";
import { cookies } from "next/headers";

export default async function SprintCards() {
  const currentSprints = await get_sprints();

  return (
    <>
      <div className="overflow-x-auto bg-white p-5 rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-[100px] cursor-pointer"
                // onClick={() => handleSort("id")}
              >
                ID
              </TableHead>
              <TableHead
                className="cursor-pointer"
                // onClick={() => handleSort("name")}
              >
                Name
              </TableHead>

              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentSprints?.map((sprint) => (
              <SprintCard key={sprint.id} sprint={sprint} />
            ))}
          </TableBody>
        </Table>

        <PaginagtionBottom />
      </div>
    </>
  );
}
