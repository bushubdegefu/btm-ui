"use client";
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
} from "lucide-react";
import React, { useEffect, useState } from "react";

import { RequirementRow } from "../requirements/requirments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { QuillEditor } from "../components/generic/editor";
import { useRouter } from "next/navigation";

export default function SprintCard({
  sprint,
  onEdit,
  onDelete,
  onEditRequierment,
  onDeleteRequierment,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSprint, setEditedSprint] = useState(sprint);

  const handleEdit = (id) => {
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedSprint((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(editedSprint);
  };

  const handleSave = () => {
    onEdit(editedSprint);
    setIsEditing(false);
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
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(sprint.id)}
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

export function AddNewSprint({ addSprint }) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [newSprint, setNewSprint] = useState({});

  const handleEditorChange = (e) => {
    setNewSprint({
      ...newSprint,
      description: e,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewSprint((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // console.log(newSprint);
  };

  const handleAddNewSprint = async (event) => {
    event.preventDefault();
    // let sprint = {};
    // const formData = new FormData(event.currentTarget);
    // formData.forEach((value, key) => {
    //   sprint[key] = value;
    // });
    let resp = await addSprint(newSprint);
    router.refresh();
    console.log(newSprint);
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
                  value={newSprint?.name}
                  placeholder="Sprint Name"
                  required
                />
                <QuillEditor
                  name="description"
                  initialValue={newSprint?.description}
                  onChange={handleEditorChange}
                />
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
