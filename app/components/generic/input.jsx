import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SingleInput({
  label,
  inputType,
  placeHolder,
  name,
  value,
  handler,
}) {
  return (
    <div className="relative w-full mb-3 space-y-2">
      <Label htmlFor={label}>{label}</Label>
      <Input
        name={name}
        type={inputType}
        onChange={handler}
        aria-label={label}
        placeholder={placeHolder}
        value={value}
      />
    </div>
  );
}

export function ReadOnlySingleInput({
  label,
  inputType,
  placeHolder,
  name,
  value,
  handler,
}) {
  return (
    <div className="relative w-full mb-3">
      <Label htmlFor={label}>{label}</Label>
      <Input
        readonly
        name={name}
        type={inputType}
        onChange={handler}
        aria-label={label}
        placeholder={placeHolder}
        value={value}
      />
    </div>
  );
}

export function PasswordInput({
  label,
  inputType,
  placeHolder,
  name,
  value,
  handler,
}) {
  return (
    <div className="relative w-full mb-3">
      <Label htmlFor={label}>{label}</Label>
      <Input
        name={name}
        type={inputType}
        onChange={handler}
        aria-label={label}
        placeholder={placeHolder}
        value={value}
      />
    </div>
  );
}

export function TextInput({ label, placeHolder, name, value, handler, cn }) {
  return (
    <div className="relative w-full mb-1 space-y-2">
      <Label htmlFor={label}>{label}</Label>
      <Textarea
        name={name}
        onChange={handler}
        aria-label={label}
        placeholder={placeHolder}
        value={value}
      />
    </div>
  );
}

export function CheckBoxInput({ label, name, handler, value }) {
  return (
    <div>
      <Label htmlFor={label}>
        <Input
          name={name}
          aria-label={label}
          value={value}
          checked={value}
          onChange={handler ? handler : null}
          type="checkbox"
        />
        {label}
      </Label>
    </div>
  );
}

export function SelectInput({ data, name, handler, label }) {
  return (
    <div className="relative w-full px-1 mb-3">
      <Label htmlFor={label}>{label}</Label>
      <Select
        name={name}
        className="block uppercase text-gray-600 text-xs font-bold w-full mb-2"
        onChange={handler}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {data.map((item, index) => {
            return (
              <SelectItem
                key={item.name + index}
                className="hover:bg-slate-300"
                value={item.id}
              >
                {item.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export function SingleInputNoLabel({
  label,
  inputType,
  placeHolder,
  name,
  value,
  handler,
}) {
  return (
    <div className="relative w-full flex justify-center items-center ">
      <Input
        name={name}
        type={inputType}
        onChange={handler}
        aria-label={label}
        placeholder={placeHolder}
        value={value}
      />
    </div>
  );
}

export function TextInputNoLabel({
  label,
  inputType,
  placeHolder,
  name,
  value,
  handler,
}) {
  return (
    <div className="relative w-full flex justify-center items-center">
      <TextInput
        name={name}
        type={inputType}
        onChange={handler}
        aria-label={label}
        placeholder={placeHolder}
        value={value}
      />
    </div>
  );
}

export function ReadOnlySingleInputNoLabel({
  label,
  inputType,
  placeHolder,
  name,
  value,
}) {
  return (
    <div className="relative w-full flex justify-center items-center">
      <Input
        readOnly
        name={name}
        type={inputType}
        aria-label={label}
        placeholder={placeHolder}
        value={value}
      />
    </div>
  );
}
