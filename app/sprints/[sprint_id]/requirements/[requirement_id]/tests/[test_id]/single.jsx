"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Plus,
  Check,
  X,
  PlusIcon,
  XIcon,
  Trash2,
  CalendarIcon,
  ClockIcon,
  Trash,
  Trash2Icon,
  ActivityIcon,
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
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  QuillContentRenderer,
  QuillEditor,
} from "@/app/components/generic/editor";

// import {
//   updateSprint,
//   deleteSprint,
//   updateRequirement,
//   addRequirement,
//   deleteRequirement,
// } from "./actions";

const initialSprint = {
  id: 1,
  name: "Test 1",
  description: `<p><strong>User Login &amp; Session Management</strong></p><p><strong>User Login:</strong></p><ul><li>Implement user authentication (email and password).</li><li>Add validation for required fields and format checks (e.g., valid email).</li><li>Implement password encryption and secure login.</li><li>Allow "Forgot Password" functionality.</li><li>Implement error messages for incorrect credentials.</li></ul><p><strong>Session Management:</strong></p><ul><li>Create session tokens for logged-in users.</li><li>Implement session timeout and auto logout after inactivity.</li><li>Ensure that session persists across page reloads using cookies or local storage.</li><li>Implement the "Remember Me" feature.</li><li>Handle session expiration and redirect to login page.</li></ul><p><strong>Security &amp; Privacy:</strong></p><ul><li>Implement CAPTCHA on login page to prevent brute-force attacks.</li><li>Ensure secure password storage using hashing algorithms (e.g., bcrypt).</li><li>Add two-factor authentication (2FA) option for users.</li><li>Perform security testing for login vulnerabilities (SQL injection, XSS, etc.).</li><li><strong>Testing &amp; Bug Fixes:</strong></li><li>Write unit tests for login functionality.</li><li>Test session management across different browsers and devices.</li><li>Fix any identified bugs from previous sprints related to login or session handling.</li></ul><p><strong>UI/UX Enhancements:</strong></p><ul><li>Design user-friendly login interface.</li><li>Display success and error messages clearly on the login screen.</li><li>Optimize login page for mobile responsiveness.</li></ul><p><br></p>`,
  runs: [
    { id: "1", name: "Run 1", description: "Description 1" },
    { id: "2", name: "Run 2", description: "Description 2" },
    { id: "3", name: "Run 3", description: "Description 3" },
  ],
};

