"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlayIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { create_testrun } from "@/app/actions";

const runStatusOptions = [
  "NA",
  "NR",
  "Blocked",
  "Passed",
  "Failed",
  "InProgress",
];

export default function CreateRun({ test_instance_id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [testRun, setTestRun] = useState({
    test_instance_id: test_instance_id,
    run_status: "",
    result: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await create_testrun(testRun);
    setIsOpen(false);
    setTestRun({});
  };

  return (
    <Dialog
      className="max-w-full w-3/4"
      open={isOpen}
      onOpenChange={() => setIsOpen(!isOpen)}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} variant="outline">
          <PlayIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-full w-9/12">
        <DialogHeader>
          <DialogTitle>Enter Run Details</DialogTitle>
          <DialogDescription>
            Please select the run status and enter the result.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="run-status" className="text-right">
                Run Status
              </Label>
              <Select
                value={testRun?.run_status}
                onValueChange={(value) =>
                  setTestRun({ ...testRun, run_status: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select run status" />
                </SelectTrigger>
                <SelectContent>
                  {runStatusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="result" className="text-right">
                Result
              </Label>
              <Textarea
                id="result"
                className="col-span-3 min-h-[250px]"
                value={testRun?.result}
                onChange={(e) =>
                  setTestRun({ ...testRun, result: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
