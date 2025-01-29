"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { get_sprints } from "../actions";
import SprintCard from "./client";

import { useEffect, useState } from "react";
import PaginagtionBottom from "../components/generic/pagination";
import { useUtilStore } from "../store/utilcommon";

export default function SprintCards() {
  const [, setEditedSprint] = useState();
  const [sprints, setSprints] = useState();
  const [total, setTotal] = useState();
  const refreshTrigor = useUtilStore((state) => state.refreshTrigor);
  const itemsPerPage = useUtilStore((state) => state.size);
  const currentPage = useUtilStore((state) => state.page);

  useEffect(() => {
    const reload = async () => {
      const items = await get_sprints();
      setEditedSprint(items?.sprints);
      setSprints(items?.sprints);
      setTotal(items.total);
    };
    reload();
  }, [itemsPerPage, currentPage, refreshTrigor]);

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
            {sprints?.map((sprint) => (
              <SprintCard key={sprint?.id} sprint={sprint} />
            ))}
          </TableBody>
        </Table>

        <PaginagtionBottom total_items={total} />
      </div>
    </>
  );
}