export default function SprintRequirementTestDetails({
  sprint_id,
  requirement_id,
  test_id,
}) {
  const [test, setTest] = useState(initialSprint);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRun, setEditedRun] = useState(test);
  const [newRun, setNewRun] = useState({
    name: "",
    description: "",
  });

  const handleEdit = (test) => {
    // setEditedRun(requirement);
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(editForm);
  };

  const handleRequirementUpdate = async (e) => {
    e.preventDefault();

    setIsEditing(false);
  };

  const handleRequirementDelete = async () => {
    // Redirect to sprints list or show a message
  };

  const handleTestUpdate = async (test) => {};

  const handleTestAdd = (e) => {
    e.preventDefault();

    console.log(newRun);
    // setNewRun({ name: "", description: "" });
  };

  const handleTestDelete = async (testId) => {};

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEditorChange = (e) => {
    setNewRun({
      ...newRun,
      description: e,
    });
  };
  const handleInlineEditorChange = (e) => {
    setEditedRun({
      ...editedRun,
      description: e,
    });
  };
  return (
    <div className="container mx-auto space-y-10  p-4">
      <h1 className="text-2xl font-bold mb-4">Test Details</h1>
      {isEditing ? (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <form onSubmit={handleRequirementUpdate} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="sprintName"
                  className="text-sm font-medium text-gray-700"
                >
                  Test Name
                </Label>
                <Input
                  id="requirementName"
                  name="name"
                  value={test?.name}
                  onChange={(e) => setTest({ ...test, name: e.target.value })}
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
                {/* <Textarea
                  id="sprintDescription"
                  value={sprint.description}
                  onChange={(e) =>
                    setSprint({ ...sprint, description: e.target.value })
                  }
                  placeholder="Enter sprint description"
                  className="mt-1 block w-full"
                  rows={4}
                /> */}
                <QuillEditor
                  name="exist-description"
                  initialValue={editedRun?.description}
                  onChange={handleInlineEditorChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="startDate"
                    className="text-sm font-medium text-gray-700"
                  >
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={test?.startDate}
                    onChange={(e) =>
                      setTest({
                        ...test,
                        startDate: e.target.value,
                      })
                    }
                    className="mt-1 block w-full"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="duration"
                    className="text-sm font-medium text-gray-700"
                  >
                    Duration (days)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    value={test?.duration}
                    onChange={(e) =>
                      setSprint({
                        ...test,
                        duration: parseInt(e.target.value),
                      })
                    }
                    min="1"
                    className="mt-1 block w-full"
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="status"
                  className="text-sm font-medium text-gray-700"
                >
                  Status
                </Label>
                <Select
                  id="status"
                  value={test?.status}
                  onValueChange={(value) =>
                    setSprint({ ...test, status: value })
                  }
                >
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select sprint status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
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
              <CardTitle className="text-2xl font-bold">{test?.name}</CardTitle>
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
                <Button
                  onClick={handleRequirementDelete}
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <Trash2Icon className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* <p className="text-gray-600">{sprint.description}</p> */}
              <QuillContentRenderer content={test?.description} />
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-gray-400" />
                  <span>Start: {test?.startDate || "Not set"}</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 mr-2 text-gray-400" />
                  <span>
                    Duration:{" "}
                    {test?.duration ? `${test?.duration} days` : "Not set"}
                  </span>
                </div>
                <div className="flex items-center">
                  <ActivityIcon className="w-5 h-5 mr-2 text-gray-400" />
                  <span>Status: </span>
                  <Badge variant="outline" className="ml-2 capitalize">
                    {test?.status || "Not set"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Separator className="my-4" />
      <h3 className="text-xl font-semibold mb-4">Tests</h3>
      <Dialog>
        <DialogTrigger className="flex w-full" asChild>
          <div className="flex w-full justify-end">
            <Button className="w-6/12  md:w-4/12 lg:w-3/12 bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="mr-2 h-4 w-4" /> Run Test
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[80svw] sm:max-w-[60svw] md:max-w-[50svw] lg:max-w-[40svw]">
          <form onSubmit={handleTestAdd} className="mt-4 space-y-4">
            <DialogHeader>
              <DialogTitle className="">Run Test</DialogTitle>
              <DialogDescription>
                Enter the details for the existing Run Test.
              </DialogDescription>
            </DialogHeader>

            <div className="w-full  space-y-5 shadow-2xl p-5 rounded-3xl">
              <Input
                value={newRun.name}
                onChange={(e) => setNewRun({ ...newRun, name: e.target.value })}
                placeholder="New Requirement Name"
              />
              {/* <Textarea
                value={newRun.description}
                onChange={(e) =>
                  setNewRun({
                    ...newRun,
                    description: e.target.value,
                  })
                }
                placeholder="New Requirement Description"
              /> */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <QuillEditor
                  name="description"
                  initialValue={newRun.description}
                  onChange={handleEditorChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={null}>
                Run Test
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
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {test?.runs?.map((run) => (
            <RequirementTestRunRow
              key={"rei test run id" + run?.id}
              run={run}
              sprint_id={sprint_id}
              requirement_id={requirement_id}
              test_id={test_id}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function RequirementTestRunRow({
  requirement_id,
  sprint_id,
  test_id,
  run,
  // onEdit,
  // onDelete,
  // onEditRequierment,
  // onDeleteRequierment,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRun, setEditedRun] = useState(run);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedRun((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(editedRun);
    console.log(sprint_id);
    console.log(requirement_id);
    console.log(test_id);
  };

  const handleSave = () => {
    // onEdit(requirement);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedRun(run);
    setIsEditing(false);
  };

  return (
    <>
      <TableRow key={run?.id}>
        <TableCell>{run?.id}</TableCell>
        <TableCell>
          {isEditing ? (
            <Input
              id="name"
              name="name"
              value={editedRun?.name}
              onChange={handleEditChange}
            />
          ) : (
            <Link
              href={`/sprints/${sprint_id}/requirements/${requirement_id}/tests/${test_id}/runs/${run?.id}`}
            >
              {run?.name}
            </Link>
          )}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <Textarea
              id="description"
              name="description"
              value={editedRun?.description}
              onChange={handleEditChange}
            />
          ) : (
            run?.description
          )}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" onClick={null}>
                <Check className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" onClick={handleEdit}>
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
                      Are you sure you want to delete this test? This action
                      cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={null}>
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(run?.id)}
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
    </>
  );
}
