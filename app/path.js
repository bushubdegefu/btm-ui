"use client";

// Use usePathname for catching route name.
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import SideBarLayout from "./navbar";
import { Button } from "@/components/ui/button";
import { ChevronDown, Bell } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const LayoutProvider = ({ children }) => {
  const pathname = usePathname();

  if (pathname === "/dashboard" || pathname == "/login") {
    return (
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
          <div className="flex w-full h-screen bg-gray-100">{children}</div>
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
          <div className="flex h-screen bg-gray-100">
            <SideBarLayout />
            <div className="flex h-screen w-full bg-gray-100">
              <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <header className="bg-white shadow-sm">
                  <div className="max-w-full mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
                      Dashboard
                    </h2>
                    <div className="flex items-center">
                      <Button variant="outline" size="icon" className="mr-2">
                        <Bell className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center">
                        <img
                          className="h-8 w-8 rounded-full"
                          src="/favicon.ico?height=32&width=32"
                          alt="User"
                        />
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </div>
                    </div>
                  </div>
                </header>

                {/* Content */}
                <div className="w-full mx-auto py-6 sm:px-6 lg:px-8">
                  {/* Dashboard Content */}
                  <div className="bg-white  overflow-hidden shadow-sm sm:rounded-lg">
                    {children}
                  </div>
                </div>
              </main>
            </div>
          </div>
        </body>
      </html>
    );
  }
};
