import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample user data
const user = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  dateCreated: "2023-01-15",
  roles: ["Project Manager", "Developer"],
  projects: [
    {
      id: "P001",
      name: "Web App Redesign",
      role: "Project Manager",
      status: "In Progress",
    },
    {
      id: "P002",
      name: "Mobile App Development",
      role: "Developer",
      status: "Planning",
    },
    {
      id: "P003",
      name: "Database Migration",
      role: "Developer",
      status: "Completed",
    },
  ],
};

export default function UserProfileCard() {
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/favicon.ico" alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-400">
              Member since {new Date(user.dateCreated).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Roles</h3>
          <div className="flex flex-wrap gap-2">
            {user.roles.map((role, index) => (
              <Badge key={index} variant="secondary">
                {role}
              </Badge>
            ))}
          </div>
        </div>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active Projects</TabsTrigger>
            <TabsTrigger value="all">All Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <ProjectsTable
              projects={user.projects.filter((p) => p.status !== "Completed")}
            />
          </TabsContent>
          <TabsContent value="all">
            <ProjectsTable projects={user.projects} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function ProjectsTable({ projects }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Project ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">{project.id}</TableCell>
            <TableCell>{project.name}</TableCell>
            <TableCell>{project.role}</TableCell>
            <TableCell>
              <Badge
                variant={
                  project.status === "Completed" ? "secondary" : "default"
                }
              >
                {project.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
