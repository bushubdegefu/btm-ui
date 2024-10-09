"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { NormalButton } from "./components/generic/button";
import { useTheme } from "next-themes";

import Link from "next/link";
import { SingleInput, TextInput } from "./components/generic/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Menu,
  Moon,
  Sun,
  Inbox,
  Mail,
  Send,
  ArchiveX,
  Trash2,
  Archive,
  File,
  Users2,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { LogInPage } from "./components/appcomps/Login";

const menuItems = [
  { href: "#sprints", label: "Sprints" },
  { href: "#requirements", label: "Requirements" },
  { href: "#tests", label: "Tests" },
  { href: "#testsets", label: "Testsets" },
  { href: "#issues", label: "Issues" },
];

export function MenubarBTM() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="bg-background text-foreground border-b p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Logo
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-4">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Mobile dropdown menu */}
          <div className="md:hidden">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" aria-label="Menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {menuItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      className="w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function SideBarBTM() {
  return (
    <div className="flex w-full h-full flex-col -p-1 bg-background">
      <div className="flex h-[52px] items-center justify-center px-4 py-2">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Project" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem
                className="hover:bg-gray-500 hover:text-white"
                value="apple"
              >
                Apple
              </SelectItem>
              <SelectItem
                className="hover:bg-gray-500 hover:text-white"
                value="banana"
              >
                Banana
              </SelectItem>
              <SelectItem
                className="hover:bg-gray-500 hover:text-white"
                value="blueberry"
              >
                Blueberry
              </SelectItem>
              <SelectItem
                className="hover:bg-gray-500 hover:text-white"
                value="grapes"
              >
                Grapes
              </SelectItem>
              <SelectItem
                className="hover:bg-gray-500 hover:text-white"
                value="pineapple"
              >
                Pineapple
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          <Button
            variant="secondary"
            className="w-full justify-start gap-2 hover:bg-gray-500 hover:text-white"
            asChild
          >
            <Link href="#">
              <Inbox className="h-4 w-4" />
              Sprint
            </Link>
          </Button>
          <Button
            variant="secondary"
            className="w-full justify-start gap-2 hover:bg-gray-500 hover:text-white"
            asChild
          >
            <Link href="#">
              <File className="h-4 w-4" />
              Requirement
            </Link>
          </Button>
          <Button
            variant="secondary"
            className="w-full justify-start gap-2 hover:bg-gray-500 hover:text-white"
            asChild
          >
            <Link href="#">
              <Send className="h-4 w-4" />
              Tests
            </Link>
          </Button>
          <Button
            variant="secondary"
            className="w-full justify-start gap-2 hover:bg-gray-500 hover:text-white"
            asChild
          >
            <Link href="#">
              <ArchiveX className="h-4 w-4" />
              Testsets
            </Link>
          </Button>
          <Button
            variant="secondary"
            className="w-full justify-start gap-2 hover:bg-gray-500 hover:text-white"
            asChild
          >
            <Link href="#">
              <Trash2 className="h-4 w-4" />
              Issues
            </Link>
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex md:flex-row min-w-96 overflow-x-hidden min-h-screen flex-col md:space-x-2 space-y-2 items-stretch justify-start p-5">
      <section></section>
      <section className="hidden md:block md:min-w-40 md:w-2/12 p-1 border-solid border-2 border-black">
        <SideBarBTM />
      </section>
      <section className="md:hidden pt-1 w-full scroll-pt-1 pb-1 border-solid border-2 border-black">
        <MenubarBTM />
      </section>
      <section className="flex max-h-max w-full md:w-10/12 p-5 items-center justify-center border-solid border-2 border-black ">
        <LogInPage />
      </section>
    </main>
  );
}
