"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ChevronDown, ChevronUp, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUtilStore } from "../store/utilcommon";
import { get_tests } from "../actions";
import PaginagtionBottom from "../components/generic/pagination";
import { TestRow } from "./tests";

export default function TestsTable() {
  const [tests, setTests] = useState();
  const [sortColumn, setSortColumn] = useState("id");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [newTest, setNewTest] = useState({
    id: "",
    requirment_id: "",
    name: "",
    description: "",
    steps: "",
    expected_result: "",
  });

  const [total, setTotal] = useState();
  const refreshTrigor = useUtilStore((state) => state.refreshTrigor);
  const itemsPerPage = useUtilStore((state) => state.size);
  const currentPage = useUtilStore((state) => state.page);

  useEffect(() => {
    const reload = async () => {
      const items = await get_tests();

      setTests(items?.tests);
      setTotal(items.total);
    };
    reload();
  }, [itemsPerPage, currentPage, refreshTrigor]);

  // Filter requirements based on search term
  const filteredTests = tests
    ? tests?.filter(
        (test) =>
          test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          test.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTests = filteredTests?.slice(indexOfFirstItem, indexOfLastItem);

  const sortedTests = tests
    ? [...tests].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn])
          return sortDirection === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn])
          return sortDirection === "asc" ? 1 : -1;
        return 0;
      })
    : [];

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ column }) => {
    if (column !== sortColumn) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  };

  const handleNewTestChange = (e, field) => {
    setNewTest({ ...newTest, [field]: e.target.value });
  };

  const handleAddNewTest = () => {
    if (newTest.id && newTest.name) {
      setTests([...tests, newTest]);
      setNewTest({
        id: "",
        requirment_id: 0,
        name: "",
        description: "",
        steps: "",
        expected_result: "",
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Tests</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-64">
          <Input type="text" placeholder="Search tests..." className="pl-10" />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <Dialog className="max-w-full w-3/5">
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="mr-2 h-4 w-4" /> Add New Test
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-full w-3/5">
            <DialogHeader>
              <DialogTitle>Add New Test</DialogTitle>
              <DialogDescription>
                Enter the details for the new test case.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  ID
                </Label>
                <Input
                  id="id"
                  value={newTest?.id}
                  onChange={(e) => handleNewTestChange(e, "id")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="requestId" className="text-right">
                  Requirment ID
                </Label>
                <Input
                  id="requirment_id"
                  value={newTest?.requirment_id}
                  onChange={(e) => handleNewTestChange(e, "requirment_id")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newTest.name}
                  onChange={(e) => handleNewTestChange(e, "name")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newTest.description}
                  onChange={(e) => handleNewTestChange(e, "description")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="steps" className="text-right">
                  Steps
                </Label>
                <Textarea
                  id="steps"
                  value={newTest.steps}
                  onChange={(e) => handleNewTestChange(e, "steps")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expected" className="text-right">
                  Expected
                </Label>
                <Textarea
                  id="expected"
                  value={newTest.expected}
                  onChange={(e) => handleNewTestChange(e, "expected")}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={handleAddNewTest}
              >
                Add Test
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-[100px] cursor-pointer"
                onClick={() => handleSort("id")}
              >
                ID {<SortIcon column="id" />}
              </TableHead>

              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name {<SortIcon column="name" />}
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Steps</TableHead>
              <TableHead>Expected Result</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTests.map((test) => (
              <TestRow key={test.id} test={test} />
            ))}
          </TableBody>
        </Table>

        <PaginagtionBottom total_items={total} />
      </div>
    </div>
  );
}
