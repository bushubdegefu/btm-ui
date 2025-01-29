"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import {
  Check,
  Edit2,
  Eye,
  ListRestartIcon,
  LockIcon,
  UserPlusIcon,
  X,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useUtilStore } from "../store/utilcommon";
import {
  create_project,
  create_user,
  get_projects,
  get_roles,
  get_users,
  update_password,
  update_project,
  update_user,
} from "../admin_actions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import PaginagtionBottom from "../components/generic/pagination";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data
const projectUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    avatarUrl: "https://github.com/shadcn.png",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    avatarUrl: "https://github.com/shadcn.png",
  },
];

const availableUsers = [
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 4, name: "Diana Prince", email: "diana@example.com" },
];

function ProjectTab() {
  const [projects, setProjects] = useState();
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
  });
  const [total, setTotal] = useState();
  const itemsPerPage = useUtilStore((state) => state.size);
  const currentPage = useUtilStore((state) => state.page);
  const refreshTrigor = useUtilStore((state) => state.refreshTrigor);
  const setRefreshTrigor = useUtilStore((state) => state.setRefreshTrigor);

  useEffect(() => {
    const reload = async () => {
      const items = await get_projects();
      setProjects(items?.projects);
      setTotal(items.total);
    };
    reload();
  }, [itemsPerPage, currentPage, refreshTrigor]);

  const handleProjectSubmit = async (event) => {
    event.preventDefault();
    await create_project(newProject);
    setRefreshTrigor();
  };

  return (
    <div className="space-y-4">
      <div className="w-full rounded-3xl shadow-2xl p-5 m-5">
        <form onSubmit={handleProjectSubmit} className="space-y-4">
          <div>
            <Label htmlFor="project-name">Name</Label>
            <Input
              id="project-name"
              name="name"
              value={newProject?.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="project-description">Description</Label>
            <Input
              id="project-description"
              name="description"
              value={newProject?.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
            />
          </div>
          <div className="flex items-end justify-end w-full">
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Add Project
            </Button>
          </div>
        </form>
      </div>
      <Separator className="my-5" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects?.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project?.name}</TableCell>
              <TableCell>{project?.status}</TableCell>
              <TableCell>
                <Dialog className="p-0">
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View project details</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-full flex flex-col items-start justify-center w-3/5">
                    <DialogTitle className="hidden">
                      {project?.name}
                    </DialogTitle>
                    <DialogDescription className="hidden">
                      {project?.description}
                    </DialogDescription>
                    <ProjectCard project={project} />
                  </DialogContent>
                </Dialog>
                <Dialog className="p-0">
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <UserPlusIcon className="h-4 w-4" />
                      <span className="sr-only">View project details</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-full flex flex-col items-start justify-center w-3/5 pt-16">
                    <DialogTitle className="hidden">
                      {project?.name}
                    </DialogTitle>
                    <DialogDescription className="hidden">
                      {project?.description}
                    </DialogDescription>
                    <AttachUserCard project={project} />
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginagtionBottom total_items={total} />
    </div>
  );
}

function RoleTab() {
  const [roles, setRoles] = useState();
  const refreshTrigor = useUtilStore((state) => state.refreshTrigor);
  useEffect(() => {
    const reload = async () => {
      const items = await get_roles();
      setRoles(items);
    };
    reload();
  }, [refreshTrigor]);

  return (
    <div className="space-y-4">
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
          {roles?.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.id}</TableCell>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.description}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View role details</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{role.name}</DialogTitle>
                      <DialogDescription>{role.description}</DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function UserTab() {
  const [users, setUsers] = useState();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [total, setTotal] = useState();
  const itemsPerPage = useUtilStore((state) => state.size);
  const currentPage = useUtilStore((state) => state.page);
  const refreshTrigor = useUtilStore((state) => state.refreshTrigor);
  const setRefreshTrigor = useUtilStore((state) => state.setRefreshTrigor);

  useEffect(() => {
    const reload = async () => {
      const items = await get_users();
      setUsers(items?.users);
      setTotal(items.total);
    };
    reload();
  }, [itemsPerPage, currentPage, refreshTrigor]);

  const handleUserSubmit = async (event) => {
    event.preventDefault();
    await create_user(newUser);
    setNewUser({
      name: "",
      email: "",
      password: "",
    });
    setRefreshTrigor();
  };

  return (
    <div className="space-y-4">
      <div className="w-full rounded-3xl shadow-2xl p-5 m-5">
        <form onSubmit={handleUserSubmit} className="space-y-4">
          <div>
            <Label htmlFor="user-name">Name</Label>
            <Input
              id="user-name"
              name="name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="user-email">Email</Label>
            <Input
              id="user-email"
              name="email"
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="user-password">Password</Label>
            <Input
              id="user-password"
              name="password"
              type="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              required
            />
          </div>
          <div className="flex items-end justify-end w-full">
            <Button
              type="submit"
              onSubmit={handleUserSubmit}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Add User
            </Button>
          </div>
        </form>
      </div>
      <Separator className="my-5" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableUserRow user={user} key={user.id} />
          ))}
        </TableBody>
      </Table>
      <PaginagtionBottom total_items={total} />
    </div>
  );
}

