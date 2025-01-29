"use client";

// Use usePathname for catching route name.
import { useParams, usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import SideBarLayout from "./navbar";
import { Button } from "@/components/ui/button";
import { ChevronDown, Bell } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUtilStore } from "./store/utilcommon";
import { useLogInStore } from "./store/loginstore";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const inter = Inter({ subsets: ["latin"] });

const AppHistoryHandlerListener = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pushHistory = useUtilStore((state) => state.pushHistory);
  const popHistory = useUtilStore((state) => state.popHistory);
  //  for recording history
  useEffect(() => {
    // Make sure we are running on the client side and router is available
    if (!router || !router.events) return;

    // Handler for route change events
    const handleRouteChange = (url) => {
      pushHistory(pathname);
    };

    // Listen for route change events
    router.events.on("routeChangeComplete", handleRouteChange);

    // Cleanup listener when the component unmounts
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, pathname, pushHistory]);

  //  for when back button is pushed
  useEffect(() => {
    // Function to handle the popstate event (back button press)
    const handleBackButton = (event) => {
      popHistory();
    };

    // Add event listener for the popstate event
    window.addEventListener("popstate", handleBackButton);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  return <> </>;
};

export const LayoutProvider = ({ children }) => {
  const pathname = usePathname();
  const params = useParams();

  if (pathname === "/dashboard" || pathname == "/login") {
    return (
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
          <AppHistoryHandlerListener />
          <div className="flex w-full h-screen bg-gray-100">{children}</div>
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
          <AppHistoryHandlerListener />
          <ResizablePanelGroup
            className="flex flex-col  overflow-hidden  h-screen"
            direction="horizontal"
          >
            <ResizablePanel className="bushu" defaultSize={15}>
              <SideBarLayout />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={85}>
              <div className="flex h-screen bg-gray-100">
                <main className="flex-1 overflow-y-auto">
                  {/* Header */}
                  <header className="bg-white shadow-sm">
                    <div className="max-w-full mx-auto py-1 px-1 sm:px-6 lg:px-8 flex justify-between items-start">
                      <Breadcrumb>
                        <BreadcrumbList>
                          <BreadcrumbItem
                            className={params?.testset_id ? "" : "hidden"}
                          >
                            <BreadcrumbLink
                              href={`/testsets/${params?.testset_id}`}
                            >
                              Test Set
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator
                            className={params?.test_instance_id ? "" : "hidden"}
                          />
                          <BreadcrumbItem
                            className={params?.test_instance_id ? "" : "hidden"}
                          >
                            <BreadcrumbLink
                              href={`/testsets/${params?.testset_id}/runs/${params?.test_instance_id}`}
                            >
                              Runs
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbItem
                            className={params?.sprint_id ? "" : "hidden"}
                          >
                            <BreadcrumbLink
                              href={`/sprints/${params?.sprint_id}`}
                            >
                              Sprint
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator
                            className={params?.requirement_id ? "" : "hidden"}
                          />
                          <BreadcrumbItem
                            className={params?.requirement_id ? "" : "hidden"}
                          >
                            <BreadcrumbLink
                              href={`/sprints/${params?.sprint_id}/requirements/${params?.requirement_id}`}
                            >
                              Requirments
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator
                            className={params?.test_id ? "" : "hidden"}
                          />
                          <BreadcrumbItem
                            className={params?.test_id ? "" : "hidden"}
                          >
                            <BreadcrumbLink
                              href={`/sprints/${params?.sprint_id}/requirements/${params?.requirement_id}/tests/${params?.test_id}`}
                            >
                              Tests
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>
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
            </ResizablePanel>
          </ResizablePanelGroup>
        </body>
      </html>
    );
  }
};
