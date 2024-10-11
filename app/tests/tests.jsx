import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2, Check, X } from "lucide-react";

export function TestRow({ test, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTest, setEditedTest] = useState(test);

  const handleSave = () => {
    onEdit(editedTest);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTest(test);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <TableRow>
        <TableCell colSpan={5}>
          <div className="space-y-4">
            <Input
              value={editedTest.id}
              onChange={(e) =>
                setEditedTest({ ...editedTest, id: e.target.value })
              }
              placeholder="Test ID"
            />
            <Input
              value={editedTest.name}
              onChange={(e) =>
                setEditedTest({ ...editedTest, name: e.target.value })
              }
              placeholder="Test Name"
            />
            <Textarea
              value={editedTest.steps}
              onChange={(e) =>
                setEditedTest({ ...editedTest, steps: e.target.value })
              }
              placeholder="Steps"
              rows={3}
            />
            <Textarea
              value={editedTest.expectedResult}
              onChange={(e) =>
                setEditedTest({ ...editedTest, expectedResult: e.target.value })
              }
              placeholder="Expected Result"
              rows={2}
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
      <TableCell>{test.id}</TableCell>
      <TableCell>{test.name}</TableCell>
      <TableCell>{test.steps}</TableCell>
      <TableCell>{test.expectedResult}</TableCell>
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
