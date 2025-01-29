"use client";

import { useEffect, useState } from "react";
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
import {
  create_issue,
  delete_issue,
  get_issues,
  update_issue,
} from "../actions";
import { useUtilStore } from "../store/utilcommon";
import PaginagtionBottom from "../components/generic/pagination";

// Sample issues data
const initialIssues = [
  {
    id: "ISSUE001",
    name: "Login button not working",
    description: "Users unable to log in due to non-responsive login button",
    status: "Open",
    sevierity: "High",
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
  const [issues, setIssues] = useState();
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [editingId, setEditingId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [newIssue, setNewIssue] = useState({
    issue_name: "",
    issue_description: "",
    issue_status: "Open",
    test_run_id: 0,
    test_instance_id: 0,
  });

  const [total, setTotal] = useState();
  const itemsPerPage = useUtilStore((state) => state.size);
  const currentPage = useUtilStore((state) => state.page);
  const refreshTrigor = useUtilStore((state) => state.refreshTrigor);

  useEffect(() => {
    const reload = async () => {
      const items = await get_issues();
      setIssues(items?.issues);
      setTotal(items.total);
    };
    reload();
  }, [itemsPerPage, currentPage, refreshTrigor]);

  const sortedIssues = issues
    ? [...issues].sort((a, b) => {
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

  const handleNewIssueChange = (field, value) => {
    setNewIssue({ ...newIssue, [field]: value });
  };

  const handleAddNewIssue = async () => {
    console.log(newIssue);
    if (
      newIssue.issue_description &&
      newIssue.issue_name &&
      newIssue.issue_status
    ) {
      await create_issue(newIssue);
      setNewIssue({
        issue_name: "",
        issue_description: "",
        issue_status: "Open",
        test_run_id: 0,
        test_instance_id: 0,
      });
      setIsOpen(false);
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
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="mr-2 h-4 w-4" /> Add New Issue
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-full w-3/5">
            <DialogHeader>
              <DialogTitle>Add New Issue</DialogTitle>
              <DialogDescription>
                Enter the details for the new issue.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newIssue.name}
                  onChange={(e) =>
                    handleNewIssueChange("issue_name", e.target.value)
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Test Run ID
                </Label>
                <Input
                  id="test_run_id"
                  type="number"
                  min="0"
                  value={newIssue?.test_run_id}
                  onChange={(e) =>
                    handleNewIssueChange("test_run_id", e.target.value)
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Test Instance ID
                </Label>
                <Input
                  id="test_run_id"
                  type="number"
                  min="0"
                  value={newIssue?.test_instance_id}
                  onChange={(e) =>
                    handleNewIssueChange("test_instance_id", e.target.value)
                  }
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
                    handleNewIssueChange("issue_description", e.target.value)
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
                    handleNewIssueChange("issue_status", value)
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
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={handleAddNewIssue}
              >
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
                Test Run ID {<SortIcon column="severity" />}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("assignedTo")}
              >
                Test Instance ID {<SortIcon column="assignedTo" />}
              </TableHead>

              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedIssues.map((issue) => (
              <IssueRow key={issue.id} issue={issue} />
            ))}
          </TableBody>
        </Table>

        <PaginagtionBottom total_items={total} />
      </div>
    </div>
  );
}

function IssueRow({ issue }) {
  const [editingId, setEditingId] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editIssue, setEditIssue] = useState(issue);
  const setRefreshTrigor = useUtilStore((state) => state.setRefreshTrigor);

  const handleSave = async () => {
    await update_issue(editIssue);
    setRefreshTrigor();
    setEditingId(false);
  };

  const handleDelete = async () => {
    await delete_issue(issue.id);
    setRefreshTrigor();
  };

  return (
    <TableRow>
      <TableCell>{issue?.id}</TableCell>
      <TableCell>
        {editingId ? (
          <Input
            value={editIssue?.issue_name}
            onChange={(e) =>
              setEditIssue({ ...editIssue, issue_name: e.target.value })
            }
          />
        ) : (
          issue?.issue_name
        )}
      </TableCell>
      <TableCell>
        {editingId ? (
          <Input
            value={editIssue?.issue_description}
            onChange={(e) =>
              setEditIssue({ ...editIssue, issue_description: e.target.value })
            }
          />
        ) : (
          issue?.issue_description
        )}
      </TableCell>
      <TableCell>
        {editingId ? (
          <Select
            value={editIssue?.issue_status}
            onValueChange={(value) =>
              setEditIssue({ ...editIssue, issue_status: value })
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
          <Badge className={`${statusColors[issue?.issue_status]}`}>
            {issue?.issue_status}
          </Badge>
        )}
      </TableCell>

      <TableCell>
        {editingId ? (
          <Input
            id="test_run_id"
            type="number"
            min="0"
            value={editIssue?.test_run_id}
            onChange={(e) =>
              setEditIssue({ ...editIssue, test_run_id: e.target.value })
            }
            className="col-span-3"
          />
        ) : (
          issue?.test_run_id
        )}
      </TableCell>
      <TableCell>
        {editingId ? (
          <Input
            id="test_instance_id"
            type="number"
            min="0"
            value={editIssue?.test_instance_id}
            onChange={(e) =>
              setEditIssue({ ...editIssue, test_instance_id: e.target.value })
            }
            className="col-span-3"
          />
        ) : (
          issue?.test_instance_id
        )}
      </TableCell>
      <TableCell>
        {editingId ? (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              type="submit"
              onClick={handleSave}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditingId(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditingId(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this issue? This action
                    cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    type="submit"
                    onClick={handleDelete}
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
  );
}
