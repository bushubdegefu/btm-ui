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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
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
import { Textarea } from "@/components/ui/textarea";

// Sample tests data
const initialTests = [
  {
    id: "TEST001",
    requestId: "REQ001",
    name: "User Login",
    description: "Verify user can log in successfully",
    steps:
      "1. Navigate to login page\n2. Enter valid credentials\n3. Click login button",
    expected: "User should be logged in and redirected to dashboard",
  },
  {
    id: "TEST002",
    requestId: "REQ002",
    name: "Password Reset",
    description: "Verify password reset functionality",
    steps:
      "1. Click 'Forgot Password'\n2. Enter email\n3. Click 'Reset Password'\n4. Check email for reset link",
    expected: "User should receive password reset email",
  },
];

export default function TestsTable() {
  const [tests, setTests] = useState(initialTests);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState("id");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [editingId, setEditingId] = useState(null);
  const [newTest, setNewTest] = useState({
    id: "",
    requestId: "",
    name: "",
    description: "",
    steps: "",
    expected: "",
  });

  // Filter requirements based on search term
  const filteredTests = tests.filter(
    (test) =>
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTests = filteredTests.slice(indexOfFirstItem, indexOfLastItem);

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

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = (id) => {
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setTests(tests.filter((test) => test.id !== id));
  };

  const handleInputChange = (e, id, field) => {
    setTests(
      tests.map((test) =>
        test.id === id ? { ...test, [field]: e.target.value } : test,
      ),
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
        requestId: "",
        name: "",
        description: "",
        steps: "",
        expected: "",
      });
    }
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Tests</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-64">
          <Input type="text" placeholder="Search tests..." className="pl-10" />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <Dialog className="w-4/5">
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="mr-2 h-4 w-4" /> Add New Test
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full">
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
                  value={newTest.id}
                  onChange={(e) => handleNewTestChange(e, "id")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="requestId" className="text-right">
                  Request ID
                </Label>
                <Input
                  id="requestId"
                  value={newTest.requestId}
                  onChange={(e) => handleNewTestChange(e, "requestId")}
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
              <Button type="submit" onClick={handleAddNewTest}>
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
                className="w-[100px] cursor-pointer"
                onClick={() => handleSort("requestId")}
              >
                Request ID {<SortIcon column="requestId" />}
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
              <TableRow key={test.id}>
                <TableCell>{test.id}</TableCell>
                <TableCell>{test.requestId}</TableCell>
                <TableCell>
                  {editingId === test.id ? (
                    <Input
                      value={test.name}
                      onChange={(e) => handleInputChange(e, test.id, "name")}
                    />
                  ) : (
                    test.name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === test.id ? (
                    <Textarea
                      value={test.description}
                      onChange={(e) =>
                        handleInputChange(e, test.id, "description")
                      }
                    />
                  ) : (
                    test.description
                  )}
                </TableCell>
                <TableCell>
                  {editingId === test.id ? (
                    <Textarea
                      value={test.steps}
                      onChange={(e) => handleInputChange(e, test.id, "steps")}
                    />
                  ) : (
                    test.steps
                  )}
                </TableCell>
                <TableCell>
                  {editingId === test.id ? (
                    <Textarea
                      value={test.expected}
                      onChange={(e) =>
                        handleInputChange(e, test.id, "expected")
                      }
                    />
                  ) : (
                    test.expected
                  )}
                </TableCell>
                <TableCell>
                  {editingId === test.id ? (
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSave(test.id)}
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
                        onClick={() => handleEdit(test.id)}
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
                              Are you sure you want to delete this test? This
                              action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => {}}>
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleDelete(test.id)}
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

        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span>Show</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={handleItemsPerPageChange}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="5" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
            <span>per page</span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span>{`Page ${currentPage} of ${Math.ceil(filteredTests.length / itemsPerPage)}`}</span>
            <Button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(filteredTests.length / itemsPerPage)
              }
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
