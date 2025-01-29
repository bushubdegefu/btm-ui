"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BarChart2,
  Settings,
  Rocket,
  FileText,
  Folder,
  Bug,
  LogOut,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLogInStore } from "./store/loginstore";
import jsCookie from "js-cookie";
import { useUtilStore } from "./store/utilcommon";

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
  const getUserProjects = useLogInStore((state) => state.getUserProjects);
  const user_projects = useLogInStore((state) => state.user_projects);
  const currentProject = useLogInStore((state) => state.current_project);
  const setCurrentProject = useLogInStore((state) => state.setCurrentProject);
  const setRefreshTrigor = useUtilStore((state) => state.setRefreshTrigor);

  useEffect(() => {
    getUserProjects();
  }, []);

  const handleProjectSelect = (value) => {
    setCurrentProject(value);
    setRefreshTrigor();

    // let cur_project = user_projects.filter((dapp) => dapp.id == value)[0];
  };
  useEffect(() => {
    if (currentProject != null) {
      jsCookie.set("current_project", JSON.stringify(currentProject), {
        expires: 7,
        path: "/",
      });
      setRefreshTrigor();
    }
  }, [currentProject]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("dashboard");
  const logout = useLogInStore((state) => state.resetTokenLogout);
  const loggein = useLogInStore((state) => state.blue_admin_token);

  function veiewTab(tab_name) {
    setActiveView(tab_name);
  }

  function handleLogout() {
    logout();
    jsCookie.remove("access_token");
    jsCookie.remove("refresh_token");
    jsCookie.remove("user");
    jsCookie.remove("current_project");
    jsCookie.remove("page_size");
    jsCookie.remove("current_page");
  }
  return (
    <aside
      className={`w-full h-full bg-emerald-700 text-white transition-all duration-300 ease-in-out`}
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
        </div>
        <div className={`mt-4 ${!sidebarOpen && "hidden"}`}>
          <Select
            name="current_project"
            value={currentProject ? currentProject.id : ""}
            onValueChange={handleProjectSelect}
            // defaultValue={currentProject?.id}
          >
            <SelectTrigger className="w-full bg-emerald-600 border-emerald-500">
              <SelectValue
                value={currentProject ? currentProject.id : ""}
                placeholder="Select project"
              />
            </SelectTrigger>
            <SelectContent>
              {user_projects?.map((project) => (
                <SelectItem key={"projnav" + project?.id} value={project?.id}>
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
          icon={<Settings />}
          label="Settings"
          active={activeView === "settings"}
          handleClick={veiewTab}
          value="settings"
          href="/settings"
        />

        {loggein ? (
          <NavItem
            icon={<LogOut className={`${false ? "mr-2" : "mr-4"} h-4 w-4`} />}
            label="Logout"
            handleClick={handleLogout}
            value="login"
            href="/login"
          />
        ) : null}
      </nav>
    </aside>
  );
}
