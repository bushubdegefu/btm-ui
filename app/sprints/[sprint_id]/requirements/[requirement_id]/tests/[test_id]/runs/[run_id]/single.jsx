"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2, Check, X } from "lucide-react";

export default function SprintRequirementTestRunDetails({
  sprint_id,
  requirement_id,
  test_id,
  run_id,
}) {
  console.log("##############");
  console.log({
    sprint_id,
    requirement_id,
    test_id,
    run_id,
  });
  console.log("##############");
  return (
    <div>
      <h1>
        {sprint_id} - {requirement_id} - {test_id} - {run_id}
      </h1>
    </div>
  );
}
