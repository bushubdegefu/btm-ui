"use client";

import React, { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Search,
  Check,
  X,
} from "lucide-react";
import { TestRow } from "../tests/tests";
// Sample requirements data
const initialRequirements = [
  {
    id: "REQ001",
    name: "User Authentication",
    description: "Implement secure user authentication system",
    tests: [
      {
        id: "TEST001",
        name: "Valid Login",
        steps: "1. Enter valid credentials\n2. Click login button",
        expectedResult: "User is logged in successfully",
      },
      {
        id: "TEST002",
        name: "Invalid Login",
        steps: "1. Enter invalid credentials\n2. Click login button",
        expectedResult: "Error message is displayed",
      },
    ],
  },
  {
    id: "REQ002",
    name: "Password Reset",
    description: "Implement password reset functionality",
    tests: [
      {
        id: "TEST003",
        name: "Reset Request",
        steps: '1. Click "Forgot Password"\n2. Enter email\n3. Submit request',
        expectedResult: "Reset email is sent",
      },
      {
        id: "TEST004",
        name: "Password Change",
        steps:
          "1. Click reset link in email\n2. Enter new password\n3. Confirm new password",
        expectedResult: "Password is updated successfully",
      },
    ],
  },
  // Add more requirements here...
];

function RequirementCard({
  requirement,
  onEdit,
  onDelete,
  onEditTest,
  onDeleteTest,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRequirement, setEditedRequirement] = useState(requirement);

  const handleSave = () => {
    onEdit(editedRequirement);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedRequirement(requirement);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Input
              value={editedRequirement.id}
              onChange={(e) =>
                setEditedRequirement({
                  ...editedRequirement,
                  id: e.target.value,
                })
              }
              placeholder="Requirement ID"
            />
            <Input
              value={editedRequirement.name}
              onChange={(e) =>
                setEditedRequirement({
                  ...editedRequirement,
                  name: e.target.value,
                })
              }
              placeholder="Requirement Name"
            />
            <Textarea
              value={editedRequirement.description}
              onChange={(e) =>
                setEditedRequirement({
                  ...editedRequirement,
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
            {requirement.name} (ID: {requirement.id})
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
        <p className="mb-4">{requirement.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">
            Related Tests: {requirement.tests.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
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
                Add Test
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Steps</TableHead>
                  <TableHead>Expected Result</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requirement.tests.map((test) => (
                  <TestRow
                    key={test.id}
                    test={test}
                    onEdit={(editedTest) =>
                      onEditTest(requirement.id, editedTest)
                    }
                    onDelete={() => onDeleteTest(requirement.id, test.id)}
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

export default function RequirementList() {
  const [requirements, setRequirements] = useState(initialRequirements);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewForm, setShowNewForm] = useState(false);
  const [newRequirement, setNewRequirement] = useState({
    id: "",
    name: "",
    description: "",
    tests: [],
  });

  // Filter requirements based on search term
  const filteredRequirements = requirements.filter(
    (req) =>
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Get current requirements
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequirements = filteredRequirements.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditRequirement = (editedRequirement) => {
    setRequirements(
      requirements.map((req) =>
        req.id === editedRequirement.id ? editedRequirement : req,
      ),
    );
  };

  const handleDeleteRequirement = (reqId) => {
    setRequirements(requirements.filter((req) => req.id !== reqId));
  };

  const handleEditTest = (reqId, editedTest) => {
    setRequirements(
      requirements.map((req) =>
        req.id === reqId
          ? {
              ...req,
              tests: req.tests.map((test) =>
                test.id === editedTest.id ? editedTest : test,
              ),
            }
          : req,
      ),
    );
  };

  const handleDeleteTest = (reqId, testId) => {
    setRequirements(
      requirements.map((req) =>
        req.id === reqId
          ? { ...req, tests: req.tests.filter((test) => test.id !== testId) }
          : req,
      ),
    );
  };

  const handleAddNewRequirement = (event) => {
    event.preventDefault();
    setRequirements([...requirements, newRequirement]);
    setNewRequirement({
      id: "",
      name: "",
      description: "",
      tests: [],
    });
    setShowNewForm(false);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Requirements</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search requirements..."
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
          Add New Requirement
        </Button>
      </div>

      {showNewForm && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Add New Requirement</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddNewRequirement}>
              <div className="space-y-4">
                <Input
                  value={newRequirement.id}
                  onChange={(e) =>
                    setNewRequirement({ ...newRequirement, id: e.target.value })
                  }
                  placeholder="Requirement ID"
                  required
                />
                <Input
                  value={newRequirement.name}
                  onChange={(e) =>
                    setNewRequirement({
                      ...newRequirement,
                      name: e.target.value,
                    })
                  }
                  placeholder="Requirement Name"
                  required
                />
                <Textarea
                  value={newRequirement.description}
                  onChange={(e) =>
                    setNewRequirement({
                      ...newRequirement,
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
                    Add Requirement
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {currentRequirements.map((requirement) => (
        <RequirementCard
          key={requirement.id}
          requirement={requirement}
          onEdit={handleEditRequirement}
          onDelete={handleDeleteRequirement}
          onEditTest={handleEditTest}
          onDeleteTest={handleDeleteTest}
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
          <span>{`Page ${currentPage} of ${Math.ceil(filteredRequirements.length / itemsPerPage)}`}</span>
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage ===
              Math.ceil(filteredRequirements.length / itemsPerPage)
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
