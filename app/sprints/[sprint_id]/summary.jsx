"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, Target, Edit, Check } from "lucide-react";

const initialData = {
  title: "Implement user authentication",
  storyPoints: 5,
  status: "In Progress",
  businessValue: 8,
  progress: 60,
};

export default function UserStorySummary() {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(initialData);

  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "bg-gray-500";
      case "In Progress":
        return "bg-blue-500";
      case "Done":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleInputChange = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <Card className="w-full ">
      <CardHeader className="flex flex-row items-center justify-between">
        {isEditing ? (
          <Input
            value={data.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="text-lg font-semibold"
          />
        ) : (
          <CardTitle className="text-lg font-semibold">{data.title}</CardTitle>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <Check className="h-4 w-4" />
          ) : (
            <Edit className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium">Story Points:</span>
          </div>
          {isEditing ? (
            <Input
              type="number"
              value={data.storyPoints}
              onChange={(e) =>
                handleInputChange("storyPoints", parseInt(e.target.value))
              }
              className="w-20 text-right"
            />
          ) : (
            <span className="text-sm font-bold">{data.storyPoints}</span>
          )}
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <Select
                value={data.status}
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="To Do">To Do</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge className={getStatusColor(data.status)}>
                {data.status}
              </Badge>
            )}
          </div>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium">Business Value:</span>
          </div>
          {isEditing ? (
            <Input
              type="number"
              value={data.businessValue}
              onChange={(e) =>
                handleInputChange("businessValue", parseInt(e.target.value))
              }
              className="w-20 text-right"
            />
          ) : (
            <span className="text-sm font-bold">{data.businessValue}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Progress:</span>
          </div>
          {isEditing ? (
            <Input
              type="number"
              value={data.progress}
              onChange={(e) =>
                handleInputChange("progress", parseInt(e.target.value))
              }
              className="w-20 text-right"
            />
          ) : (
            <span className="text-sm font-bold">{data.progress}%</span>
          )}
        </div>
        <Progress value={data.progress} className="w-full" />
      </CardFooter>
    </Card>
  );
}
