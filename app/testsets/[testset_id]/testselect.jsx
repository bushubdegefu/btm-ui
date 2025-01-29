"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function CheckboxReactHookFormMultiple({ items, options, onChange }) {
  // Handle checkbox changes
  //

  const handleCheckboxChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="w-full h-auto overflow-y-auto hide-scrollbar space-y-4 p-2 rounded-lg shadow-md">
      {items?.map((item) => (
        <div
          key={item.id}
          className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-md transition-colors duration-200"
        >
          <Checkbox
            value={item.id}
            checked={options?.includes(item.id)}
            onCheckedChange={() => handleCheckboxChange(item.id)}
            className="h-5 w-5 text-blue-500 border-gray-300 rounded-md"
          />
          <Label className="text-lg font-medium text-gray-800">
            {item.name}
          </Label>
        </div>
      ))}
    </div>
  );
}
