"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLogInStore } from "../store/loginstore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import jsCookie from "js-cookie";
import { loggin } from "../actions";
import { useUtilStore } from "../store/utilcommon";

export default function LoginPage() {
  const login = useLogInStore((state) => state.setToken);
  const status = useLogInStore((state) => state.blue_admin_token);
  const token = useLogInStore((state) => state.access_token);
  const refresh_token = useLogInStore((state) => state.refresh_token);
  const current_project = useLogInStore((state) => state.current_project);
  const current_user = useLogInStore((state) => state.user);
  const getUserProjects = useLogInStore((state) => state.getUserProjects);
  const pageSize = useUtilStore((state) => state.size);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    let logindata = {};
    const formData = new FormData(e.currentTarget);
    formData.forEach((value, key) => {
      logindata[key] = value;
    });
    const resp = await loggin(logindata);

    login(resp);
  }

  useEffect(() => {
    if (status) {
      jsCookie.set("access_token", token, { expires: 7, path: "/" });
      jsCookie.set("refresh_token", refresh_token, {
        expires: 7,
        path: "/",
      });
      jsCookie.set("user", JSON.stringify(current_user), {
        expires: 7,
        path: "/",
      });
      jsCookie.set("current_project", JSON.stringify(current_project), {
        expires: 7,
        path: "/",
      });
      jsCookie.set("page_size", pageSize, { expires: 7, path: "/" });
      jsCookie.set("current_page", 1, { expires: 7, path: "/" });
      router.push("/sprints");
    }
  }, [status]);

  // useEffect(() => {
  //   // let curr_proj = jsCookie.get("current_project");
  //   if (curr_proj != null) {
  //     router.push("/sprints");
  //   }
  // }, [current_project]);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-emerald-700">BTM</h1>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Log in to your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
            </div>
            {/* {error && (
              <div className="text-red-600 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )} */}
            <Button
              type="submit"
              className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Log in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <a href="#" className="text-sm text-emerald-600 hover:underline">
            Forgot your password?
          </a>
        </CardFooter>
      </Card>
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="text-emerald-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
