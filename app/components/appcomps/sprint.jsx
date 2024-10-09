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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Edit, Trash2, Plus } from "lucide-react";

// Sample sprints data
const sprints = [
  {
    id: "SP001",
    name: "Sprint 1: User Authentication",
    description:
      "Implement core user authentication features and basic profile management.",
    requirements: [
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
    requirements: [
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
    requirements: [
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

function RequirementsTableSp({ requirements }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requirements.map((req) => (
          <TableRow key={req.id}>
            <TableCell>{req.id}</TableCell>
            <TableCell className="font-medium">{req.name}</TableCell>
            <TableCell>{req.description}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function SprintCard({ sprint }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex justify-between items-center">
          <span>
            {sprint.name} (ID: {sprint.id})
          </span>
          <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{sprint.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">
            Associated Requirements: {sprint.requirements.length}
          </span>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Sprint
          </Button>
        </div>
        {isExpanded && (
          <div className="mt-4">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Requirements</h3>
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Requirement
              </Button>
            </div>
            <RequirementsTableSp requirements={sprint.requirements} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function SprintsList() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Sprints</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search sprints..."
            className="pl-10"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add New Sprint
        </Button>
      </div>
      {sprints.map((sprint) => (
        <SprintCard key={sprint.id} sprint={sprint} />
      ))}
    </div>
  );
}
