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
import { Edit, Plus, Check, X, Trash2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SingleUserStorySummary from "./summary";
import TipTapEditor from "@/app/components/generic/tiptap";
import {
  create_test,
  delete_test,
  get_requirement,
  get_requirements,
  get_requirementtests,
  get_test,
  update_requirement,
} from "@/app/actions";
import { PersonIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import PaginagtionBottom from "@/app/components/generic/pagination";
import { useUtilStore } from "@/app/store/utilcommon";

export default function SprintrequirementDetails({
  sprint_id,
  requirment_id,
  test_id,
}) {
  const [requirement, setRequirement] = useState();
  const [tests, setTests] = useState();
  const [editRequirement, setEditRequirement] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [newTest, setNewTest] = useState({
    name: "",
    description: "",
    requirement_id: requirment_id,
  });
  const [total, setTotal] = useState();

  const setRefreshTrigor = useUtilStore((state) => state.setRefreshTrigor);
  const refreshTrigor = useUtilStore((state) => state.refreshTrigor);
  const itemsPerPage = useUtilStore((state) => state.size);
  const currentPage = useUtilStore((state) => state.page);

  // single requirment loading effect
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await get_requirement(requirment_id);
        setRequirement(result);
        setEditRequirement(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };

    loadData();
  }, [get_requirements, requirment_id, refreshTrigor]);

  // use requirment tests loading effect
  useEffect(() => {
    const loadData = async () => {
      try {
        const tests = await get_requirementtests(requirment_id);

        setTests(tests?.tests);
        setTotal(tests?.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };

    loadData();
  }, [requirment_id, itemsPerPage, currentPage, refreshTrigor]);

  const initialUserStoryData = {
    title: "Implement user authentication",
    progress: 75,
    businessValue: 4,
    effort: 3,
    priority: "High",
    assignee: { name: "no one" },
  };

  const handleRequirementUpdate = async (e) => {
    e.preventDefault();
    // console.log(editRequirement);
    await update_requirement(editRequirement);
    setRefreshTrigor(!refreshTrigor);
    setIsEditing(false);
  };

  const handleTestAdd = async (e) => {
    e.preventDefault();
    console.log(newTest);
    await create_test(newTest);
    setRefreshTrigor(!refreshTrigor);
  };

  const handleTipTapEditorChange = (e) => {
    setEditRequirement({
      ...editRequirement,
      description: e,
    });
  };

  const descriptionChange = (e) => {
    setNewTest({ ...newTest, description: e });
  };
  const stepsChange = (e) => {
    setNewTest({ ...newTest, steps: e });
  };

  const resultChange = (e) => {
    setNewTest({ ...newTest, expected_result: e });
  };

  const handleRefresh = () => {
    setRefreshTrigor(!refreshTrigor);
  };
  return (
    <div className="container mx-auto space-y-10  p-4">
      <h1 className="text-2xl font-bold mb-4">Requirement Details</h1>
      {isEditing ? (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <form onSubmit={handleRequirementUpdate} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="sprintName"
                  className="text-sm font-medium text-gray-700"
                >
                  Requirment Name
                </Label>
                <Input
                  id="requirementName"
                  name="name"
                  value={editRequirement?.name}
                  onChange={(e) =>
                    setEditRequirement({
                      ...editRequirement,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter sprint name"
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <Label
                  htmlFor="requirementDescription"
                  className="text-sm font-medium text-gray-700"
                >
                  Description
                </Label>

                <TipTapEditor
                  inital_value={editRequirement?.description}
                  onChange={handleTipTapEditorChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="assigned_to"
                    className="text-sm font-medium text-gray-700"
                  >
                    Assigned To
                  </Label>
                  <Select
                    id="assigned_to"
                    name="assigned_to"
                    value={editRequirement?.assigned_to}
                    onValueChange={(value) =>
                      setEditRequirement({
                        ...editRequirement,
                        assigned_to: value,
                      })
                    }
                  >
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="assigned too" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="qat">QA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Card className="relative mb-8 overflow-hidden">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">
                {requirement?.name}
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  size="sm"
                  className="text-emerald-600 border-emerald-600 hover:bg-emerald-50"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* <p className="text-gray-600">{sprint.description}</p> */}
              <TipTapEditor inital_value={requirement?.description} />
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <PersonIcon className="w-5 h-5 mr-2 text-gray-400" />
                  <span>
                    Assigned To: {requirement?.assigned_to || "Not set"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Separator className="my-4" />

      <Tabs defaultValue="tests" className="w-full">
        <TabsList className="flex w-full overflow-x-auto whitespace-nowrap">
          <TabsTrigger className="flex-1 text-center" value="tests">
            Tests
          </TabsTrigger>
          <TabsTrigger className="flex-1 text-center" value="purpose">
            Purpose
          </TabsTrigger>
          <TabsTrigger className="flex-1 text-center" value="summary">
            Summary
          </TabsTrigger>
          <TabsTrigger className="flex-1 text-center" value="documents">
            Documents
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tests">
          <br />
          <h3 className="text-xl px-16 font-semibold mb-4">Tests</h3>
          <Dialog>
            <DialogTrigger className="flex w-full" asChild>
              <div className="flex w-full justify-end">
                <Button className="w-6/12  md:w-4/12 lg:w-3/12 bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Plus className="mr-2 h-4 w-4" /> Add New Test
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-full w-3/5">
              <form onSubmit={handleTestAdd} className="mt-4 space-y-4">
                <DialogHeader>
                  <DialogTitle className="">Add New Test</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new Test.
                  </DialogDescription>
                </DialogHeader>

                <div className="w-full  space-y-5 shadow-2xl p-5 rounded-3xl">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      name="name"
                      value={newTest.name}
                      onChange={(e) =>
                        setNewTest({ ...newTest, name: e.target.value })
                      }
                      placeholder="New Test Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <TipTapEditor
                      name="description"
                      initialValue={newTest?.description}
                      onChange={descriptionChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="steps">Steps</Label>
                    <TipTapEditor
                      name="steps"
                      initialValue={newTest?.steps}
                      onChange={stepsChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expected_result">Expected Result</Label>
                    <TipTapEditor
                      name="expected_result"
                      initialValue={newTest?.expected_result}
                      onChange={resultChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Add Test
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="justify-center items-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tests?.map((test) => (
                <RequirementTestRow
                  key={"rei test d" + test?.id}
                  test={test}
                  sprint_id={sprint_id}
                  requirment_id={requirment_id}
                />
              ))}
            </TableBody>
          </Table>
          <PaginagtionBottom total_items={total} />
        </TabsContent>
        <TabsContent value="purpose">
          <PurposeViewEdit
            value={requirement?.purpose}
            requirment_id={requirement?.id}
            refreshTrigor={handleRefresh}
          />
        </TabsContent>
        <TabsContent value="summary">
          <br />
          <h3 className="text-xl font-semibold px-16 mb-4">Summary</h3>
          <SingleUserStorySummary
            initialData={initialUserStoryData}
            teamMembers={null}
          />
        </TabsContent>
        <TabsContent value="documents"></TabsContent>
      </Tabs>
    </div>
  );
}

export function RequirementTestRow({ test, requirment_id, sprint_id }) {
  const [isOpen, setIsOpen] = useState(false);
  const setRefreshTrigor = useUtilStore((state) => state.setRefreshTrigor);

  const handleTestDelete = async () => {
    await delete_test(test?.id);
    setRefreshTrigor();
  };

  return (
    <>
      <TableRow key={test.id}>
        <TableCell>{test.id}</TableCell>
        <TableCell className="w-8/12">
          <Link
            href={`/sprints/${sprint_id}/requirements/${requirment_id}/tests/${test?.id}`}
          >
            {test?.name}
          </Link>
        </TableCell>
        <TableCell>
          <div className="flex space-x-2 justify-center items-center">
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
                    Are you sure you want to delete this test? This action
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
                    onClick={handleTestDelete}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}

export function PurposeViewEdit({ value, requirment_id, refreshTrigor }) {
  const [isEditing, setIsEditing] = useState(false);
  const [purpose, setPurpose] = useState(value);
  const [tempPurpose, setTempPurpose] = useState({ purpose: value });

  const handleTipTapEditorChange = (e) => {
    setTempPurpose({
      ...tempPurpose,
      purpose: e,
    });
  };

  const updatePurpose = async () => {
    await update_requirement({ ...tempPurpose, id: requirment_id });
    if (refreshTrigor) {
      refreshTrigor();
    }
  };

  const handleCancel = () => {
    // setTempPurpose(purpose);
    setIsEditing(false);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative w-4/5 shadow-2xl border-2 p-5">
        {isEditing ? (
          <>
            <form onSubmit={updatePurpose}>
              <TipTapEditor
                name="purpose"
                inital_value={tempPurpose.purpose}
                onChange={handleTipTapEditorChange}
              />
              <div className="mt-2 flex justify-end space-x-2">
                <Button size="sm" type="submit">
                  <Check className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="w-full p-5 m-5">
              <TipTapEditor inital_value={purpose} />
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-0 right-0"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function ReviewNotesViewEdit({ value }) {
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState(value);
  const [tempNote, setTempNote] = useState(value);

  const handleSave = () => {
    setNote(tempNote);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempNote(note);
    setIsEditing(false);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative shadow-2xl w-4/5 border-2 p-5">
        {isEditing ? (
          <>
            <TipTapEditor
              name="purpose"
              inital_value={tempNote}
              onChange={setTempNote}
            />
            <div className="mt-2 flex justify-end space-x-2">
              <Button size="sm" onClick={handleSave}>
                <Check className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <TipTapEditor inital_value={note} />
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-0 right-0"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
