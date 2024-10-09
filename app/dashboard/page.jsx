"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  ChevronDown,
} from "lucide-react";
import TestCasesTable from "../components/appcomps/testsets";
import TestsTable from "../components/appcomps/tests";
import RequirementsList from "../components/appcomps/requirements";
import SprintsList from "../components/appcomps/sprint";
import UserProfileCard from "../components/appcomps/users";
import IssueTable from "../components/appcomps/issues";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("dashboard");

  function veiewTab(tab_name) {
    setActiveView(tab_name);
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-14"} bg-emerald-700 text-white transition-all duration-300 ease-in-out`}
      >
        <div className="p-4">
          <h1 className={`text-2xl font-bold ${!sidebarOpen && "hidden"}`}>
            BTM
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mt-4 p-2 bg-emerald-600 rounded"
          >
            {sidebarOpen ? "<<" : ">>"}
          </button>
        </div>
        <nav className="mt-8">
          <NavItem
            icon={<BarChart2 />}
            label="Dashboard"
            active={activeView === "dashboard"}
            handleClick={veiewTab}
            value="dashboard"
          />
          <NavItem
            icon={<Rocket />}
            label="Sprint"
            active={activeView === "sprint"}
            handleClick={veiewTab}
            value="sprint"
          />
          <NavItem
            icon={<AlbumIcon />}
            label="Requirment"
            active={activeView === "requirement"}
            handleClick={veiewTab}
            value="requirement"
          />
          <NavItem
            icon={<FileText />}
            label="Tests"
            active={activeView === "tests"}
            handleClick={veiewTab}
            value="tests"
          />
          <NavItem
            icon={<Folder />}
            label="Test Sets"
            active={activeView === "testsets"}
            handleClick={veiewTab}
            value="testsets"
          />
          <NavItem
            icon={<Bug />}
            label="Issues"
            active={activeView === "issues"}
            handleClick={veiewTab}
            value="issues"
          />
          <NavItem
            icon={<Users />}
            label="Users"
            active={activeView === "users"}
            handleClick={veiewTab}
            value="users"
          />
          <NavItem
            icon={<Settings />}
            label="Settings"
            active={activeView === "settings"}
            handleClick={veiewTab}
            value="settings"
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
              Dashboard
            </h2>
            <div className="flex items-center">
              <Button variant="outline" size="icon" className="mr-2">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src="/favicon.ico?height=32&width=32"
                  alt="User"
                />
                <ChevronDown className="h-4 w-4 ml-2" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Dashboard Content */}
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            {activeView === "testsets" && <TestCasesTable />}
            {activeView === "sprint" && <SprintsList />}
            {activeView === "tests" && <TestsTable />}
            {activeView === "users" && <UserProfileCard />}
            {activeView === "issues" && <IssueTable />}
            {activeView === "requirement" && <RequirementsList />}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, handleClick, value }) {
  return (
    <button
      onClick={() => {
        handleClick(value);
      }}
      href="#"
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
        active
          ? "bg-emerald-800 text-white"
          : "text-emerald-100 hover:bg-emerald-600"
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </button>
  );
}
