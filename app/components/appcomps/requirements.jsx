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
import { ChevronDown, ChevronUp, Edit, Trash2, Play, Plus } from "lucide-react";

// Sample requirements data
const requirements = [
  {
    id: "REQ001",
    name: "User Authentication",
    description:
      "The system shall provide secure user authentication functionality, allowing users to log in with their credentials and access appropriate features based on their role.",
    tests: [
      {
        id: "T001",
        name: "User Login",
        steps:
          "1. Navigate to login page\n2. Enter valid username\n3. Enter valid password\n4. Click login button",
        expectedResult:
          "User should be successfully logged in and redirected to dashboard",
      },
      {
        id: "T002",
        name: "Invalid Login Attempt",
        steps:
          "1. Navigate to login page\n2. Enter invalid username\n3. Enter invalid password\n4. Click login button",
        expectedResult:
          "User should see an error message and remain on the login page",
      },
    ],
  },
  {
    id: "REQ002",
    name: "User Profile Management",
    description:
      "Users should be able to view and edit their profile information, including name, email, and profile picture.",
    tests: [
      {
        id: "T003",
        name: "Edit User Profile",
        steps:
          "1. Navigate to user profile page\n2. Click edit button\n3. Modify user information\n4. Save changes",
        expectedResult:
          "User profile should be updated with the new information",
      },
    ],
  },
  {
    id: "REQ003",
    name: "Password Reset",
    description:
      "The system shall provide a secure way for users to reset their password if forgotten.",
    tests: [
      {
        id: "T004",
        name: "Password Reset Request",
        steps:
          '1. Click "Forgot Password" link\n2. Enter registered email\n3. Submit request',
        expectedResult: "User should receive a password reset email",
      },
      {
        id: "T005",
        name: "Password Reset Process",
        steps:
          "1. Click reset link in email\n2. Enter new password\n3. Confirm new password\n4. Submit",
        expectedResult:
          "User's password should be updated and they should be able to log in with the new password",
      },
    ],
  },
];

function TestsTableReq({ tests }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Steps</TableHead>
          <TableHead>Expected Result</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tests.map((test) => (
          <TableRow key={test.id}>
            <TableCell>{test.id}</TableCell>
            <TableCell className="font-medium">{test.name}</TableCell>
            <TableCell className="whitespace-pre-line">{test.steps}</TableCell>
            <TableCell>{test.expectedResult}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Play className="h-4 w-4" />
                </Button>
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

function RequirementCard({ requirement }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex justify-between items-center">
          <span>
            {requirement.name} (ID: {requirement.id})
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
        <p className="mb-4">{requirement.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">
            Related Tests: {requirement.tests.length}
          </span>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Requirement
          </Button>
        </div>
        {isExpanded && (
          <div className="mt-4">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Tests</h3>
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Test
              </Button>
            </div>
            <TestsTableReq tests={requirement.tests} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function RequirementsList() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Requirements</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search requirements..."
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
          Add New Requirement
        </Button>
      </div>
      {requirements.map((requirement) => (
        <RequirementCard key={requirement.id} requirement={requirement} />
      ))}
    </div>
  );
}
