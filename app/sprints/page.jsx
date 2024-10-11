"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Plus,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Search,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RequirementRow } from "../requirements/requirments";

// Sample sprints data
const initialSprints = [
  {
    id: "SP001",
    name: "Sprint 1: User Authentication",
    description:
      "Implement core user authentication features and basic profile management.",
    requierments: [
      {
        id: "REQ001",
        name: "User Login",
        description:
          "Users should be able to securely log in to the system using their credentials.",
      },
      {
        id: "REQ002",
        name: "User Registration",
        description:
          "New users should be able to create an account by providing necessary information.",
      },
      {
        id: "REQ003",
        name: "Password Reset",
        description:
          "Users should have the ability to reset their password if forgotten.",
      },
    ],
  },
  {
    id: "SP002",
    name: "Sprint 2: Project Management",
    description:
      "Develop core project management functionalities including project creation and task assignment.",
    requierments: [
      {
        id: "REQ004",
        name: "Create Project",
        description:
          "Users should be able to create new projects with basic details.",
      },
      {
        id: "REQ005",
        name: "Assign Tasks",
        description:
          "Project managers should be able to assign tasks to team members.",
      },
    ],
  },
  {
    id: "SP003",
    name: "Sprint 3: Reporting",
    description:
      "Implement basic reporting features for project progress and team performance.",
    requierments: [
      {
        id: "REQ006",
        name: "Generate Project Report",
        description:
          "Users should be able to generate reports showing project progress and statistics.",
      },
      {
        id: "REQ007",
        name: "Team Performance Dashboard",
        description:
          "Implement a dashboard showing key performance indicators for team members.",
      },
    ],
  },
];

function SprintCard({
  sprint,
  onEdit,
  onDelete,
  onEditRequierment,
  onDeleteRequierment,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSprint, setEditedSprint] = useState(sprint);

  const handleSave = () => {
    onEdit(editedSprint);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSprint(sprint);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Input
              value={editedSprint.id}
              onChange={(e) =>
                setEditedSprint({
                  ...editedSprint,
                  id: e.target.value,
                })
              }
              placeholder="Sprint ID"
            />
            <Input
              value={editedSprint.name}
              onChange={(e) =>
                setEditedSprint({
                  ...editedSprint,
                  name: e.target.value,
                })
              }
              placeholder="Sprint Name"
            />
            <Textarea
              value={editedSprint.description}
              onChange={(e) =>
                setEditedSprint({
                  ...editedSprint,
                  description: e.target.value,
                })
              }
              placeholder="Description"
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <Button onClick={handleCancel} variant="outline">
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Check className="mr-2 h-4 w-4" /> Save
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>
            {sprint.name} (ID: {sprint.id})
          </span>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{sprint.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">
            Related Requierments: {sprint.requierments.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Sprint
          </Button>
        </div>
        {isExpanded && (
          <div className="mt-4">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Requierments</h3>
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Requierment
              </Button>
            </div>
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
                {sprint.requierments.map((requierment) => (
                  <RequirementRow
                    key={requierment.id}
                    requirement={requierment}
                    onEdit={(editedRequierment) =>
                      onEditRequierment(sprint.id, editedRequierment)
                    }
                    onDelete={() =>
                      onDeleteRequierment(sprint.id, requierment.id)
                    }
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function SprintList() {
  const [sprints, setSprints] = useState(initialSprints);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewForm, setShowNewForm] = useState(false);
  const [newSprint, setNewSprint] = useState({
    id: "",
    name: "",
    description: "",
    requierments: [],
  });

  // Filter sprints based on search term
  const filteredSprints = sprints.filter(
    (req) =>
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Get current sprints
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSprints = filteredSprints.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditSprint = (editedSprint) => {
    setSprints(
      sprints.map((req) => (req.id === editedSprint.id ? editedSprint : req)),
    );
  };

  const handleDeleteSprint = (reqId) => {
    setSprints(sprints.filter((req) => req.id !== reqId));
  };

  const handleEditRequierment = (reqId, editedRequierment) => {
    setSprints(
      sprints.map((req) =>
        req.id === reqId
          ? {
              ...req,
              requierments: req.requierments.map((requierment) =>
                requierment.id === editedRequierment.id
                  ? editedRequierment
                  : requierment,
              ),
            }
          : req,
      ),
    );
  };

  const handleDeleteRequierment = (reqId, requiermentId) => {
    setSprints(
      sprints.map((req) =>
        req.id === reqId
          ? {
              ...req,
              requierments: req.requierments.filter(
                (requierment) => requierment.id !== requiermentId,
              ),
            }
          : req,
      ),
    );
  };

  const handleAddNewSprint = (event) => {
    event.preventDefault();
    setSprints([...sprints, newSprint]);
    setNewSprint({
      id: "",
      name: "",
      description: "",
      requierments: [],
    });
    setShowNewForm(false);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Sprints</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search sprints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
          onClick={() => setShowNewForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Sprint
        </Button>
      </div>

      {showNewForm && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Add New Sprint</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddNewSprint}>
              <div className="space-y-4">
                <Input
                  value={newSprint.id}
                  onChange={(e) =>
                    setNewSprint({ ...newSprint, id: e.target.value })
                  }
                  placeholder="Sprint ID"
                  required
                />
                <Input
                  value={newSprint.name}
                  onChange={(e) =>
                    setNewSprint({
                      ...newSprint,
                      name: e.target.value,
                    })
                  }
                  placeholder="Sprint Name"
                  required
                />
                <Textarea
                  value={newSprint.description}
                  onChange={(e) =>
                    setNewSprint({
                      ...newSprint,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                  rows={3}
                  required
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowNewForm(false)}
                  >
                    Cancel
                  </Button>
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
      )}

      {currentSprints.map((sprint) => (
        <SprintCard
          key={sprint.id}
          sprint={sprint}
          onEdit={handleEditSprint}
          onDelete={handleDeleteSprint}
          onEditRequierment={handleEditRequierment}
          onDeleteRequierment={handleDeleteRequierment}
        />
      ))}

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
          <span>{`Page ${currentPage} of ${Math.ceil(filteredSprints.length / itemsPerPage)}`}</span>
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredSprints.length / itemsPerPage)
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
