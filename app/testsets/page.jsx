"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
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
const intitalTestsets = [
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
  const [testsets, setTestsets] = useState(intitalTestsets);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState("id");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [editingId, setEditingId] = useState(null);
  const [newTestSet, setNewTestset] = useState({
    id: "",
    name: "",
    description: "",
    numberOfTests: "",
  });

  // Filter testsets based on search term
  const filteredTestsets = testsets.filter(
    (test) =>
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTestsetss = filteredTestsets.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const sortedTestsets = [...testsets].sort((a, b) => {
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
    setTestsets(testsets.filter((testset) => testset.id !== id));
  };

  const handleInputChange = (e, id, field) => {
    setTestsets(
      testsets.map((testset) =>
        testset.id === id ? { ...testset, [field]: e.target.value } : testset,
      ),
    );
  };

  const handleNewTestChange = (e, field) => {
    setNewTestset({ ...newTestSet, [field]: e.target.value });
  };

  const handleAddNewTestset = () => {
    if (newTestSet.id && newTestSet.name) {
      setTestsets([...testsets, newTestSet]);
      setNewTestset({
        id: "",
        name: "",
        description: "",
        numberOfTests: null,
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
              <Plus className="mr-2 h-4 w-4" /> Add New Test Set
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full">
            <DialogHeader>
              <DialogTitle>Add New Test Set</DialogTitle>
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
                  value={newTestSet.id}
                  onChange={(e) => handleNewTestChange(e, "id")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newTestSet.name}
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
                  value={newTestSet.description}
                  onChange={(e) => handleNewTestChange(e, "description")}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddNewTestset}>
                Add Testset
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
              <TableHead className="w-2/4">Description</TableHead>
              <TableHead>Number of Tests </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTestsets.map((testset) => (
              <TableRow key={testset.id}>
                <TableCell>{testset.id}</TableCell>
                <TableCell>
                  {editingId === testset.id ? (
                    <Input
                      value={testset.name}
                      onChange={(e) =>
                        handleInputChange(e, testset.name, "name")
                      }
                    />
                  ) : (
                    <Link href="/testsets/runs"> {testset?.name} </Link>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === testset.id ? (
                    <Textarea
                      value={testset.description}
                      onChange={(e) =>
                        handleInputChange(e, testset.description, "description")
                      }
                    />
                  ) : (
                    testset?.description
                  )}
                </TableCell>
                <TableCell>
                  {editingId === testset.id ? (
                    <Input readOnly value={testset.numberOfTests} />
                  ) : (
                    testset?.numberOfTests
                  )}
                </TableCell>

                <TableCell>
                  {editingId === testset?.id ? (
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSave(testset?.id)}
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
                        onClick={() => handleEdit(testset?.id)}
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
                              Are you sure you want to delete this test set?
                              This action cannot be undone.
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
            <span>{`Page ${currentPage} of ${Math.ceil(filteredTestsets.length / itemsPerPage)}`}</span>
            <Button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredTestsets.length / itemsPerPage)
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
