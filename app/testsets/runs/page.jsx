"use client";

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import {
//   Search,
//   ChevronDown,
//   ChevronUp,
//   Edit,
//   Trash2,
//   Play,
// } from "lucide-react";

// Sample test set runs data
// const testSetRuns = [
//   {
//     id: 1,
//     test_id: "TEST001",
//     test_name: "User Login",
//     test_steps:
//       "1. Navigate to login page\n2. Enter valid credentials\n3. Click login button",
//     expected_result: "User should be logged in and redirected to dashboard",
//     result: "User successfully logged in and redirected",
//     run_status: "Passed",
//     severity: "High",
//   },
//   {
//     id: 2,
//     test_id: "TEST002",
//     test_name: "Password Reset",
//     test_steps:
//       "1. Click 'Forgot Password'\n2. Enter email\n3. Click 'Reset Password'\n4. Check email for reset link",
//     expected_result: "User should receive password reset email",
//     result: "Reset email not received",
//     run_status: "Failed",
//     severity: "Critical",
//   },
//   {
//     id: 3,
//     test_id: "TEST003",
//     test_name: "Create New Project",
//     test_steps:
//       "1. Click 'New Project'\n2. Fill in project details\n3. Click 'Create'",
//     expected_result:
//       "New project should be created and visible in project list",
//     result: "Test in progress",
//     run_status: "InProgress",
//     severity: "Medium",
//   },
//   {
//     id: 4,
//     test_id: "TEST004",
//     test_name: "Generate Report",
//     test_steps:
//       "1. Navigate to Reports\n2. Select report type\n3. Set date range\n4. Click 'Generate'",
//     expected_result: "Report should be generated and downloadable",
//     result: "Unable to access Reports module",
//     run_status: "Blocked",
//     severity: "Low",
//   },
//   {
//     id: 5,
//     test_id: "TEST005",
//     test_name: "User Logout",
//     test_steps: "1. Click user profile\n2. Select 'Logout'\n3. Confirm logout",
//     expected_result: "User should be logged out and redirected to login page",
//     result: "Not applicable for this run",
//     run_status: "NA",
//     severity: "High",
//   },
// ];

// const severityColors = {
//   Critical: "bg-red-100 text-red-800",
//   High: "bg-orange-100 text-orange-800",
//   Medium: "bg-yellow-100 text-yellow-800",
//   Low: "bg-green-100 text-green-800",
// };

// const runStatusColors = {
//   NA: "bg-gray-100 text-gray-800",
//   NR: "bg-gray-100 text-gray-800",
//   Blocked: "bg-purple-100 text-purple-800",
//   Passed: "bg-green-100 text-green-800",
//   Failed: "bg-red-100 text-red-800",
//   InProgress: "bg-blue-100 text-blue-800",
// };

// export default function TestSetRunsTable() {
//   const [sortColumn, setSortColumn] = useState("id");
//   const [sortDirection, setSortDirection] = useState("asc");

//   const sortedTestSetRuns = [...testSetRuns].sort((a, b) => {
//     if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
//     if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
//     return 0;
//   });

//   const handleSort = (column) => {
//     if (column === sortColumn) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortColumn(column);
//       setSortDirection("asc");
//     }
//   };

//   const SortIcon = ({ column }) => {
//     if (column !== sortColumn) return null;
//     return sortDirection === "asc" ? (
//       <ChevronUp className="ml-2 h-4 w-4" />
//     ) : (
//       <ChevronDown className="ml-2 h-4 w-4" />
//     );
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Test Set Runs</h1>
//       <div className="mb-4 flex justify-between items-center">
//         <div className="relative w-64">
//           <Input
//             type="text"
//             placeholder="Search test set runs..."
//             className="pl-10"
//           />
//           <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//         </div>
//         <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
//           <Play className="mr-2 h-4 w-4" /> Start New Run
//         </Button>
//       </div>
//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead
//                 className="w-[80px] cursor-pointer"
//                 onClick={() => handleSort("id")}
//               >
//                 ID {<SortIcon column="id" />}
//               </TableHead>
//               <TableHead
//                 className="cursor-pointer"
//                 onClick={() => handleSort("test_id")}
//               >
//                 Test ID {<SortIcon column="test_id" />}
//               </TableHead>
//               <TableHead
//                 className="cursor-pointer"
//                 onClick={() => handleSort("test_name")}
//               >
//                 Test Name {<SortIcon column="test_name" />}
//               </TableHead>
//               <TableHead>Test Steps</TableHead>
//               <TableHead>Expected Result</TableHead>
//               <TableHead>Result</TableHead>
//               <TableHead
//                 className="cursor-pointer"
//                 onClick={() => handleSort("run_status")}
//               >
//                 Run Status {<SortIcon column="run_status" />}
//               </TableHead>
//               <TableHead
//                 className="cursor-pointer"
//                 onClick={() => handleSort("severity")}
//               >
//                 Severity {<SortIcon column="severity" />}
//               </TableHead>
//               <TableHead className="w-[100px]">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {sortedTestSetRuns.map((run) => (
//               <TableRow key={run.id}>
//                 <TableCell>{run.id}</TableCell>
//                 <TableCell>{run.test_id}</TableCell>
//                 <TableCell>{run.test_name}</TableCell>
//                 <TableCell className="whitespace-pre-line">
//                   {run.test_steps}
//                 </TableCell>
//                 <TableCell>{run.expected_result}</TableCell>
//                 <TableCell>{run.result}</TableCell>
//                 <TableCell>
//                   <Badge className={`${runStatusColors[run.run_status]}`}>
//                     {run.run_status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>
//                   <Badge className={`${severityColors[run.severity]}`}>
//                     {run.severity}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex space-x-2">
//                     <Button variant="ghost" size="icon">
//                       <Edit className="h-4 w-4" />
//                     </Button>
//                     <Button variant="ghost" size="icon">
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }

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
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Play,
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
import { Textarea } from "@/components/ui/textarea";
import TestSetDashboard from "./dashboard";

