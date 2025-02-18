"use client";
import { Check, X, PlusIcon, XIcon, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
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
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { create_sprint, delete_sprint } from "../actions";
import TipTapEditor from "../components/generic/tiptap";
import { useUtilStore } from "../store/utilcommon";

export default function SprintCard({ sprint }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSprint, setEditedSprint] = useState(sprint);
  const refreshTrigor = useUtilStore((state) => state.refreshTrigor);
  const setRefreshTrigor = useUtilStore((state) => state.setRefreshTrigor);

  const handleDelete = async (e) => {
    e.preventDefault();
    await delete_sprint(e.target.sprint_id.value);
    setRefreshTrigor();
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedSprint((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(editedSprint);
  };

  const handleCancel = () => {
    setEditedSprint(sprint);
    setIsEditing(false);
  };

  return (
    <>
      <TableRow key={sprint.id}>
        <TableCell>{sprint.id}</TableCell>
        <TableCell>
          {isEditing ? (
            <Input
              name="name"
              value={editedSprint?.name}
              onChange={handleEditChange}
            />
          ) : (
            <Link href={`/sprints/${sprint.id}`}>{sprint.name}</Link>
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
                    <form onSubmit={handleDelete}>
                      <input
                        className="hidden"
                        value={sprint?.id}
                        name="sprint_id"
                      />
                      <Button type="submit" variant="destructive">
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

export function AddNewSprint() {
  const [show, setShow] = useState(false);
  const [newSprint, setNewSprint] = useState({});
  const [quillContent, setQuillContent] = useState("");
  const setRefreshTrigor = useUtilStore((state) => state.setRefreshTrigor);

  const handleInlineNewSprintChange = (e) => {
    setQuillContent(e);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewSprint((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddNewSprint = async (event) => {
    event.preventDefault();
    let sprint = { ...newSprint, description: quillContent };
    await create_sprint(sprint);
    setRefreshTrigor();
  };

  return (
    <>
      <div className="w-full flex flex-col space-y-5">
        <div className="flex w-full justify-end items-end">
          <Button
            onClick={() => setShow(!show)}
            name="show-add"
            className="w-6/12 sm:w-4/12 md:w-3/12 right-2 h-auto bg-emerald-600 hover:bg-emerald-700 text-white text-wrap"
          >
            {show ? (
              <XIcon className="mr-2 h-4 w-4" />
            ) : (
              <PlusIcon className="mr-2 h-4 w-4" />
            )}
            {show ? "Cancel" : "Add New Sprint"}
          </Button>
        </div>
        <Card className={show ? "mb-4 bg-gray-50" : "hidden"}>
          <CardHeader>
            <CardTitle>Add New Sprint</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddNewSprint}>
              <div className="space-y-4">
                <Input
                  name="name"
                  onChange={handleEditChange}
                  placeholder="Sprint Name"
                  required
                />
                <TipTapEditor
                  initialValue={"Add Descripition here"}
                  onChange={handleInlineNewSprintChange}
                />
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
                        newSprint?.start_date
                          ? new Date(newSprint.start_date)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        setNewSprint({
                          ...newSprint,
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
                      value={newSprint?.duration || ""}
                      onChange={(e) => {
                        setNewSprint({
                          ...newSprint,
                          duration: e.target.value,
                        });
                      }}
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
                    value={newSprint?.status}
                    onValueChange={(value) =>
                      setNewSprint({ ...newSprint, status: value })
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

                <div className="flex justify-end space-x-2">
                  <Button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Add Sprint
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
