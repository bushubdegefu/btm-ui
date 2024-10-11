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
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
  Plus,
  Check,
  X,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample issues data
const initialIssues = [
  {
    id: "ISSUE001",
    name: "Login button not working",
    description: "Users unable to log in due to non-responsive login button",
    status: "Open",
    severity: "High",
    assignedTo: "John Doe",
    createdDate: "2023-06-01",
    updatedDate: "2023-06-02",
  },
  {
    id: "ISSUE002",
    name: "Incorrect calculation in reports",
    description: "Financial reports showing incorrect totals",
    status: "Fixed",
    severity: "Critical",
    assignedTo: "Jane Smith",
    createdDate: "2023-05-28",
    updatedDate: "2023-06-03",
  },
];

const severityColors = {
  Low: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-orange-100 text-orange-800",
  Critical: "bg-red-100 text-red-800",
};

const statusColors = {
  Open: "bg-blue-100 text-blue-800",
  Fixed: "bg-green-100 text-green-800",
  Reopened: "bg-yellow-100 text-yellow-800",
  Closed: "bg-gray-100 text-gray-800",
};

export default function IssueTable() {
  const [issues, setIssues] = useState(initialIssues);
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [editingId, setEditingId] = useState(null);
  const [newIssue, setNewIssue] = useState({
    id: "",
    name: "",
    description: "",
    status: "Open",
    severity: "Medium",
    assignedTo: "",
    createdDate: new Date().toISOString().split("T")[0],
    updatedDate: new Date().toISOString().split("T")[0],
  });

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

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = (id) => {
    setEditingId(null);
    const updatedIssue = issues.find((issue) => issue.id === id);
    updatedIssue.updatedDate = new Date().toISOString().split("T")[0];
    setIssues([...issues]);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setIssues(issues.filter((issue) => issue.id !== id));
  };

  const handleInputChange = (e, id, field) => {
    setIssues(
      issues.map((issue) =>
        issue.id === id ? { ...issue, [field]: e.target.value } : issue,
      ),
    );
  };

  const handleNewIssueChange = (field, value) => {
    setNewIssue({ ...newIssue, [field]: value });
  };

  const handleAddNewIssue = () => {
    if (newIssue.id && newIssue.name) {
      setIssues([...issues, newIssue]);
      setNewIssue({
        id: "",
        name: "",
        description: "",
        status: "Open",
        severity: "Medium",
        assignedTo: "",
        createdDate: new Date().toISOString().split("T")[0],
        updatedDate: new Date().toISOString().split("T")[0],
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Issues</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-64">
          <Input type="text" placeholder="Search issues..." className="pl-10" />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="mr-2 h-4 w-4" /> Add New Issue
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Issue</DialogTitle>
              <DialogDescription>
                Enter the details for the new issue.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  ID
                </Label>
                <Input
                  id="id"
                  value={newIssue.id}
                  onChange={(e) => handleNewIssueChange("id", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newIssue.name}
                  onChange={(e) => handleNewIssueChange("name", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={newIssue.description}
                  onChange={(e) =>
                    handleNewIssueChange("description", e.target.value)
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={newIssue.status}
                  onValueChange={(value) =>
                    handleNewIssueChange("status", value)
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Fixed">Fixed</SelectItem>
                    <SelectItem value="Reopened">Reopened</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="severity" className="text-right">
                  Severity
                </Label>
                <Select
                  value={newIssue.severity}
                  onValueChange={(value) =>
                    handleNewIssueChange("severity", value)
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assignedTo" className="text-right">
                  Assigned To
                </Label>
                <Input
                  id="assignedTo"
                  value={newIssue.assignedTo}
                  onChange={(e) =>
                    handleNewIssueChange("assignedTo", e.target.value)
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddNewIssue}>
                Add Issue
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
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status {<SortIcon column="status" />}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("severity")}
              >
                Severity {<SortIcon column="severity" />}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("assignedTo")}
              >
                Assigned To {<SortIcon column="assignedTo" />}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("createdDate")}
              >
                Created Date {<SortIcon column="createdDate" />}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("updatedDate")}
              >
                Updated Date {<SortIcon column="updatedDate" />}
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedIssues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>{issue.id}</TableCell>
                <TableCell>{issue.name}</TableCell>
                <TableCell>
                  {editingId === issue.id ? (
                    <Input
                      value={issue.description}
                      onChange={(e) =>
                        handleInputChange(e, issue.id, "description")
                      }
                    />
                  ) : (
                    issue.description
                  )}
                </TableCell>
                <TableCell>
                  {editingId === issue.id ? (
                    <Select
                      value={issue.status}
                      onValueChange={(value) =>
                        handleInputChange(
                          { target: { value } },
                          issue.id,
                          "status",
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="Fixed">Fixed</SelectItem>
                        <SelectItem value="Reopened">Reopened</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge className={`${statusColors[issue.status]}`}>
                      {issue.status}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={`${severityColors[issue.severity]}`}>
                    {issue.severity}
                  </Badge>
                </TableCell>
                <TableCell>{issue.assignedTo}</TableCell>
                <TableCell>{issue.createdDate}</TableCell>
                <TableCell>{issue.updatedDate}</TableCell>
                <TableCell>
                  {editingId === issue.id ? (
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSave(issue.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCancel}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(issue.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this issue? This
                              action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => {}}>
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleDelete(issue.id)}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
