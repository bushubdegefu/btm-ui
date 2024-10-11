"use client";

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
  Play,
  Edit,
  Trash2,
} from "lucide-react";

const testCases = [
  {
    id: 1,
    name: "Login Functionality",
    status: "Passed",
    priority: "High",
    lastRun: "2023-10-07",
  },
  {
    id: 2,
    name: "User Registration",
    status: "Failed",
    priority: "Medium",
    lastRun: "2023-10-06",
  },
  {
    id: 3,
    name: "Password Reset",
    status: "Not Run",
    priority: "Low",
    lastRun: "N/A",
  },
  {
    id: 4,
    name: "Product Search",
    status: "Passed",
    priority: "High",
    lastRun: "2023-10-07",
  },
  {
    id: 5,
    name: "Checkout Process",
    status: "In Progress",
    priority: "High",
    lastRun: "2023-10-08",
  },
];

export default function TestCasesTable() {
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const sortedTestCases = [...testCases].sort((a, b) => {
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
      <h1 className="text-2xl font-bold mb-4">Test Cases</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search test cases..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          Add New Test Case
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name {<SortIcon column="name" />}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("status")}
            >
              Status {<SortIcon column="status" />}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("priority")}
            >
              Priority {<SortIcon column="priority" />}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("lastRun")}
            >
              Last Run {<SortIcon column="lastRun" />}
            </TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTestCases.map((testCase) => (
            <TableRow key={testCase.id}>
              <TableCell>{testCase.id}</TableCell>
              <TableCell className="font-medium">{testCase.name}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    testCase.status === "Passed"
                      ? "bg-green-200 text-green-800"
                      : testCase.status === "Failed"
                        ? "bg-red-200 text-red-800"
                        : testCase.status === "In Progress"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {testCase.status}
                </span>
              </TableCell>
              <TableCell>{testCase.priority}</TableCell>
              <TableCell>{testCase.lastRun}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Play className="h-4 w-4" />
                  </Button>
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
