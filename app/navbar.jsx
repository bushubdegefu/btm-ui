"use client";
import Link from "next/link";
import { useState } from "react";
import {
  BarChart2,
  Search,
  Settings,
  Users,
  AlbumIcon,
  Rocket,
  FileText,
  Folder,
  PlusCircle,
  Bug,
  Bell,
  LucideSidebar,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const projects = [
  { id: "1", name: "Project Alpha" },
  { id: "2", name: "Project Beta" },
  { id: "3", name: "Project Gamma" },
];

const NavItem = ({ icon, label, active, href, handleClick, value }) => {
  return (
    <Link
      onClick={handleClick ? () => handleClick(value) : null}
      href={href}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
        active
          ? "bg-emerald-800 text-white"
          : "text-emerald-100 hover:bg-emerald-600"
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </Link>
  );
};

export default function SideBarLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("dashboard");
  function veiewTab(tab_name) {
    setActiveView(tab_name);
  }
  return (
    <aside
      className={`${sidebarOpen ? "w-64" : "w-14"} bg-emerald-700 text-white transition-all duration-300 ease-in-out`}
    >
      <div className="p-4">
        <div className="w-full flex flex-row">
          <div></div>
          <div
            className={`${sidebarOpen ? "w-3/4" : ""} flex items-center mx-5`}
          >
            <h1 className={`text-2xl font-bold ${!sidebarOpen && "hidden"}`}>
              BTM
            </h1>
          </div>
          <div className="flex w-1/4 items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`${!sidebarOpen ? "mx-1" : ""} p-2 bg-emerald-600 rounded`}
            >
              {sidebarOpen ? "<<" : ">>"}
            </button>{" "}
          </div>
        </div>
        <div className={`mt-4 ${!sidebarOpen && "hidden"}`}>
          <Select>
            <SelectTrigger className="w-full bg-emerald-600 border-emerald-500">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <nav className="mt-8">
        <NavItem
          icon={<BarChart2 />}
          label="Dashboard"
          active={activeView === "dashboard"}
          handleClick={veiewTab}
          value="dashboard"
          href="/dashboard"
        />
        <NavItem
          icon={<Rocket />}
          label="Sprint"
          active={activeView === "sprint"}
          handleClick={veiewTab}
          href="/sprints"
          value="sprint"
        />
        <NavItem
          icon={<AlbumIcon />}
          label="Requirment"
          active={activeView === "requirement"}
          handleClick={veiewTab}
          value="requirement"
          href="/requirements"
        />
        <NavItem
          icon={<FileText />}
          label="Tests"
          active={activeView === "tests"}
          handleClick={veiewTab}
          value="tests"
          href="/tests"
        />

        <NavItem
          icon={<Folder />}
          label="Test Sets"
          active={activeView === "testsets"}
          handleClick={veiewTab}
          value="testsets"
          href="/testsets"
        />
        <NavItem
          icon={<Bug />}
          label="Issues"
          active={activeView === "issues"}
          handleClick={veiewTab}
          value="issues"
          href="/issues"
        />
        <NavItem
          icon={<Users />}
          label="Users"
          active={activeView === "users"}
          handleClick={veiewTab}
          value="users"
          href="/users"
        />
        <NavItem
          icon={<Settings />}
          label="Settings"
          active={activeView === "settings"}
          handleClick={veiewTab}
          value="users"
          href="/users"
        />
      </nav>
    </aside>
  );
}
