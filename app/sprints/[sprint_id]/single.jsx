"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  create_requirement,
  delete_requirement,
  get_sprint,
  get_sprintrequirements,
  update_sprint,
} from "@/app/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Edit,
  Plus,
  Trash2,
  CalendarIcon,
  ClockIcon,
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
  DialogClose,
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

import PaginagtionBottom from "@/app/components/generic/pagination";
import { useRouter } from "next/navigation";
import TipTapEditor from "@/app/components/generic/tiptap";
import { useUtilStore } from "@/app/store/utilcommon";

export default function SprintDetails({ sprint_id, sprint_requirments }) {
  const router = useRouter();
  const [sprint, setSprint] = useState({});
  const [reqs, setReqs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editSprint, setEditSprint] = useState("");
  const [description, setDescription] = useState("");
  const [purpose, setPurpose] = useState("");
  const [newRequirement, setNewRequirement] = useState({
    name: "",
    description: "",
    bussiness_value: 0,
    sprint_id: sprint_id,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState();
  const [refreshTrigor, setRefreshTrigor] = useState(false);
  const itemsPerPage = useUtilStore((state) => state.size);
  const currentPage = useUtilStore((state) => state.page);

  // sprint fetching effect
  useEffect(() => {
    const loadData = async () => {
      const result = await get_sprint(sprint_id);
      setSprint(result);
      setEditSprint(result);
    };

    loadData();
  }, [itemsPerPage, currentPage, refreshTrigor]);

  //  requirment loadin effect
  useEffect(() => {
    const loadData = async () => {
      const result = await get_sprintrequirements(sprint_id);

      setReqs(result?.requirements);
      setTotal(result?.total);
    };

    loadData();
  }, [itemsPerPage, currentPage, refreshTrigor]);

  const handleSprintUpdate = async (e) => {
    e.preventDefault();
    await update_sprint(editSprint);
    setRefreshTrigor(!refreshTrigor);

    setIsEditing(false);
  };

  const handleRequirementAdd = async (e) => {
    e.preventDefault();
    // console.log(newRequirement);
    await create_requirement({ ...newRequirement, description, purpose });
    setRefreshTrigor(!refreshTrigor);
    setIsOpen(!isOpen);
    // setNewRequirement({ name: "", description: "" });
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
                  name="sprint_name"
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
                <TipTapEditor
                  name="description"
                  inital_value={editSprint?.description}
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
                    id="start_date"
                    name="start_date"
                    type="date"
                    value={
                      editSprint?.start_date
                        ? new Date(editSprint.start_date)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      setEditSprint({
                        ...editSprint,
                        start_date: e.target.value,
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
                    name="duration"
                    type="number"
                    value={editSprint.duration}
                    onChange={(e) =>
                      setEditSprint({
                        ...editSprint,
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
                  name="status"
                  value={editSprint.status}
                  onValueChange={(value) =>
                    setEditSprint({ ...editSprint, status: value })
                  }
                >
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select sprint status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                name="cancel"
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                name="submit_sprint"
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
              {/* < content= /> */}
              <div className="w-full">{sprint?.description}</div>
              <br />
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-gray-400" />
                  <span>
                    Start:{" "}
                    {new Date(sprint?.start_date).toLocaleDateString("en-US", {
                      month: "short", // Abbreviated month name
                      day: "numeric", // Day as a number
                      year: "numeric", // Full year
                    }) || "Not set"}
                  </span>
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

          <TabsTrigger className="flex-1 text-center" value="documents">
            Documents
          </TabsTrigger>
        </TabsList>
        <TabsContent value="user_stories">
          <br />
          <h3 className="text-xl font-semibold mb-4">Requirements</h3>
          <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogTrigger className="flex w-full" asChild>
              <div className="flex w-full justify-end">
                <Button className="w-6/12  md:w-4/12 lg:w-3/12 bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Plus className="mr-2 h-4 w-4" /> Add New Requirements
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-full w-3/4">
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
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <TipTapEditor
                      name="description"
                      inital_value={description}
                      onChange={setDescription}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose</Label>
                    <TipTapEditor
                      name="purpose"
                      inital_value={purpose}
                      onChange={setPurpose}
                    />
                  </div>
                  <Input
                    name="bussiness_value"
                    value={newRequirement.bussiness_value}
                    type="number"
                    min="1"
                    max="100"
                    onChange={(e) =>
                      setNewRequirement({
                        ...newRequirement,
                        bussiness_value: parseInt(e.target.value),
                      })
                    }
                    placeholder="bussiness value out of 100"
                  />
                  <Label
                    htmlFor="status"
                    className="text-sm font-medium text-gray-700"
                  >
                    Status
                  </Label>
                  <Select
                    id="status"
                    name="status"
                    value={newRequirement.status}
                    onValueChange={(value) =>
                      setNewRequirement({ ...newRequirement, status: value })
                    }
                  >
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Amended">Amended</SelectItem>
                    </SelectContent>
                  </Select>

                  <Label
                    htmlFor="assigned_to"
                    className="text-sm font-medium text-gray-700"
                  >
                    Assigned To
                  </Label>
                  <Select
                    id="assigned_to"
                    name="assigned_to"
                    value={newRequirement.assigned_to}
                    onValueChange={(value) =>
                      setNewRequirement({
                        ...newRequirement,
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

                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
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
                <TableHead className="cursor-pointer">Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reqs?.map((requirement) => (
                <RequirementRow
                  key={"rei d" + requirement?.id}
                  requirment={requirement}
                  sprint_id={sprint_id}
                />
              ))}
            </TableBody>
          </Table>
          <PaginagtionBottom total_items={total} />
        </TabsContent>
        <TabsContent value="documents">
          <br />
          <h1>Provision Comming Soon</h1>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function RequirementRow({ requirment, sprint_id }) {
  const [isOpen, setIsOpen] = useState(false);
  const setRefreshTrigor = useUtilStore((state) => state.setRefreshTrigor);

  const handleDelete = async () => {
    await delete_requirement(requirment.id);
    setRefreshTrigor();
    setIsOpen(false);
  };

  return (
    <>
      <TableRow key={requirment.id}>
        <TableCell>{requirment.id}</TableCell>
        <TableCell>
          <Link href={`/sprints/${sprint_id}/requirements/${requirment?.id}`}>
            {requirment?.name}
          </Link>
        </TableCell>
        <TableCell>
          <div className="flex space-x-2 justify-center">
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
                    onClick={handleDelete}
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
