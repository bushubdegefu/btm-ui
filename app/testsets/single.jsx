"use client";

import React, { useEffect, useState } from "react";
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
import { create_testset, get_testsets, update_testset } from "../actions";
import { useRouter } from "next/navigation";
import PaginagtionBottom from "../components/generic/pagination";
import { useUtilStore } from "../store/utilcommon";

export default function TestSetsTable({ test_sets }) {
  const router = useRouter();

  const [testsets, setTestsets] = useState([]);
  const [total, setTotal] = useState();
  const [sortColumn, setSortColumn] = useState("id");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const itemsPerPage = useUtilStore((state) => state.size);
  const currentPage = useUtilStore((state) => state.page);
  const refreshTrigor = useUtilStore((state) => state.refreshTrigor);
  useEffect(() => {
    const reload = async () => {
      const items = await get_testsets();
      setTestsets(items.testsets);
      setTotal(items.total);
    };
    reload();
  }, [itemsPerPage, currentPage, refreshTrigor]);

  const [newTestSet, setNewTestset] = useState({
    name: "",
    description: "",
  });

  // Filter testsets based on search term
  const filteredTestsets = testsets?.filter(
    (test) =>
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTestsetss = filteredTestsets?.slice(
    indexOfFirstItem,
    indexOfLastItem
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

  const handleNewTestChange = (e, field) => {
    setNewTestset({ ...newTestSet, [field]: e.target.value });
  };

  const handleAddNewTestset = async () => {
    if (newTestSet.description && newTestSet.name) {
      await create_testset(newTestSet);
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Test Sets</h1>
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
          <DialogContent className="max-w-full w-3/5">
            <DialogHeader>
              <DialogTitle>Add New Test Set</DialogTitle>
              <DialogDescription>
                Enter the details for the new test case.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddNewTestset}>
              <div className="grid gap-4 py-4">
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
                    className="col-span-3 min-h-[250px]"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  type="submit"
                >
                  Add Testset
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="overflow-x-auto pb-8">
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
                className="cursor-pointer w-3/12"
                onClick={() => handleSort("name")}
              >
                Name {<SortIcon column="name" />}
              </TableHead>
              <TableHead className="w-7/12">Description</TableHead>

              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTestsets.map((testset) => (
              <TestSetRow key={testset?.id} testset={testset} />
            ))}
          </TableBody>
        </Table>

        <PaginagtionBottom total_items={total} />
      </div>
    </div>
  );
}

function TestSetRow({ testset }) {
  const router = useRouter();
  const [testSet, setTestSet] = useState(testset);
  const [editingId, setEditingId] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    setEditingId(true);
  };

  const handleSave = async () => {
    console.log(testSet);
    await update_testset(testSet);
    router.refresh();
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(false);
  };

  const handleInputChange = (e, field) => {
    setTestSet({
      ...testSet,
      [field]: e.target.value,
    });
  };

  const handleDelete = () => {
    console.log(testSet.id);
  };

  return (
    <TableRow>
      <TableCell>{testset.id}</TableCell>
      <TableCell>
        {editingId ? (
          <Input
            value={testSet?.name}
            onChange={(e) => handleInputChange(e, "name")}
          />
        ) : (
          <Link href={`/testsets/${testset?.id}`}> {testset?.name} </Link>
        )}
      </TableCell>
      <TableCell>
        {editingId ? (
          <Textarea
            value={testSet.description}
            onChange={(e) => handleInputChange(e, "description")}
          />
        ) : (
          testset?.description
        )}
      </TableCell>

      <TableCell>
        {editingId ? (
          <div className="flex space-x-2">
            <form onSubmit={handleSave}>
              <Button
                variant="ghost"
                size="icon"
                // onClick={() => handleSave(testset?.id)}
              >
                <Check className="h-4 w-4" />
              </Button>
            </form>
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={handleEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setIsOpen(true)}
                  variant="ghost"
                  size="icon"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this test set? This action
                    cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleDelete}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}
