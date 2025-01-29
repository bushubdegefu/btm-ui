"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Edit,
  Plus,
  Check,
  X,
  CalendarIcon,
  ClockIcon,
  Trash,
  Trash2Icon,
  ActivityIcon,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TipTapEditor from "@/app/components/generic/tiptap";
import { get_test, get_testtestruns, update_test } from "@/app/actions";
import { useUtilStore } from "@/app/store/utilcommon";
import { TestRunRows } from "@/app/testsets/[testset_id]/runs/[test_instance_id]/single";
import PaginagtionBottom from "@/app/components/generic/pagination";

// import {
//   updateSprint,
//   deleteSprint,
//   updateRequirement,
//   addRequirement,
//   deleteRequirement,
// } from "./actions";

const initialSprint = {
  id: 1,
  name: "Test 1",
  description: `<p><strong>User Login &amp; Session Management</strong></p><p><strong>User Login:</strong></p><ul><li>Implement user authentication (email and password).</li><li>Add validation for required fields and format checks (e.g., valid email).</li><li>Implement password encryption and secure login.</li><li>Allow "Forgot Password" functionality.</li><li>Implement error messages for incorrect credentials.</li></ul><p><strong>Session Management:</strong></p><ul><li>Create session tokens for logged-in users.</li><li>Implement session timeout and auto logout after inactivity.</li><li>Ensure that session persists across page reloads using cookies or local storage.</li><li>Implement the "Remember Me" feature.</li><li>Handle session expiration and redirect to login page.</li></ul><p><strong>Security &amp; Privacy:</strong></p><ul><li>Implement CAPTCHA on login page to prevent brute-force attacks.</li><li>Ensure secure password storage using hashing algorithms (e.g., bcrypt).</li><li>Add two-factor authentication (2FA) option for users.</li><li>Perform security testing for login vulnerabilities (SQL injection, XSS, etc.).</li><li><strong>Testing &amp; Bug Fixes:</strong></li><li>Write unit tests for login functionality.</li><li>Test session management across different browsers and devices.</li><li>Fix any identified bugs from previous sprints related to login or session handling.</li></ul><p><strong>UI/UX Enhancements:</strong></p><ul><li>Design user-friendly login interface.</li><li>Display success and error messages clearly on the login screen.</li><li>Optimize login page for mobile responsiveness.</li></ul><p><br></p>`,
  runs: [
    { id: "1", name: "Run 1", description: "Description 1" },
    { id: "2", name: "Run 2", description: "Description 2" },
    { id: "3", name: "Run 3", description: "Description 3" },
  ],
};

export default function SprintRequirementTestDetails({
  sprint_id,
  requirement_id,
  test_id,
}) {
  const [test, setTest] = useState();
  const [runs, setRuns] = useState();
  const [editTest, setEditTest] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editedRun, setEditedRun] = useState(test);

  const [total, setTotal] = useState();
  const refreshTrigor = useUtilStore((state) => state.refreshTrigor);
  const setRefreshTrigor = useUtilStore((state) => state.setRefreshTrigor);
  const itemsPerPage = useUtilStore((state) => state.size);
  const currentPage = useUtilStore((state) => state.page);

  // use efferct to load tests
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await get_test(test_id);
        setTest(result);
        setEditTest(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };
    loadData();
  }, [test_id, requirement_id, itemsPerPage, currentPage, refreshTrigor]);

  // use efferct to load runs
  useEffect(() => {
    const loadData = async () => {
      try {
        const runs = await get_testtestruns(test_id);
        setRuns(runs?.test_runs);
        setTotal(runs?.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };
    loadData();
  }, [test_id, requirement_id, itemsPerPage, currentPage, refreshTrigor]);

  const handleTestUpdate = async (e) => {
    e.preventDefault();
    await update_test(editTest);
    setRefreshTrigor();
    setIsEditing(false);
  };

  const handleRequirementDelete = async () => {
    // Redirect to sprints list or show a message
  };

  const handleTestAdd = (e) => {
    e.preventDefault();

    console.log(newRun);
    // setNewRun({ name: "", description: "" });
  };

  const handleTestDelete = async (testId) => {};

  const handleEditorChange = (e) => {
    setNewRun({
      ...newRun,
      description: e,
    });
  };

  const handleInlineEditorChange = (e) => {
    setEditTest({
      ...editTest,
      description: e,
    });
  };
  const handleInlineStepsChange = (e) => {
    setEditTest({
      ...editTest,
      steps: e,
    });
  };
  const handleInlineResultChange = (e) => {
    setEditTest({
      ...editTest,
      expected_result: e,
    });
  };

  return (
    <div className="container mx-auto space-y-10  p-4">
      <h1 className="text-2xl font-bold mb-4">Test Details</h1>
      {isEditing ? (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <form onSubmit={handleTestUpdate} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="sprintName"
                  className="text-sm font-medium text-gray-700"
                >
                  Test Name
                </Label>
                <Input
                  id="requirementName"
                  name="name"
                  value={editTest?.name}
                  onChange={(e) =>
                    setEditTest({ ...editTest, name: e.target.value })
                  }
                  placeholder="Enter sprint name"
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <Label
                  htmlFor="test-description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description
                </Label>
                <TipTapEditor
                  name="exist-description"
                  inital_value={editTest?.description}
                  onChange={handleInlineEditorChange}
                />
              </div>
              <div>
                <Label
                  htmlFor="test-steps"
                  className="text-sm font-medium text-gray-700"
                >
                  Steps
                </Label>
                <TipTapEditor
                  name="steps"
                  inital_value={editTest?.steps}
                  onChange={handleInlineStepsChange}
                />
              </div>
              <div>
                <Label
                  htmlFor="test-expected_results"
                  className="text-sm font-medium text-gray-700"
                >
                  Expected Result
                </Label>
                <TipTapEditor
                  name="steps"
                  inital_value={editTest?.expected_result}
                  onChange={handleInlineResultChange}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Card className="relative mb-8 overflow-hidden">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">{test?.name}</CardTitle>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  size="sm"
                  className="text-emerald-600 border-emerald-600 hover:bg-emerald-50"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* <p className="text-gray-600">{sprint.description}</p> */}
              <p className="p-5">{test?.name}</p>
              <TipTapEditor inital_value={test?.description} />
              <TipTapEditor inital_value={test?.steps} />
              <TipTapEditor inital_value={test?.expected_result} />
            </div>
          </CardContent>
        </Card>
      )}

      <Separator className="my-4" />
      <h3 className="text-xl font-semibold mb-4">Test Runs</h3>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Run Status</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {runs?.map((run) => (
            <TestRunRows key={"rei test run id" + run?.id} run={run} />
          ))}
        </TableBody>
      </Table>
      <PaginagtionBottom total_items={total} />
    </div>
  );
}