function TableUserRow({ user }) {
  const [editUser, setEditUser] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const setRefreshTrigor = useUtilStore((state) => state.setRefreshTrigor);

  const handleUserUpdate = async () => {
    await update_user(
      {
        name: editUser.name,
        email: editUser.email,
        disabled: editUser.disabled,
      },
      user.id
    );
    setRefreshTrigor();
    setIsEditing(false);
    // console.log(editUser);
  };

  const handleReset = async () => {
    await update_password({
      email: user.email,
      password: "default@123",
      reset: true,
    });
  };

  return (
    <TableRow>
      <TableCell>
        {isEditing ? (
          <Input
            value={editUser?.name}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
          />
        ) : (
          user?.name
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            value={editUser?.email}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
          />
        ) : (
          user?.email
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Switch
            id="status-toggle"
            checked={!editUser?.disabled}
            onCheckedChange={() =>
              setEditUser({ ...editUser, disabled: !editUser?.disabled })
            }
            className={`${
              !editUser?.disabled ? "bg-green-500" : "bg-gray-200"
            } m-5`}
          >
            <span
              className={`${
                !editUser?.disabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        ) : (
          <Switch
            id="status-toggle"
            checked={!user?.disabled}
            className={`${
              !user?.disabled ? "bg-green-500" : "bg-gray-200"
            } m-5`}
          >
            <span
              className={`${
                !user?.disabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        )}
      </TableCell>
      <TableCell className="space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {isEditing ? (
                <Button
                  type="submit"
                  onClick={handleUserUpdate}
                  variant="outline"
                >
                  <Check className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
            </TooltipTrigger>
            <TooltipContent>
              {isEditing ? <> Update </> : <p>Edit User</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {isEditing ? (
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                >
                  <X className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="outline" type="submit" onClick={handleReset}>
                  <ListRestartIcon className="h-4 w-4" />
                </Button>
              )}
            </TooltipTrigger>
            <TooltipContent>
              {isEditing ? <p>Cancel</p> : <p>Reset Password do default@123</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    className={isEditing ? "hidden" : ""}
                    variant="outline"
                  >
                    <LockIcon className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2/5 w-2/5">
                  <DialogHeader>
                    <DialogTitle>User Role</DialogTitle>
                    <DialogDescription>Add Role to User</DialogDescription>
                    <p>Attach role to be here</p>
                  </DialogHeader>
                  <DialogFooter className="sm:justify-start">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add/Remove User role</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
    </TableRow>
  );
}

function AdminDashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Tabs defaultValue="projects">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <ProjectTab />
        </TabsContent>
        <TabsContent value="users">
          <UserTab />
        </TabsContent>
        <TabsContent value="roles">
          <RoleTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function ProjectCard({ project }) {
  const [editProject, setEditProject] = useState(project);
  const [isEditing, setIsEditing] = useState(false);
  const setRefreshTrigor = useUtilStore((state) => state.setRefreshTrigor);

  const handleSave = async () => {
    delete editProject["uuid"];
    await update_project(editProject);
    setIsEditing(false);
    setRefreshTrigor();
  };

  return (
    <div className="min-h-full w-full h-full flex flex-col space-y-4 p-2  ">
      <div className="w-full flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsEditing(!isEditing)}
          className="text-black hover:text-black hover:bg-emerald-100"
        >
          {isEditing ? (
            <X className="h-4 w-4" />
          ) : (
            <Edit2 className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="w-full">
        <Card className="h-full w-full max-w-4/5 bg-white/80  backdrop-blur-sm shadow-xl border-emerald-200">
          <CardHeader className="border-b border-emerald-200">
            {isEditing ? (
              <Input
                className="font-bold text-lg bg-emerald-50 border-emerald-300"
                value={editProject?.name}
                onChange={(e) =>
                  setEditProject({ ...editProject, name: e.target.value })
                }
              />
            ) : (
              <span>{project?.name}</span>
            )}
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {isEditing ? (
              <Textarea
                value={editProject?.description}
                onChange={(e) =>
                  setEditProject({
                    ...editProject,
                    description: e.target.value,
                  })
                }
                className="resize-none border-emerald-300"
                rows={3}
              />
            ) : (
              <span className="text-sm text-black">{project?.description}</span>
            )}
            {isEditing ? (
              <div className="space-y-1">
                <label
                  htmlFor="status"
                  className="text-sm font-medium text-black"
                >
                  Status
                </label>
                <Select
                  value={editProject?.status}
                  onValueChange={(value) =>
                    setEditProject({ ...editProject, status: value })
                  }
                >
                  <SelectTrigger
                    id="status"
                    className="bg-emerald-50 border-emerald-300 text-black"
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-emerald-50 border-emerald-300">
                    <SelectItem value="Planning" className="text-black">
                      Planning
                    </SelectItem>
                    <SelectItem value="Inprogress" className="text-black">
                      In Progress
                    </SelectItem>
                    <SelectItem value="Completed" className="text-black">
                      Completed
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div>
                <span>{project?.status}</span>
              </div>
            )}
          </CardContent>
          <CardFooter>
            {isEditing && (
              <Button
                type="submit"
                onClick={handleSave}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                Save Changes
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export function AttachUserCard({ project }) {
  const [editProjectUsers, setEditProjectUsers] = useState(project);
  const [isEditing, setIsEditing] = useState(false);
  const setRefreshTrigor = useUtilStore((state) => state.setRefreshTrigor);
  const refreshTrigor = useUtilStore((state) => state.refreshTrigor);

  useEffect(() => {
    const reload = async () => {
      const items = await get_users();
      editProjectUsers(items);
    };
    reload();
  }, [refreshTrigor]);

  const handleSave = async () => {
    delete editProjectUsers["uuid"];
    await update_project(editProjectUsers);
    setIsEditing(false);
    setRefreshTrigor();
  };

  const [selectedUser, setSelectedUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      alert(`User ${selectedUser} attached to project!`);
      setSelectedUser("");
    }
  };

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Project Users</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {projectUsers.map((user) => (
            <li key={user.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger>
              <SelectValue placeholder="Select a user to add" />
            </SelectTrigger>
            <SelectContent>
              {availableUsers.map((user) => (
                <SelectItem key={user.id} value={user.id.toString()}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full">
            Attach User to Project
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

export default AdminDashboard;
