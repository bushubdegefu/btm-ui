import React, { useState } from "react";
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
  Search,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";

const testSets = [
  {
    id: "TS001",
    name: "Regression Suite",
    description: "Full regression test suite for the application",
    numberOfTests: 50,
  },
  {
    id: "TS002",
    name: "Smoke Tests",
    description: "Quick tests to verify basic functionality",
    numberOfTests: 10,
  },
  {
    id: "TS003",
    name: "Performance Tests",
    description: "Tests to measure application performance under load",
    numberOfTests: 15,
  },
  {
    id: "TS004",
    name: "Security Tests",
    description: "Tests to verify application security measures",
    numberOfTests: 20,
  },
  {
    id: "TS005",
    name: "UI/UX Tests",
    description: "Tests focused on user interface and experience",
    numberOfTests: 30,
  },
];

export default function TestSetsTable() {
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const sortedTestSets = [...testSets].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Test Sets</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search test sets..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          Add New Test Set
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="w-[100px] cursor-pointer"
              onClick={() => handleSort("id")}
            >
              Test Set ID {<SortIcon column="id" />}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Test Set Name {<SortIcon column="name" />}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("description")}
            >
              Description {<SortIcon column="description" />}
            </TableHead>
            <TableHead
              className="w-[150px] cursor-pointer"
              onClick={() => handleSort("numberOfTests")}
            >
              Number of Tests {<SortIcon column="numberOfTests" />}
            </TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTestSets.map((testSet) => (
            <TableRow key={testSet.id}>
              <TableCell>{testSet.id}</TableCell>
              <TableCell className="font-medium">{testSet.name}</TableCell>
              <TableCell>{testSet.description}</TableCell>
              <TableCell>{testSet.numberOfTests}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
