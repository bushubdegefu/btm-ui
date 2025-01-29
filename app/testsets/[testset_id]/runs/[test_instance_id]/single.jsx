"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileIcon, Edit, Trash2, Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import PaginagtionBottom from "@/app/components/generic/pagination";
import {
  delete_testrun,
  get_testinstancetestruns,
  update_testrun,
} from "@/app/actions";
import { useUtilStore } from "@/app/store/utilcommon";

const initialDocuments = [
  { id: "1", name: "Document 1.pdf" },
  { id: "2", name: "Document 2.docx" },
  { id: "3", name: "Document 3.txt" },
];

const runStatusColors = {
  NA: "bg-gray-100 text-gray-800",
  NR: "bg-gray-100 text-gray-800",
  Blocked: "bg-purple-100 text-purple-800",
  Passed: "bg-green-100 text-green-800",
  Failed: "bg-red-100 text-red-800",
  InProgress: "bg-amber-100 text-black",
};

export default function InstanceRunsPage({ test_instance_id }) {
  const [documents, setDocuments] = useState(initialDocuments);
  const itemsPerPage = useUtilStore((state) => state.size);
  const currentPage = useUtilStore((state) => state.page);
  const refreshTrigor = useUtilStore((state) => state.refreshTrigor);
  const [results, setResults] = useState();
  const [total, setTotal] = useState();

  useEffect(() => {
    const reload = async () => {
      const items = await get_testinstancetestruns(test_instance_id);

      setResults(items.test_runs);
      setTotal(items.total);
    };
    reload();
  }, [itemsPerPage, currentPage, refreshTrigor]);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="border-t border-gray-200">
        <Tabs
          defaultValue="runs"
          className="w-full border border-gray-300 rounded-lg overflow-hidden"
        >
          <TabsList className="grid w-full grid-cols-2 bg-gray-200 p-1 rounded-lg">
            <TabsTrigger
              value="runs"
              className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
            >
              Test Runs
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
            >
              Documents
            </TabsTrigger>
          </TabsList>
          <TabsContent value="documents">
            <div className="h-64 overflow-y-auto">
              <ul className="divide-y divide-gray-200">
                {documents.map((doc) => (
                  <li key={doc.id} className="flex items-center px-6 py-4">
                    <FileIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{doc.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="runs">
            <div className="overflow-x-auto px-5 py-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Run ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Updated At</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results?.map((result) => (
                    <TestRunRows key={result?.id} run={result} />
                  ))}
                </TableBody>
              </Table>
              <PaginagtionBottom total_items={total} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export function TestRunRows({ run }) {
  const [editRun, setEditRun] = useState({
    id: run.id,
    run_status: run.run_status,
    result: run.result,
  });
  const [editingId, setEditingId] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const setRefreshTrigor = useUtilStore((state) => state.setRefreshTrigor);

  const handleDelete = async () => {
    console.log(editRun.id);
    await delete_testrun(run?.id);
    setRefreshTrigor();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await update_testrun(editRun);
    setRefreshTrigor();
    setEditingId(false);
  };

  return (
    <TableRow>
      <TableCell>{editRun?.id}</TableCell>
      <TableCell>
        {editingId ? (
          <Select
            value={editRun.run_status}
            onValueChange={(value) =>
              setEditRun({ ...editRun, run_status: value })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(runStatusColors).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <span
            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
              runStatusColors[run?.run_status]
            }`}
          >
            {run?.run_status}
          </span>
        )}
      </TableCell>
      <TableCell>
        {editingId ? (
          <input
            type="text"
            value={editRun?.result}
            onChange={(e) => setEditRun({ ...editRun, result: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        ) : (
          run?.result
        )}
      </TableCell>
      <TableCell>{run?.updated_at}</TableCell>
      <TableCell>{run?.created_at}</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          {editingId ? (
            <>
              <form onSubmit={handleSave}>
                <Button variant="ghost" size="icon" type="submit">
                  <Check className="h-4 w-4" />
                </Button>
              </form>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditingId(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditingId(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setIsOpen(true)}
                    variant="ghost"
                    size="icon"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this test run? This action
                      cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="destructive"
                      type="submit"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
