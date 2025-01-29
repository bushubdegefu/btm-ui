"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminDashboard from "./setting";
import { useLogInStore } from "../store/loginstore";
import { get_user, update_password } from "../admin_actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function UserProfileCard() {
  const current_user = useLogInStore((state) => state.user);
  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [trigor, setTrigor] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    name: "",
    roles: [],
  });

  useEffect(() => {
    const reload = async () => {
      const response = await get_user(current_user?.user_id);

      setUser(response);
    };
    reload();
  }, [trigor]);

  useEffect(() => {
    // Add the event listener
    window.addEventListener("beforeunload", setTrigor(!trigor));

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", setTrigor(!trigor));
    };
  }, []);

  const handleUpdatePassword = async () => {
    if (changePassword.newPassword == changePassword.confirmPassword) {
      await update_password({
        email: current_user?.email,
        reset: false,
        password: changePassword?.newPassword,
      });
    }
  };

  return (
    <div className="w-full">
      <Card className="w-full mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                  <DialogDescription className="hidden">
                    Update Password
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <Label htmlFor="old password">Old Password</Label>
                  <Input
                    id="old password"
                    type="password"
                    name="oldPassword"
                    value={changePassword?.oldPassword}
                    onChange={(e) =>
                      setChangePassword({
                        ...changePassword,
                        oldPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="new password">Old Password</Label>
                  <Input
                    id="new password"
                    type="password"
                    name="newPassword"
                    value={changePassword?.newPassword}
                    onChange={(e) =>
                      setChangePassword({
                        ...changePassword,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="confirm password">Old Password</Label>
                  <Input
                    id="confirm password"
                    type="password"
                    name="confirmPassword"
                    value={changePassword?.confirmPassword}
                    onChange={(e) =>
                      setChangePassword({
                        ...changePassword,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <DialogFooter className="sm:justify-start">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="outline"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={handleUpdatePassword}
                  >
                    Update{" "}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Avatar className="w-20 h-20">
              <AvatarImage src="/favicon.ico" alt={user.name} />
              <AvatarFallback>
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
              <p className="text-gray-500">{user.email}</p>
              <p onClick={() => setIsOpen(true)} className="text-gray-500">
                Change Password
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Roles</h3>
            <div className="flex flex-wrap gap-2">
              {current_user?.roles?.map((role, index) => (
                <Badge key={index} variant="secondary">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
          <AdminDashboard />
        </CardContent>
      </Card>
    </div>
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
