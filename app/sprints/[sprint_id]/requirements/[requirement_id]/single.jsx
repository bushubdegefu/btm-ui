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
  Pencil,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  QuillContentRenderer,
  QuillEditor,
} from "@/app/components/generic/editor";
import SingleUserStorySummary from "./summary";

// import {
//   updateSprint,
//   deleteSprint,
//   updateRequirement,
//   addRequirement,
//   deleteRequirement,
// } from "./actions";

const initialSprint = {
  id: 1,
  name: "Requirement 1",
  description: `<p><strong>User Login &amp; Session Management</strong></p><p><strong>User Login:</strong></p><ul><li>Implement user authentication (email and password).</li><li>Add validation for required fields and format checks (e.g., valid email).</li><li>Implement password encryption and secure login.</li><li>Allow "Forgot Password" functionality.</li><li>Implement error messages for incorrect credentials.</li></ul><p><strong>Session Management:</strong></p><ul><li>Create session tokens for logged-in users.</li><li>Implement session timeout and auto logout after inactivity.</li><li>Ensure that session persists across page reloads using cookies or local storage.</li><li>Implement the "Remember Me" feature.</li><li>Handle session expiration and redirect to login page.</li></ul><p><strong>Security &amp; Privacy:</strong></p><ul><li>Implement CAPTCHA on login page to prevent brute-force attacks.</li><li>Ensure secure password storage using hashing algorithms (e.g., bcrypt).</li><li>Add two-factor authentication (2FA) option for users.</li><li>Perform security testing for login vulnerabilities (SQL injection, XSS, etc.).</li><li><strong>Testing &amp; Bug Fixes:</strong></li><li>Write unit tests for login functionality.</li><li>Test session management across different browsers and devices.</li><li>Fix any identified bugs from previous sprints related to login or session handling.</li></ul><p><strong>UI/UX Enhancements:</strong></p><ul><li>Design user-friendly login interface.</li><li>Display success and error messages clearly on the login screen.</li><li>Optimize login page for mobile responsiveness.</li></ul><p><br></p>`,
  tests: [
    { id: "1", name: "Test 1", description: "Description 1" },
    { id: "2", name: "Test 2", description: "Description 2" },
  ],
  purpose: `"<ol><li><strong>Purpose</strong>: <em>As a user, I want to log into my account securely so that I can access my personal information without the risk of unauthorized access.</em></li></ol><ul><li>This user story focuses on implementing a secure login system for protecting user data and ensuring privacy.</li></ul><ol><li><strong>Purpose</strong>: <em>As a shopper, I want to be able to filter products by category and price so that I can quickly find items that match my budget and preferences.</em></li></ol><ul><li>The goal here is to enhance the shopping experience by providing relevant product filters for easier navigation.</li></ul><p><br></p>"`,
};

