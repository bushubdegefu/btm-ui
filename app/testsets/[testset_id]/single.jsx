"use client";

import {
  create_batch_testinstance,
  delete_testinstance,
  get_drop_tests,
  get_testsettestinstances,
  update_testinstance,
} from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BookDashed,
  Check,
  ChevronDown,
  ChevronUp,
  Edit,
  Plus,
  Search,
  Trash2,
  View,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import TestSetDashboard from "./dashboard";
import { CheckboxReactHookFormMultiple } from "./testselect";

import PaginagtionBottom from "@/app/components/generic/pagination";
import { useUtilStore } from "@/app/store/utilcommon";
import Link from "next/link";
import CreateRun from "./run";

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

export default function TestSetDetails({ testset_id }) {
  const [testSetInstance, setTestSetInstances] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  const [addView, setAddView] = useState(false);
  const [dashView, setDashView] = useState(false);

  const sortedTestInstances = [...testSetInstance].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const [total, setTotal] = useState();
  const itemsPerPage = useUtilStore((state) => state.size);
  const currentPage = useUtilStore((state) => state.page);
  const refreshTrigor = useUtilStore((state) => state.refreshTrigor);

  useEffect(() => {
    const reload = async () => {
      const items = await get_testsettestinstances(testset_id);
      console.log(items);
      setTestSetInstances(items?.testsettests);
      setTotal(items.total);
    };
    reload();
  }, [itemsPerPage, currentPage, refreshTrigor]);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Filter testSetInstance based on search term
  const testInstances = testSetInstance.filter(
    (test) =>
      test?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test?.steps.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInstances = testInstances.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const SortIcon = ({ column }) => {
    if (column !== sortColumn) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  };

  const handleInputChange = (e, id, field) => {
    setTestSetRuns(
      testSetInstance.map((run) =>
        run.id === id ? { ...run, [field]: e.target.value } : run
      )
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Test Instances</h1>{" "}
      <Button
        variant="light"
        className="bg-zinc-100 border-2"
        onClick={() => setDashView(!dashView)}
      >
        <BookDashed className="mr-2 h-4 w-4" /> Dash Board
      </Button>
      <div
        className={
          dashView ? "mb-4 flex justify-between items-center" : "hidden"
        }
      >
        <TestSetDashboard />
      </div>
      <div className="p-5 mb-4 flex justify-between items-center">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search test set runs..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <Button
          onClick={() => setAddView(!addView)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Test Instance{" "}
        </Button>
      </div>
      <Dialog
        className="bg-white"
        open={addView}
        onOpenChange={() => setAddView(!addView)}
      >
        <DialogContent className="max-w-full w-3/5">
          <DialogHeader>
            <DialogTitle>Add Test Instance to Test set</DialogTitle>
          </DialogHeader>
          <div className="p-5 rounded-xl shadow-2xl max-h-96 overflow-y-auto">
            <AddTestInstance testset_id={testset_id} view={setAddView} />
          </div>
        </DialogContent>
      </Dialog>
      <div className="overflow-x-auto py-8">
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
                onClick={() => handleSort("test_name")}
              >
                Test Name {<SortIcon column="test_name" />}
              </TableHead>
              <TableHead>Test Steps</TableHead>
              <TableHead>Expected Result</TableHead>

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
            {sortedTestInstances?.map((instance) => (
              <TestInstancesRow
                key={instance.id}
                test_instances={instance}
                testset_id={testset_id}
              />
            ))}
          </TableBody>
        </Table>

        <PaginagtionBottom total_items={total} />
      </div>
    </div>
  );
}

function AddTestInstance({ testset_id, view }) {
  const [items, setItems] = useState();
  const [testInstance, setTestInstance] = useState({
    testset_id: testset_id,
    test_ids: [],
    severity: "Low",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await get_drop_tests();
        setItems(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };

    loadData();
  }, [get_drop_tests]);
  const handleTestInstanceChange = (name, value) => {
    setTestInstance({
      ...testInstance,
      [name]: value,
    });
  };

  const handleAddInstances = async (e) => {
    e.preventDefault();
    await create_batch_testinstance(testInstance);
    view(false);
    setTestInstance({
      testset_id: testset_id,
      test_ids: [],
      severity: "Low",
    });
    // console.log(testInstance);
  };

  const handleTestInstanceCheck = (value) => {
    setTestInstance((prevState) => ({
      ...prevState, // Preserve the other properties
      test_ids: prevState.test_ids.includes(value)
        ? prevState.test_ids.filter((item) => item !== value) // Remove if already selected
        : [...prevState.test_ids, value], // Otherwise, add the value
    }));
  };

  return (
    <div className="flex flex-col space-y-2 items-end justify-end w-full">
      <div className="flex flex-row w-6/12 justify-end">
        <div className="w-4/12 p-2">
          <Label htmlFor="severity" className="text-right">
            Severity
          </Label>
        </div>
        <div className="w-8/12 p-2">
          <Select
            value={testInstance?.severity}
            onValueChange={(value) =>
              handleTestInstanceChange("severity", value)
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
      <CheckboxReactHookFormMultiple
        items={items}
        options={testInstance?.options}
        onChange={handleTestInstanceCheck}
      />
      <div className="flex flex-row w-full items-end justify-end space-x-2">
        <Button
          variant="outline"
          className="my-8 mx-2"
          onClick={() => view(false)}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          onSubmit={handleAddInstances}
          className="bg-emerald-600 my-8 mx-2 hover:bg-emerald-700 text-white"
        >
          Add Instances
        </Button>
      </div>
    </div>
  );
}

function TestInstancesRow({ test_instances, testset_id }) {
  const [editingId, setEditingId] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [testEditInstance, setTestEditInstance] = useState({
    id: test_instances.id,
    severity: test_instances?.severity,
  });
  const setRefreshTrigor = useUtilStore((state) => state.setRefreshTrigor);

  const handleEdit = (id) => {
    setEditingId(true);
  };

  const updateInstance = async (e) => {
    e.preventDefault();
    console.log(testEditInstance);
    await update_testinstance(testEditInstance);
    setEditingId(false);
    setRefreshTrigor();
  };

  const handleCancel = () => {
    setEditingId(false);
  };

  const handleSeverityChange = (e, field) => {
    setTestEditInstance({ ...testEditInstance, [field]: e });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await delete_testinstance(test_instances?.id);
    setIsOpen(!isOpen);
    setRefreshTrigor();
  };

  return (
    <>
      <TableRow>
        <TableCell>{test_instances?.id}</TableCell>
        <TableCell>{test_instances?.name}</TableCell>
        <TableCell className="whitespace-pre-line">
          {test_instances?.steps}
        </TableCell>
        <TableCell>{test_instances?.expected_result}</TableCell>
        <TableCell>
          {editingId ? (
            <Select
              value={testEditInstance?.severity}
              onValueChange={(e) => handleSeverityChange(e, "severity")}
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
            <Badge className={`${severityColors[test_instances?.severity]}`}>
              {test_instances?.severity}
            </Badge>
          )}
        </TableCell>
        <TableCell>
          {editingId ? (
            <div className="flex space-x-2">
              <form onSubmit={updateInstance}>
                <Button variant="ghost" size="icon" type="submit">
                  <Check className="h-4 w-4" />
                </Button>
              </form>
              <Button variant="ghost" size="icon" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <CreateRun test_instance_id={test_instances.id} />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(test_instances?.id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={null}>
                <Link
                  href={`/testsets/${testset_id}/runs/${test_instances?.id}`}
                >
                  <View className="h-4 w-4" />
                </Link>
              </Button>
              <Dialog open={isOpen} onClose={() => setIsOpen(!isOpen)}>
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
                      Are you sure you want to delete this test run? This action
                      cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <form onSubmit={handleDelete}>
                      <Button variant="destructive" type="submit">
                        Delete
                      </Button>
                    </form>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