// Sample test set runs data
const initialTestSetRuns = [
  {
    id: 1,
    test_id: "TEST001",
    test_name: "User Login",
    test_steps:
      "1. Navigate to login page\n2. Enter valid credentials\n3. Click login button",
    expected_result: "User should be logged in and redirected to dashboard",
    result: "User successfully logged in and redirected",
    run_status: "Passed",
    severity: "High",
  },
  {
    id: 2,
    test_id: "TEST002",
    test_name: "Password Reset",
    test_steps:
      "1. Click 'Forgot Password'\n2. Enter email\n3. Click 'Reset Password'\n4. Check email for reset link",
    expected_result: "User should receive password reset email",
    result: "Reset email not received",
    run_status: "Failed",
    severity: "Critical",
  },
  {
    id: 3,
    test_id: "TEST003",
    test_name: "Create New Project",
    test_steps:
      "1. Click 'New Project'\n2. Fill in project details\n3. Click 'Create'",
    expected_result:
      "New project should be created and visible in project list",
    result: "Test in progress",
    run_status: "InProgress",
    severity: "Medium",
  },
  {
    id: 4,
    test_id: "TEST004",
    test_name: "Generate Report",
    test_steps:
      "1. Navigate to Reports\n2. Select report type\n3. Set date range\n4. Click 'Generate'",
    expected_result: "Report should be generated and downloadable",
    result: "Unable to access Reports module",
    run_status: "Blocked",
    severity: "Low",
  },
  {
    id: 5,
    test_id: "TEST005",
    test_name: "User Logout",
    test_steps: "1. Click user profile\n2. Select 'Logout'\n3. Confirm logout",
    expected_result: "User should be logged out and redirected to login page",
    result: "Not applicable for this run",
    run_status: "NA",
    severity: "High",
  },
];

const severityColors = {
  Critical: "bg-red-100 text-red-800",
  High: "bg-orange-100 text-orange-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800",
};

const runStatusColors = {
  NA: "bg-gray-100 text-gray-800",
  NR: "bg-gray-100 text-gray-800",
  Blocked: "bg-purple-100 text-purple-800",
  Passed: "bg-green-100 text-green-800",
  Failed: "bg-red-100 text-red-800",
  InProgress: "bg-blue-100 text-blue-800",
};

