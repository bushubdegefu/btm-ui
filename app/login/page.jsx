"use client";

import React from "react";
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

export default function LoginPage() {
  function handleSubmit(event) {
    event.preventDefault();
    // Add your login logic here
    console.log("Login submitted");
  }

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
          <form onSubmit={() => handleSubmit()}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
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
