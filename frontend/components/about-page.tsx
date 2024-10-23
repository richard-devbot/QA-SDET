"use client";
import Image from "next/image";
import React from "react";
import { Bot, Eye, Code, Play, LineChart } from "lucide-react";
const services = [
  {
    icon: <Bot className="w-8 h-8 text-blue-600" />,
    title: "AI-Powered Test Idea Generation",
    description:
      "Generate comprehensive test scenarios using advanced AI algorithms.",
  },
  {
    icon: <Eye className="w-8 h-8 text-blue-600" />,
    title: "Intelligent Element Inspector",
    description:
      "Automatically identify and analyze web elements with precision.",
  },
  {
    icon: <Code className="w-8 h-8 text-blue-600" />,
    title: "Gherkin Feature Generator",
    description:
      "Transform user stories into clear, concise Gherkin feature files.",
  },
  {
    icon: <Code className="w-8 h-8 text-blue-600" />,
    title: "Automated Code Generation",
    description:
      "Generate test automation scripts in multiple languages automatically.",
  },
  {
    icon: <Play className="w-8 h-8 text-blue-600" />,
    title: "Web Agent Explorer",
    description:
      "Leverage AI to automatically explore and test complex user journeys.",
  },
  {
    icon: <LineChart className="w-8 h-8 text-blue-600" />,
    title: "Advanced Analytics",
    description:
      "Gain insights into your testing processes and identify areas for improvement with detailed reporting and analytics.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-white via-blue-200/50 to-white">
        <div className="flex flex-col items-center justify-start mt-32 max-w-7xl mx-auto gap-32">
          <div className="flex flex-col items-center justify-center gap-5 py-5">
            <span className="text-[4rem]">
              About{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                WaiGenie
              </span>
            </span>
            <span className="text-xl">
              Revolutionizing Quality Assurance with AI-powered solutions
            </span>
          </div>
          <div className="flex justify-center items-center gap-20">
            <div className="flex flex-col items-start justify-start w-[450px] gap-10">
              <span className="text-2xl text-[#0717A1]">Our Vision</span>
              <div className="flex flex-col gap-5">
                <p className="text-justify">
                  At Waigenie, we envision a future where QA processes are
                  seamlessly integrated with cutting-edge AI technology,
                  empowering teams to deliver flawless software at unprecedented
                  speeds.
                </p>
                <p className="text-justify">
                  We're building a platform that will revolutionize how
                  enterprises approach quality assurance, making it more
                  efficient, accurate, and adaptable to the ever-changing
                  landscape of software development.
                </p>
              </div>
            </div>
            <div>
              <Image
                src="/our_vision.png"
                width={400}
                height={300}
                alt="Our_vision"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-start gap-10">
            <span className="text-[2rem] text-[#0717A1]">Our Mission</span>
            <div className="bg-[#71B5E6] text-white px-10 py-5 max-w-5xl rounded-xl">
              <p className="p-10 text-center text-lg">
                Empower QA teams with cutting-edge AI solutions tailored for
                enterprise needs, enabling them to deliver high-quality software
                faster and more efficiently than ever before.
              </p>
            </div>
          </div>
          <div className="max-w-4xl my-10">
            <div className="mx-auto flex flex-col items-center justify-center gap-10">
              <span className="text-4xl text-center text-zinc-900 mb-12">
                What{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  WaiGenie
                </span>{" "}
                can do?
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white flex flex-col items-center rounded-lg p-6 text-gray-900 shadow-lg"
                  >
                    <div className="flex items-center justify-center mb-4">
                      {service.icon}
                    </div>
                    <span className="text-sm font-semibold text-blue-600 text-center mb-2">
                      {service.title}
                    </span>
                    <span className="text-gray-600 text-center text-sm">
                      {service.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-10">
            <span className="text-[2rem] text-[#5350FF] font-bold">
              How it works?
            </span>
            <div className="flex items-center">
              <div className="w-[300px] min-h-[300px] flex flex-col justify-center items-center gap-5 p-2">
                <div className="bg-[radial-gradient(50%_50%_at_50%_50%,_var(--tw-gradient-stops))] from-blue-400/70 to-blue-100/0.1 w-[150px] h-[150px] flex justify-center items-center">
                  <Image
                    src="/sign_up.png"
                    alt="step-1"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex flex-col justify-center items-center gap-5">
                  <div className="flex justify-between items-center gap-2 h-10">
                    <span className="bg-[#5350FF] text-white rounded-full size-8 flex justify-center items-center p-2">
                      1
                    </span>
                    <span className="text-[#5350FF] font-bold">Sign Up</span>
                  </div>
                  <div className="text-center text-xs">
                    Create your Waigenie account and set up your organization
                    profile.
                  </div>
                </div>
              </div>
              <div className="w-[300px] min-h-[300px] flex flex-col justify-center items-center gap-5 p-2">
                <div className="bg-[radial-gradient(50%_50%_at_50%_50%,_var(--tw-gradient-stops))] from-blue-400/70 to-blue-100/0.1 w-[150px] h-[150px] flex justify-center items-center">
                  <Image
                    src="/step_2.png"
                    alt="step-2"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex flex-col justify-center items-center gap-5">
                  <div className="flex justify-between items-center gap-2 h-10">
                    <span className="bg-[#5350FF] text-white rounded-full size-8 flex justify-center items-center p-2">
                      2
                    </span>
                    <span className="text-[#5350FF] font-bold">Connect</span>
                  </div>
                  <div className="text-center text-xs">
                    Integrate Waigenie with your existing QA tools and
                    workflows.
                  </div>
                </div>
              </div>
              <div className="w-[300px] min-h-[300px] flex flex-col justify-center items-center gap-5 p-2">
                <div className="bg-[radial-gradient(50%_50%_at_50%_50%,_var(--tw-gradient-stops))] from-blue-400/70 to-blue-100/0.1 w-[150px] h-[150px] flex justify-center items-center">
                  <Image
                    src="/step_3.png"
                    alt="step-3"
                    width={125}
                    height={100}
                  />
                </div>
                <div className="flex flex-col justify-center items-center gap-5">
                  <div className="flex justify-between items-center gap-2 h-10">
                    <span className="bg-[#5350FF] text-white rounded-full size-8 flex justify-center items-center p-2">
                      3
                    </span>
                    <span className="text-[#5350FF] font-bold">Analyze</span>
                  </div>
                  <div className="text-center text-xs">
                    Let our AI analyze your application and generate
                    comprehensive test scenarios.
                  </div>
                </div>
              </div>
              <div className="w-[300px] min-h-[300px] flex flex-col justify-center items-center gap-5 p-2">
                <div className="bg-[radial-gradient(50%_50%_at_50%_50%,_var(--tw-gradient-stops))] from-blue-400/70 to-blue-100/0.1 w-[150px] h-[150px] flex justify-center items-center">
                  <Image
                    src="/step_4.png"
                    alt="step-4"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex flex-col justify-center items-center gap-5">
                  <div className="flex justify-between items-center gap-2 h-10">
                    <span className="bg-[#5350FF] text-white rounded-full size-8 flex justify-center items-center p-2">
                      4
                    </span>
                    <span className="text-[#5350FF] font-bold">Optimize</span>
                  </div>
                  <div className="text-center text-xs">
                    Continuously improve your QA process with AI-driven insights
                    and recommendations.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-14 flex-col py-10">
            <span className="text-[2rem] text-[#5350FF] font-bold">
              Our Values
            </span>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
              <div className="flex flex-col gap-2 max-w-[300px] rounded-md shadow-xl p-5">
                <span className="text-[#5350FF]">Innovation</span>
                <span className="text-sm">
                  We're constantly pushing the boundaries of what's possible in
                  AI-powered QA.
                </span>
              </div>
              <div className="flex flex-col gap-2 max-w-[300px] rounded-md shadow-xl p-5">
                <span className="text-[#5350FF] font-semibold">
                  Customer Success
                </span>
                <span className="text-sm">
                  Your success is our success. We're committed to helping you
                  achieve your QA goals.
                </span>
              </div>
              <div className="flex flex-col gap-2 max-w-[300px] rounded-md shadow-xl p-5">
                <span className="text-[#5350FF] font-semibold">
                  Collaboration
                </span>
                <span className="text-sm">
                  We believe in the power of teamwork, both within our company
                  and with our clients.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
