"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart2, DollarSign, Flag, Star, User } from "lucide-react";

const SingleUserStorySummary = ({ initialData, teamMembers }) => {
  const [data, setData] = useState(initialData);
  const [editingField, setEditingField] = useState(null);

  const renderStars = (value, field) => {
    return (
      <div className="flex">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 cursor-pointer ${index < value ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              onClick={() => handleStarClick(field, index + 1)}
            />
          ))}
      </div>
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const handleStarClick = (field, value) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: name === "progress" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (field, value) => {
    if (field === "assignee") {
      const selectedAssignee = teamMembers.find(
        (member) => member.id === value,
      );
      if (selectedAssignee) {
        setData((prevData) => ({ ...prevData, assignee }));
      }
    } else {
      setData((prevData) => ({ ...prevData, [field]: value }));
    }
  };

  const handleBlur = () => {
    setEditingField(null);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <Card className="w-3/4">
        <CardHeader>
          {editingField === "title" ? (
            <Input
              name="title"
              value={data.title}
              onChange={handleInputChange}
              onBlur={handleBlur}
              autoFocus
            />
          ) : (
            <CardTitle onClick={() => setEditingField("title")}>
              {data.title}
            </CardTitle>
          )}
        </CardHeader>
        <CardContent className="grid w-3/4 gap-4">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">Progress:</span>
            {editingField === "progress" ? (
              <Input
                type="number"
                name="progress"
                value={data.progress}
                onChange={handleInputChange}
                onBlur={handleBlur}
                min={0}
                max={100}
                className="w-16"
                autoFocus
              />
            ) : (
              <Progress
                value={data.progress}
                className="flex-grow"
                onClick={() => setEditingField("progress")}
              />
            )}
            <span className="text-sm font-medium">{data.progress}%</span>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">Business Value:</span>
            {renderStars(data.businessValue, "businessValue")}
          </div>

          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">Effort/Complexity:</span>
            {renderStars(data.effort, "effort")}
          </div>

          <div className="flex items-center gap-2">
            <Flag className={`w-4 h-4 ${getPriorityColor(data.priority)}`} />
            <span className="text-sm font-medium">Priority:</span>
            <Select
              value={data.priority}
              onValueChange={(value) => handleSelectChange("priority", value)}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium">Assignee:</span>
            <Select
              value={data.assignee.id}
              onValueChange={(value) => handleSelectChange("assignee", value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src={data.assignee.avatar}
                        alt={data.assignee.name}
                      />
                      <AvatarFallback>
                        {data.assignee.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{data.assignee.name}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{member.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleUserStorySummary;
