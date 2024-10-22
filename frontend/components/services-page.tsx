"use client";
import Image from "next/image";
import React from "react";
import { Inria_Serif } from "next/font/google";
import { ArrowBigRightDash, ArrowRight } from "lucide-react";

const Inria = Inria_Serif({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

interface SideTextProps {
  title: string;
  description: string;
}

const sideTextArr = [
  {
    title: "Increased Efficiency",
    description:
      "Reduce manual testing time by up to 70% with our AI-powered solutions.",
  },
  {
    title: "Improved Quality",
    description: "Catch more bugs and edge cases before they reach production.",
  },
  {
    title: "Reduce Costs",
    description:
      "Lower your QA expenses while improving test coverage and accuracy.",
  },
  {
    title: "Faster Time-To-Market",
    description:
      "Accelerate your software delivery pipeline with automated testing.",
  },
  {
    title: "Scalability",
    description:
      "Scale your testing efforts to meet the demands of your growing application.",
  },
  {
    title: "Continuous Improvement",
    description: "Continuously improve your testing processes with feedback.",
  },
];

const arr = [
  {
    title: "AI-Powered Test Idea Generation",
    description:
      "Generate comprehensive test scenarios using advanced AI algorithms.",
    image: "/placeholder.svg",
  },
  {
    title: "Intelligent Element Inspector",
    description:
      "Automatically identify and analyze web elements with precision.",
    image: "/placeholder.svg",
  },
  {
    title: "Gherkin Feature Generator",
    description:
      "Transform user stories into clear, concise Gherkin feature files.",
    image: "/placeholder.svg",
  },
  {
    title: "Automated Code Generation",
    description:
      "Generate test automation scripts in multiple languages automatically.",
    image: "/placeholder.svg",
  },
  {
    title: "Web Agent Explorer",
    description:
      "Leverage AI to automatically explore and test complex user journeys.",
    image: "/placeholder.svg",
  },
  {
    title: "Custom Integration Solutions",
    description:
      "Seamlessly integrate WAIGENIE into your existing QA workflow and tools.",
    image: "/placeholder.svg",
  },
];

export default function ServicesPage() {
  return (
    <>
      <main className="mt-32">
        <div className="flex flex-col justify-center items-center">
          <span className="text-5xl font-bold pt-10">OUR SERVICES</span>
        </div>
        <div className="flex w-full justify-center items-center gap-36 min-h-[40rem]">
          <div className="w-[500px] h-[500px] bg-[radial-gradient(50%_50%_at_50%_50%,_var(--tw-gradient-stops))] from-blue-500/40 to-blue-100/0.1 flex justify-center items-center backdrop-blur-md gap-20">
            <div className="w-[500px] text-center text-3xl text-black p-10 rounded-lg bg-transparent">
              Empower your QA team with cutting-edge AI solutions tailored for
              enterprise needs
            </div>
          </div>
          <div>
            <Image
              src="/about_graphic.png"
              alt="about_graphic"
              width={500}
              height={500}
            />
          </div>
        </div>
        <ListComp />
        <div className="flex justify-around items-center mx-14 h-[700px] bg-[#C9EFFF]/50 rounded-lg">
          <div
            className={`text-[6rem] flex flex-col justify-center items-start ${Inria.className}`}
          >
            <span>Why</span>
            <span className="text-[#432F91]">WaiGenie?</span>
          </div>
          <div className="w-[600px] flex flex-wrap">
            <div className="flex flex-col justify-center items-start gap-10">
              {sideTextArr.map((item, index) => (
                <SideText
                  key={index}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function SideText({ title, description }: SideTextProps) {
  return (
    <>
      <div className="flex justify-center items-center gap-5">
        <div className="p-4 bg-[#7A71E2] rounded-full">
          <ArrowRight className="size-6 text-white" />
        </div>
        <span className="flex flex-col gap-2">
          <span className="text-2xl font-bold">{title}</span>
          <span className="text-sm">{description}</span>
        </span>
      </div>
    </>
  );
}

function ListComp() {
  return (
    <>
      <div className="grid grid-cols-3 justify-center items-center max-w-6xl mx-auto gap-10 my-20 pb-10">
        {arr.map((item, index) => (
          <div
            className="border-2 rounded-lg min-w-[300px] min-h-[350px]"
            key={index}
          >
            <div className="p-2">
              <Image
                src={item.image}
                alt="about_graphic"
                width={200}
                height={200}
                className="p-2"
              />
            </div>
            <div className="text-center text-lg font-bold">{item.title}</div>
            <div className="text-center text-lg text-black rounded-lg bg-transparent px-5 py-2">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
