import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

// Sample data (you would replace this with actual data from your testset-runs-table)
const testSetRuns = [
  { id: 1, run_status: "Passed", severity: "Low" },
  { id: 2, run_status: "Failed", severity: "High" },
  { id: 3, run_status: "InProgress", severity: "Medium" },
  { id: 4, run_status: "Passed", severity: "Critical" },
  { id: 5, run_status: "Blocked", severity: "High" },
  { id: 6, run_status: "NA", severity: "Low" },
  { id: 7, run_status: "NR", severity: "Medium" },
  { id: 8, run_status: "Passed", severity: "High" },
  { id: 9, run_status: "Failed", severity: "Critical" },
  { id: 10, run_status: "Passed", severity: "Medium" },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82ca9d",
];

const ExecutionRateChart = ({ data }) => {
  const pieData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <ChartTooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

const GaugeChart = ({ value }) => {
  const data = [
    { name: "Pass", value: value },
    { name: "Fail", value: 100 - value },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          <Cell key="cell-0" fill="#00C49F" />
          <Cell key="cell-1" fill="#FF8042" />
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default function TestSetDashboard() {
  // Calculate execution rate
  const executionRate = testSetRuns.reduce((acc, run) => {
    acc[run.run_status] = (acc[run.run_status] || 0) + 1;
    return acc;
  }, {});

  // Calculate pass rate
  const passRate = (executionRate["Passed"] / testSetRuns.length) * 100;

  // Calculate issue distribution
  const issueDistribution = testSetRuns.reduce((acc, run) => {
    if (!acc[run.run_status]) {
      acc[run.run_status] = { Passed: 0, Failed: 0, Other: 0 };
    }
    if (run.run_status === "Passed") {
      acc[run.run_status].Passed++;
    } else if (run.run_status === "Failed") {
      acc[run.run_status].Failed++;
    } else {
      acc[run.run_status].Other++;
    }
    return acc;
  }, {});

  // Calculate severity distribution
  const severityDistribution = testSetRuns.reduce((acc, run) => {
    if (!acc[run.severity]) {
      acc[run.severity] = { Passed: 0, Failed: 0, Other: 0 };
    }
    if (run.run_status === "Passed") {
      acc[run.severity].Passed++;
    } else if (run.run_status === "Failed") {
      acc[run.severity].Failed++;
    } else {
      acc[run.severity].Other++;
    }
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Test Execution Dashboard</h1>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Execution Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                Passed: { label: "Passed", color: "hsl(var(--chart-1))" },
                Failed: { label: "Failed", color: "hsl(var(--chart-2))" },
                InProgress: {
                  label: "In Progress",
                  color: "hsl(var(--chart-3))",
                },
                Blocked: { label: "Blocked", color: "hsl(var(--chart-4))" },
                NA: { label: "NA", color: "hsl(var(--chart-5))" },
                NR: { label: "NR", color: "hsl(var(--chart-6))" },
              }}
            >
              <ExecutionRateChart data={executionRate} />
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pass Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                Pass: { label: "Pass", color: "hsl(var(--chart-1))" },
                Fail: { label: "Fail", color: "hsl(var(--chart-2))" },
              }}
            >
              <GaugeChart value={passRate} />
            </ChartContainer>
            <div className="text-center mt-4 text-2xl font-bold">
              {passRate.toFixed(2)}%
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Issue Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Run Status</TableHead>
                  <TableHead>Passed</TableHead>
                  <TableHead>Failed</TableHead>
                  <TableHead>Other</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(issueDistribution).map(([status, counts]) => (
                  <TableRow key={status}>
                    <TableCell>{status}</TableCell>
                    <TableCell>{counts.Passed}</TableCell>
                    <TableCell>{counts.Failed}</TableCell>
                    <TableCell>{counts.Other}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Severity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Severity</TableHead>
                  <TableHead>Passed</TableHead>
                  <TableHead>Failed</TableHead>
                  <TableHead>Other</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(severityDistribution).map(
                  ([severity, counts]) => (
                    <TableRow key={severity}>
                      <TableCell>{severity}</TableCell>
                      <TableCell>{counts.Passed}</TableCell>
                      <TableCell>{counts.Failed}</TableCell>
                      <TableCell>{counts.Other}</TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
