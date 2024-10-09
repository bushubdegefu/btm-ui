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
  Play,
} from "lucide-react";

const tests = [
  {
    id: "T001",
    name: "User Login",
    steps:
      "1. Navigate to login page\n2. Enter valid username\n3. Enter valid password\n4. Click login button",
    expectedResult:
      "User should be successfully logged in and redirected to dashboard",
    relatedRequirementId: "REQ001",
  },
  {
    id: "T002",
    name: "Create New Project",
    steps:
      '1. Click "New Project" button\n2. Fill in project details\n3. Click "Create" button',
    expectedResult:
      "New project should be created and appear in the project list",
    relatedRequirementId: "REQ005",
  },
  {
    id: "T003",
    name: "Generate Report",
    steps:
      '1. Navigate to Reports section\n2. Select report type\n3. Choose date range\n4. Click "Generate" button',
    expectedResult: "Report should be generated and displayed on screen",
    relatedRequirementId: "REQ010",
  },
  {
    id: "T004",
    name: "Update User Profile",
    steps:
      '1. Go to user profile page\n2. Click "Edit Profile"\n3. Update information\n4. Click "Save Changes"',
    expectedResult: "User profile should be updated with new information",
    relatedRequirementId: "REQ015",
  },
  {
    id: "T005",
    name: "Delete Project",
    steps: '1. Select a project\n2. Click "Delete" option\n3. Confirm deletion',
    expectedResult: "Project should be removed from the project list",
    relatedRequirementId: "REQ007",
  },
];

export default function TestsTable() {
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  const sortedTests = [...tests].sort((a, b) => {
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
      <h1 className="text-2xl font-bold mb-4">Tests</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-64">
          <Input type="text" placeholder="Search tests..." className="pl-10" />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          Add New Test
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-[80px] cursor-pointer"
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
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("steps")}
              >
                Steps {<SortIcon column="steps" />}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("expectedResult")}
              >
                Expected Result {<SortIcon column="expectedResult" />}
              </TableHead>
              <TableHead
                className="w-[150px] cursor-pointer"
                onClick={() => handleSort("relatedRequirementId")}
              >
                Req ID {<SortIcon column="relatedRequirementId" />}
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTests.map((test) => (
              <TableRow key={test.id}>
                <TableCell>{test.id}</TableCell>
                <TableCell className="font-medium">{test.name}</TableCell>
                <TableCell className="whitespace-pre-line">
                  {test.steps}
                </TableCell>
                <TableCell>{test.expectedResult}</TableCell>
                <TableCell>{test.relatedRequirementId}</TableCell>
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
    </div>
  );
}
