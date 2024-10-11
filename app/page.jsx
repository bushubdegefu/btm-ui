import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BugPlay,
  BarChart3,
  Users,
  Zap,
  CheckCircle,
  Shield,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BugPlay className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-800">BTM</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#features"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#benefits"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Benefits
                </a>
              </li>
              <li>
                <a href="#cta" className="text-gray-600 hover:text-gray-800">
                  Get Started
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Welcome to BTM
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Streamline Your Bug Tracking and Test Management Process
            </p>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 py-3">
              Start Free Trial
            </Button>
          </div>
        </section>

        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<BugPlay className="h-12 w-12 text-emerald-600" />}
                title="Comprehensive Bug Tracking"
                description="Efficiently log, track, and manage bugs throughout your development lifecycle."
              />
              <FeatureCard
                icon={<BarChart3 className="h-12 w-12 text-emerald-600" />}
                title="Advanced Analytics"
                description="Gain insights with powerful reporting and visualization tools."
              />
              <FeatureCard
                icon={<Users className="h-12 w-12 text-emerald-600" />}
                title="Collaborative Workspace"
                description="Foster teamwork with real-time collaboration features and role-based access control."
              />
            </div>
          </div>
        </section>

        <section id="benefits" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Benefits of Using BTM
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BenefitItem
                icon={<Zap className="h-6 w-6 text-emerald-600" />}
                title="Increased Productivity"
                description="Streamline your workflow and reduce time spent on bug management."
              />
              <BenefitItem
                icon={<CheckCircle className="h-6 w-6 text-emerald-600" />}
                title="Improved Quality Assurance"
                description="Enhance your QA process with comprehensive test management tools."
              />
              <BenefitItem
                icon={<Shield className="h-6 w-6 text-emerald-600" />}
                title="Enhanced Security"
                description="Keep your data safe with our robust security measures and role-based access control."
              />
              <BenefitItem
                icon={<BarChart3 className="h-6 w-6 text-emerald-600" />}
                title="Data-Driven Decisions"
                description="Make informed decisions based on detailed analytics and reports."
              />
            </div>
          </div>
        </section>

        <section id="cta" className="py-20 bg-emerald-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Streamline Your Bug Tracking?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Join thousands of teams already using BTM to improve their
              development process.
            </p>
            <Button className="bg-white text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-3">
              Get Started Now
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">About BTM</h3>
              <p className="text-gray-400">
                BTM is a comprehensive bug tracking and test management solution
                designed to streamline your development process.
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul className="text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="hover:text-white">
                    Benefits
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p className="text-gray-400">Email: support@btm.com</p>
              <p className="text-gray-400">Phone: (123) 456-7890</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2023 BTM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-center mb-4">{icon}</div>
        <CardTitle className="text-xl font-semibold text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

function BenefitItem({ icon, title, description }) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    </div>
  );
}