export default function SprintrequirementDetails({ sprint_id, requirment_id }) {
  const [requirement, setRequirement] = useState(initialSprint);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTest, setEditedTest] = useState(requirement);
  const [newTest, setNewTest] = useState({
    name: "",
    description: "",
  });

  const teamMembers = [
    {
      id: "1",
      name: "Jane Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "2",
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "3",
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "4",
      name: "Bob Williams",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ];

  const initialUserStoryData = {
    title: "Implement user authentication",
    progress: 75,
    businessValue: 4,
    effort: 3,
    priority: "High",
    assignee: teamMembers[0],
  };

  const handleEdit = (requirement) => {
    // setEditedTest(requirement);
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

  const handleTestUpdate = async (requirement) => {};

  const handleTestAdd = (e) => {
    e.preventDefault();

    console.log(newTest);
    // setNewTest({ name: "", description: "" });
  };

  const handleTestDelete = async (requirementId) => {};

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEditorChange = (e) => {
    setNewTest({
      ...newTest,
      description: e,
    });
  };
  const handleInlineEditorChange = (e) => {
    setEditedTest({
      ...editedTest,
      description: e,
    });
  };

  const handleInlineEditorRequirementChange = (e) => {
    setRequirement({
      ...requirement,
      description: e,
    });
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
                  Sprint Name
                </Label>
                <Input
                  id="requirementName"
                  name="name"
                  value={requirement?.name}
                  onChange={(e) =>
                    setRequirement({ ...requirement, name: e.target.value })
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
                  initialValue={requirement?.description}
                  onChange={handleInlineEditorRequirementChange}
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
                    value={requirement?.startDate}
                    onChange={(e) =>
                      setRequirement({
                        ...requirement,
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
                    value={requirement.duration}
                    onChange={(e) =>
                      setSprint({
                        ...requirement,
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
                  value={requirement.status}
                  onValueChange={(value) =>
                    setSprint({ ...requirement, status: value })
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
              <QuillContentRenderer content={requirement?.description} />
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-gray-400" />
                  <span>Start: {requirement?.startDate || "Not set"}</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 mr-2 text-gray-400" />
                  <span>
                    Duration:{" "}
                    {requirement?.duration
                      ? `${requirement?.duration} days`
                      : "Not set"}
                  </span>
                </div>
                <div className="flex items-center">
                  <ActivityIcon className="w-5 h-5 mr-2 text-gray-400" />
                  <span>Status: </span>
                  <Badge variant="outline" className="ml-2 capitalize">
                    {requirement?.status || "Not set"}
                  </Badge>
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
          <TabsTrigger className="flex-1 text-center" value="review_notes">
            Review Notes
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
            <DialogContent className="max-w-[80svw] sm:max-w-[60svw] md:max-w-[50svw] lg:max-w-[40svw]">
              <form onSubmit={handleTestAdd} className="mt-4 space-y-4">
                <DialogHeader>
                  <DialogTitle className="">Add New Test</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new Test.
                  </DialogDescription>
                </DialogHeader>

                <div className="w-full  space-y-5 shadow-2xl p-5 rounded-3xl">
                  <Input
                    value={newTest.name}
                    onChange={(e) =>
                      setNewTest({ ...newTest, name: e.target.value })
                    }
                    placeholder="New Test Name"
                  />
                  {/* <Textarea
                    value={newTest.description}
                    onChange={(e) =>
                      setNewTest({
                        ...newTest,
                        description: e.target.value,
                      })
                    }
                    placeholder="New Requirement Description"
                  /> */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <QuillEditor
                      name="description"
                      initialValue={newTest.description}
                      onChange={handleEditorChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={null}>
                    Add Requirements
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
              {requirement.tests.map((test) => (
                <RequirementTestRow
                  key={"rei test d" + test?.id}
                  test={test}
                  sprint_id={sprint_id}
                  requirment_id={requirment_id}
                />
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="purpose">
          <br />
          <h3 className="px-16 text-xl font-semibold mb-4">Purpose</h3>
          <PurposeViewEdit value={requirement?.purpose} />
        </TabsContent>
        <TabsContent value="summary">
          <br />
          <h3 className="text-xl font-semibold px-16 mb-4">Summary</h3>
          <SingleUserStorySummary
            initialData={initialUserStoryData}
            teamMembers={teamMembers}
          />
        </TabsContent>
        <TabsContent value="review_notes">
          <br />
          <h3 className="text-xl px-16 font-semibold mb-4">
            Review Notes/ Feedbacks
          </h3>
          <ReviewNotesViewEdit value={requirement?.purpose} />
        </TabsContent>
        <TabsContent value="documents"></TabsContent>
      </Tabs>
    </div>
  );
}

export function RequirementTestRow({
  test,
  requirment_id,
  sprint_id,
  // onEdit,
  // onDelete,
  // onEditRequierment,
  // onDeleteRequierment,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTest, setEditedTest] = useState(test);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedTest((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(editedTest);
    console.log(sprint_id);
    console.log(requirment_id);
  };

  const handleSave = () => {
    // onEdit(requirement);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTest(test);
    setIsEditing(false);
  };

  return (
    <>
      <TableRow key={test.id}>
        <TableCell>{test.id}</TableCell>
        <TableCell>
          {isEditing ? (
            <Input
              id="name"
              name="name"
              value={editedTest?.name}
              onChange={handleEditChange}
            />
          ) : (
            <Link
              href={`/sprints/${sprint_id}/requirements/${requirment_id}/tests/${test?.id}`}
            >
              {test?.name}
            </Link>
          )}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <Textarea
              id="description"
              name="description"
              value={editedTest?.description}
              onChange={handleEditChange}
            />
          ) : (
            test.description
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
    </>
  );
}

export function PurposeViewEdit({ value }) {
  const [isEditing, setIsEditing] = useState(false);
  const [purpose, setPurpose] = useState(value);
  const [tempPurpose, setTempPurpose] = useState(value);

  const handleEditorPurposeChange = (content) => {
    setTempPurpose(content);
  };

  const handleSave = () => {
    setPurpose(tempPurpose);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempPurpose(purpose);
    setIsEditing(false);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative w-4/5 shadow-2xl border-2 p-5">
        {isEditing ? (
          <>
            <QuillEditor
              name="purpose"
              initialValue={tempPurpose}
              onChange={handleEditorPurposeChange}
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
            <QuillContentRenderer content={purpose} />
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

export function ReviewNotesViewEdit({ value }) {
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState(value);
  const [tempNote, setTempNote] = useState(value);

  const handleEditorPurposeChange = (content) => {
    setTempNote(content);
  };

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
            <QuillEditor
              name="purpose"
              initialValue={tempNote}
              onChange={handleEditorPurposeChange}
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
            <QuillContentRenderer content={note} />
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
