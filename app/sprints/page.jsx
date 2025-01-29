import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Suspense } from "react";
import SprintCards from "./sprint-cards";
import { AddNewSprint } from "./client";

export default function SprintList() {
  return (
    <div className="container mx-auto bg-gray-200 p-6 space-y-5">
      <div className="w-full">
        <AddNewSprint />
      </div>
      <div className="w-full ">
        <h1 className="text-2xl font-bold mb-6">Sprints</h1>
        <div className="mb-4 flex justify-between items-center">
          <div className="relative w-64 rounded-3xl">
            <Input
              type="text"
              placeholder="Search sprints..."
              value="Search"
              className="pl-10 bg-white"
              readOnly
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div>
          <Suspense fallback={<h1> Loading ....</h1>}>
            <SprintCards />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
