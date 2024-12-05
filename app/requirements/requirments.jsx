"use client";

import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2, Check, X } from "lucide-react";

export function RequirementRow({ requirement, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRequirement, seteditedRequirement] = useState(requirement);

  const handleSave = () => {
    onEdit(editedRequirement);
    setIsEditing(false);
  };

  const handleCancel = () => {
    seteditedRequirement(requirement);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <TableRow>
        <TableCell colSpan={5}>
          <div className="space-y-4">
            <Input
              value={editedRequirement.id}
              onChange={(e) =>
                seteditedRequirement({
                  ...editedRequirement,
                  id: e.target.value,
                })
              }
              placeholder="requirement ID"
            />
            <Input
              value={editedRequirement.name}
              onChange={(e) =>
                seteditedRequirement({
                  ...editedRequirement,
                  name: e.target.value,
                })
              }
              placeholder="requirement Name"
            />
            <Textarea
              value={editedRequirement.description}
              onChange={(e) =>
                seteditedRequirement({
                  ...editedRequirement,
                  steps: e.target.value,
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
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell>{requirement.id}</TableCell>
      <TableCell>{requirement.name}</TableCell>
      <TableCell>{requirement.description}</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