export default function TestSetRunsTable() {
  const [testSetRuns, setTestSetRuns] = useState(initialTestSetRuns);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [editingId, setEditingId] = useState(null);
  const [newRun, setNewRun] = useState({
    id: "",
    test_id: "",
    test_name: "",
    test_steps: "",
    expected_result: "",
    result: "",
    run_status: "InProgress",
    severity: "Medium",
  });

  const sortedTestSetRuns = [...testSetRuns].sort((a, b) => {
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

  // Filter testSetRuns based on search term
  const filteredRuns = testSetRuns.filter(
    (test) =>
      test.test_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.run_status.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRuns = filteredRuns.slice(indexOfFirstItem, indexOfLastItem);

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
    setTestSetRuns(testSetRuns.filter((run) => run.id !== id));
  };

  const handleInputChange = (e, id, field) => {
    setTestSetRuns(
      testSetRuns.map((run) =>
        run.id === id ? { ...run, [field]: e.target.value } : run,
      ),
    );
  };

  const handleNewRunChange = (field, value) => {
    setNewRun({ ...newRun, [field]: value });
  };

  const handleAddNewRun = () => {
    if (newRun.test_id && newRun.test_name) {
      setTestSetRuns([
        ...testSetRuns,
        { ...newRun, id: testSetRuns.length + 1 },
      ]);
      setNewRun({
        id: "",
        test_id: "",
        test_name: "",
        test_steps: "",
        expected_result: "",
        result: "",
        run_status: "InProgress",
        severity: "Medium",
      });
    }
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Test Set Runs</h1>
      <div className="mb-4 flex justify-between items-center">
        <TestSetDashboard />
      </div>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search test set runs..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Play className="mr-2 h-4 w-4" /> Start New Run
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Start New Run</DialogTitle>
              <DialogDescription>
                Enter the details for the new test run.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="test_id" className="text-right">
                  Test ID
                </Label>
                <Input
                  id="test_id"
                  value={newRun.test_id}
                  onChange={(e) =>
                    handleNewRunChange("test_id", e.target.value)
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="test_name" className="text-right">
                  Test Name
                </Label>
                <Input
                  id="test_name"
                  value={newRun.test_name}
                  onChange={(e) =>
                    handleNewRunChange("test_name", e.target.value)
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="test_steps" className="text-right">
                  Test Steps
                </Label>
                <Textarea
                  id="test_steps"
                  value={newRun.test_steps}
                  onChange={(e) =>
                    handleNewRunChange("test_steps", e.target.value)
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expected_result" className="text-right">
                  Expected Result
                </Label>
                <Textarea
                  id="expected_result"
                  value={newRun.expected_result}
                  onChange={(e) =>
                    handleNewRunChange("expected_result", e.target.value)
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="severity" className="text-right">
                  Severity
                </Label>
                <Select
                  value={newRun.severity}
                  onValueChange={(value) =>
                    handleNewRunChange("severity", value)
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
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddNewRun}>
                Start Run
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
                className="w-[80px] cursor-pointer"
                onClick={() => handleSort("id")}
              >
                ID {<SortIcon column="id" />}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("test_id")}
              >
                Test ID {<SortIcon column="test_id" />}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("test_name")}
              >
                Test Name {<SortIcon column="test_name" />}
              </TableHead>
              <TableHead>Test Steps</TableHead>
              <TableHead>Expected Result</TableHead>
              <TableHead>Result</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("run_status")}
              >
                Run Status {<SortIcon column="run_status" />}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("severity")}
              >
                Severity {<SortIcon column="severity" />}
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTestSetRuns.map((run) => (
              <TableRow key={run.id}>
                <TableCell>{run.id}</TableCell>
                <TableCell>{run.test_id}</TableCell>
                <TableCell>{run.test_name}</TableCell>
                <TableCell className="whitespace-pre-line">
                  {run.test_steps}
                </TableCell>
                <TableCell>{run.expected_result}</TableCell>
                <TableCell>
                  {editingId === run.id ? (
                    <Textarea
                      value={run.result}
                      onChange={(e) => handleInputChange(e, run.id, "result")}
                    />
                  ) : (
                    run.result
                  )}
                </TableCell>
                <TableCell>
                  {editingId === run.id ? (
                    <Select
                      value={run.run_status}
                      onValueChange={(value) =>
                        handleInputChange(
                          { target: { value } },
                          run.id,
                          "run_status",
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NA">NA</SelectItem>
                        <SelectItem value="NR">NR</SelectItem>
                        <SelectItem value="Blocked">Blocked</SelectItem>
                        <SelectItem value="Passed">Passed</SelectItem>
                        <SelectItem value="Failed">Failed</SelectItem>
                        <SelectItem value="InProgress">In Progress</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge className={`${runStatusColors[run.run_status]}`}>
                      {run.run_status}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === run.id ? (
                    <Select
                      value={run.severity}
                      onValueChange={(value) =>
                        handleInputChange(
                          { target: { value } },
                          run.id,
                          "severity",
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge className={`${severityColors[run.severity]}`}>
                      {run.severity}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === run.id ? (
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSave(run.id)}
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
                        onClick={() => handleEdit(run.id)}
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
                              Are you sure you want to delete this test run?
                              This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => {}}>
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleDelete(run.id)}
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
            <span>{`Page ${currentPage} of ${Math.ceil(filteredRuns.length / itemsPerPage)}`}</span>
            <Button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(filteredRuns.length / itemsPerPage)
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
