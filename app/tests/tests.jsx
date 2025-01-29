import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2 } from "lucide-react";
import { delete_test, update_test } from "../actions";
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
import { useUtilStore } from "../store/utilcommon";

export function TestRow({ test }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTest, setEditedTest] = useState(test);
  const setRefreshTrigor = useUtilStore((state) => state.setRefreshTrigor);

  const handleSave = async () => {
    await update_test(editedTest);
    setRefreshTrigor();
    setIsEditing(false);
  };

  const handleCancel = () => {
    // setEditedTest(t...editedTestt);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    console.log(test.id);
    await delete_test(test?.id);
    setRefreshTrigor();
  };

  return (
    <TableRow>
      <TableCell>{test?.id}</TableCell>
      <TableCell>{test?.name}</TableCell>
      <TableCell>{test?.description}</TableCell>
      <TableCell>{test?.steps}</TableCell>
      <TableCell>{test?.expected_result}</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Dialog
            open={isEditing}
            onOpenChange={() => setIsEditing(!isEditing)}
            className="w-4/5 max-w-full "
          >
            <DialogTrigger asChild>
              <Button variant="ghost" className="hover:bg-gray-200">
                <Edit className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-full w-3/5">
              <DialogHeader>
                <DialogTitle>Update Test</DialogTitle>
                <DialogDescription>
                  Update the details for the test case.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="id" className="text-right">
                    ID
                  </Label>
                  <Input
                    id="id"
                    value={editedTest?.id}
                    readOnly
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="requestId" className="text-right">
                    Requirement ID
                  </Label>
                  <Input
                    id="requirement_id"
                    type="number"
                    value={editedTest?.requirement_id}
                    onChange={(e) =>
                      setEditedTest({
                        ...editedTest,
                        requirement_id: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={editedTest.name}
                    onChange={(e) =>
                      setEditedTest({ ...editedTest, name: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={editedTest.description}
                    onChange={(e) =>
                      setEditedTest({
                        ...editedTest,
                        description: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="steps" className="text-right">
                    Steps
                  </Label>
                  <Textarea
                    id="steps"
                    value={editedTest.steps}
                    onChange={(e) =>
                      setEditedTest({ ...editedTest, steps: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="expected" className="text-right">
                    Expected
                  </Label>
                  <Textarea
                    id="expected"
                    value={editedTest?.expected_result}
                    onChange={(e) =>
                      setEditedTest({
                        ...editedTest,
                        expected_result: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <form onSubmit={handleSave}>
                  <Button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Update
                  </Button>
                </form>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-gray-200">
                <Trash2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this test? This action cannot
                  be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => {}}>
                  Cancel
                </Button>
                <form onSubmit={handleDelete}>
                  <Button variant="destructive">Delete</Button>
                </form>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </TableCell>
    </TableRow>
  );
}
