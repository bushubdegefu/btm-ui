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
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";

// Sample issues data
const issues = [
  {
    id: "ISS001",
    name: "Login page not responsive",
    status: "open",
    description: "The login page is not rendering correctly on mobile devices.",
  },
  {
    id: "ISS002",
    name: "Database connection timeout",
    status: "fixed",
    description:
      "Users experiencing timeouts when trying to access the database.",
  },
  {
    id: "ISS003",
    name: "Incorrect calculation in reports",
    status: "reopened",
    description:
      "The monthly report is showing incorrect totals for sales data.",
  },
  {
    id: "ISS004",
    name: "User profile picture not uploading",
    status: "open",
    description: "Users are unable to upload or change their profile pictures.",
  },
  {
    id: "ISS005",
    name: "Broken links in documentation",
    status: "closed",
    description:
      "Several links in the user documentation are leading to 404 pages.",
  },
];

const statusColors = {
  open: "bg-yellow-100 text-yellow-800",
  fixed: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
  reopened: "bg-red-100 text-red-800",
};

export default function IssueTable() {
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  const sortedIssues = [...issues].sort((a, b) => {
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
      <h1 className="text-2xl font-bold mb-4">Issues</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-64">
          <Input type="text" placeholder="Search issues..." className="pl-10" />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add New Issue
        </Button>
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
                Issue Name {<SortIcon column="name" />}
              </TableHead>
              <TableHead
                className="w-[120px] cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status {<SortIcon column="status" />}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("description")}
              >
                Description {<SortIcon column="description" />}
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedIssues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>{issue.id}</TableCell>
                <TableCell className="font-medium">{issue.name}</TableCell>
                <TableCell>
                  <Badge className={`${statusColors[issue.status]}`}>
                    {issue.status}
                  </Badge>
                </TableCell>
                <TableCell>{issue.description}</TableCell>
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
    </div>
  );
}
