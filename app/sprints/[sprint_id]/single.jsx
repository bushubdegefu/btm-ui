"use client";
import { useEffect, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserStorySummary from "./summary";
// import {
//   updateSprint,
//   deleteSprint,
//   updateRequirement,
//   addRequirement,
//   deleteRequirement,
// } from "./actions";

export default function SprintDetails({
  sprint_id,
  sprint_requirments,
  getSprint,
}) {
  const [sprint, setSprint] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedRequirement, setEditedRequirment] = useState();
  const [editSprint, setEditSprint] = useState();
  const [newRequirement, setNewRequirement] = useState({
    name: "",
    description: "",
  });

  const handleEdit = (requirment) => {
    // setEditedRequirment(requirement);
    setIsEditing(true);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getSprint(sprint_id);
        setSprint(result);
        setEditSprint(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };

    loadData();
  }, [getSprint]);

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(editForm);
  };

  const handleSprintUpdate = async (e) => {
    e.preventDefault();
    // update_sprint(editSprint)
    setIsEditing(false);
  };

  const handleSprintDelete = async () => {
    // Redirect to sprints list or show a message
  };

  const handleRequirementUpdate = async (requirement) => {};

  const handleRequirementAdd = (e) => {
    e.preventDefault();

    console.log(newRequirement);
    // setNewRequirement({ name: "", description: "" });
  };

  const handleRequirementDelete = async (requirementId) => {};

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEditorChange = (e) => {
    setNewRequirement({
      ...newRequirement,
      description: e,
    });
  };
  const handleInlineEditorChange = (e) => {
    setEditedRequirment({
      ...editedRequirement,
      description: e,
    });
  };

  const handleInlineSprintEditorChange = (e) => {
    setEditSprint({
      ...editSprint,
      description: e,
    });
  };

  return (
    <div className="container mx-auto space-y-10  p-4">
      <h1 className="text-2xl font-bold mb-4">Sprint Details</h1>
      {isEditing ? (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <form onSubmit={handleSprintUpdate} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="sprintName"
                  className="text-sm font-medium text-gray-700"
                >
                  Sprint Name
                </Label>
                <Input
                  id="sprintName"
                  value={editSprint.name}
                  onChange={(e) =>
                    setEditSprint({ ...editSprint, name: e.target.value })
                  }
                  placeholder="Enter sprint name"
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <Label
                  htmlFor="sprintDescription"
                  className="text-sm font-medium text-gray-700"
                >
                  Description
                </Label>
                <QuillEditor
                  name="exist-description"
                  initialValue={editSprint?.description}
                  onChange={handleInlineSprintEditorChange}
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
                    value={sprint?.startDate}
                    onChange={(e) =>
                      setSprint({ ...sprint, startDate: e.target.value })
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
                    value={sprint.duration}
                    onChange={(e) =>
                      setSprint({
                        ...sprint,
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
                  value={sprint.status}
                  onValueChange={(value) =>
                    setSprint({ ...sprint, status: value })
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
                {sprint?.name}
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
              <QuillContentRenderer content={sprint?.description} />
              <br />
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-gray-400" />
                  <span>Start: {sprint?.startDate || "Not set"}</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 mr-2 text-gray-400" />
                  <span>
                    Duration:{" "}
                    {sprint?.duration ? `${sprint?.duration} days` : "Not set"}
                  </span>
                </div>
                <div className="flex items-center">
                  <ActivityIcon className="w-5 h-5 mr-2 text-gray-400" />
                  <span>Status: </span>
                  <Badge variant="outline" className="ml-2 capitalize">
                    {sprint?.status || "Not set"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Separator className="my-4" />
      <Tabs defaultValue="user_stories" className="w-full">
        <TabsList className="flex w-full overflow-x-auto whitespace-nowrap">
          <TabsTrigger className="flex-1 text-center" value="user_stories">
            User Stories/Requirments
          </TabsTrigger>
          <TabsTrigger className="flex-1 text-center" value="summary">
            Sprint summary
          </TabsTrigger>
        </TabsList>
        <TabsContent value="user_stories">
          <br />
          <h3 className="text-xl font-semibold mb-4">Requirements</h3>
          <Dialog>
            <DialogTrigger className="flex w-full" asChild>
              <div className="flex w-full justify-end">
                <Button className="w-6/12  md:w-4/12 lg:w-3/12 bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Plus className="mr-2 h-4 w-4" /> Add New Requirements
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-[80svw] sm:max-w-[60svw] md:max-w-[50svw] lg:max-w-[40svw]">
              <form onSubmit={handleRequirementAdd} className="mt-4 space-y-4">
                <DialogHeader>
                  <DialogTitle className="">Add New Requirements</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new Requirements.
                  </DialogDescription>
                </DialogHeader>

                <div className="w-full  space-y-5 shadow-2xl p-5 rounded-3xl">
                  <Input
                    value={newRequirement.name}
                    onChange={(e) =>
                      setNewRequirement({
                        ...newRequirement,
                        name: e.target.value,
                      })
                    }
                    placeholder="New Requirement Name"
                  />
                  {/* <Textarea
                    value={newRequirement.description}
                    onChange={(e) =>
                      setNewRequirement({
                        ...newRequirement,
                        description: e.target.value,
                      })
                    }
                    placeholder="New Requirement Description"
                  /> */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <QuillEditor
                      name="description"
                      initialValue={newRequirement.description}
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
              {sprint_requirments?.map((requirement) => (
                <RequirementRow
                  key={"rei d" + requirement?.id}
                  requirment={requirement}
                  sprint_id={sprint_id}
                />
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="summary">
          <br />
          <UserStorySummary />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function RequirementRow({
  requirment,
  sprint_id,
  // onEdit,
  // onDelete,
  // onEditRequierment,
  // onDeleteRequierment,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRequirment, setEditedRequirment] = useState(requirment);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedRequirment((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(editedRequirment);
    console.log(sprint_id);
  };

  const handleSave = () => {
    // onEdit(requirment);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedRequirment(requirment);
    setIsEditing(false);
  };

  return (
    <>
      <TableRow key={requirment.id}>
        <TableCell>{requirment.id}</TableCell>
        <TableCell>
          {isEditing ? (
            <Input
              id="name"
              name="name"
              value={editedRequirment?.name}
              onChange={handleEditChange}
            />
          ) : (
            <Link href={`/sprints/${sprint_id}/requirements/${requirment?.id}`}>
              {requirment?.name}
            </Link>
          )}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <Textarea
              id="description"
              name="description"
              value={editedRequirment?.description}
              onChange={handleEditChange}
            />
          ) : (
            requirment.description
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
                      onClick={() => handleDelete(requirment.id)}
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
