"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "./navbar-page";
import SessionProvider from "./session-provider";

const phrases = [
  "Test your Web Ideas",
  "Inspect your Web Elements",
  "Generate Gherkin Scenarios",
  "Generate Automation Scripts",
  "Explore Web Agents",
];

const titlesAndContext = [
  {
    title: "Generate Test Ideas Instantly",
    context:
      "Are you tired of manually coming up with test ideas for your web applications? Our Test Idea Generation feature uses AI to automatically generate test ideas based on user stories and selected web page elements.Simply enter a URL and select the elements you want to test, and our tool will generate a list of test ideas for you.Save time and increase your test coverage with Test Idea Generation.",
    videoSrc: "",
  },
  {
    title: "Identify and Extract Element Information",
    context:
      "Easily identify and extract information about web page elements for testing. Enter a URL and our tool will generate a CSV file containing information about all elements with IDs.Use this feature to quickly gather information about the elements on a page, making it easier to create and execute tests.",
    videoSrc: "",
  },
  {
    title: "Convert User Stories into Gherkin Feature Files",
    context:
      "Transform user stories into BDD Gherkin feature files with just a few clicks. Simply enter a user story and our tool will generate a Gherkin feature file for you. Use this feature to streamline your test case creation process and ensure consistency in your tests.",
    videoSrc: "",
  },
  {
    title: "Generate Automated Test Code with Gherkin Steps",
    context:
      "Save time and effort by generating automated test code based on Gherkin steps. Enter a URL, Gherkin feature steps, and select a language to generate automated test code. Our tool supports both Python and Java, making it easy to integrate with your existing testing framework.",
    videoSrc: "",
  },
  {
    title: "Make use of SDET Genie's AI-Powered Web Agent",
    context:
      "Use our AI-powered web agent to demonstrate the capabilities of SDET-Genie. Enter an objective and URL to start the web agent demo and see how it interacts with the web page. Use this feature to showcase the power of SDET-Genie to potential clients and stakeholders.",
    videoSrc: "",
  },
];
export default function HomePage() {
  return (
    <>
      <BackgroundBeamsWithCollision className="min-h-screen relative w-full">
        <div className="min-h-screen flex items-center justify-center dark:text-zinc-100 text-zinc-900">
          <TextAnimation />
          <div className="rounded-full absolute bottom-10 border border-zinc-600 p-2 dark:text-zinc-400 animate-bounce">
            <ArrowDown />
          </div>
        </div>
      </BackgroundBeamsWithCollision>
      <div className="bg-gradient-to-b from-blue-300 to-white dark:bg-gradient-to-b dark:from-blue-900 dark:to-black min-h-screen">
        <FeatureCarousel />
      </div>
      <div className="bg-white dark:bg-gradient-to-b dark:from-black dark:to-black">
        <ListComponent />
        {/* <div className="px-6 py-2">
          <div className="bg-gradient-to-b from-indigo-400 to-zinc-100 dark:from-blue-400 dark:to-zinc-900 h-[40rem] w-full rounded-xl flex flex-col justify-center items-center gap-20 mb-10 border border-gray-200 dark:border-none">
            <span className="text-white text-5xl font-bold drop-shadow-md">
              Start your journey with SDET Genie today!
            </span>
            <div className="flex justify-center items-center gap-2">
              <Link href="/signup">
                <Button
                  variant="outline"
                  className="rounded-lg px-4 py-2 bg-gradient-to-br from-blue-500 to-purple-400 border-none hover:text-gray-200 flex justify-center items-center gap-2 h-12"
                >
                  <span className="text-xl font-semibold">Get Started</span>
                  <ArrowUpRight className="text-white" />
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  variant="default"
                  className="rounded-lg px-4 py-2 border-none h-12"
                >
                  <span className="text-xl font-medium">Learn More</span>
                </Button>
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export function TextAnimation() {
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-md:text-3xl lg:text-8xl font-bold flex flex-col items-center justify-center gap-2 h-15">
      <span className="mb-2">The best way to </span>
      <div className="inline-block h-32 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentPhrase}
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            exit={{ y: -140 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="inline-block bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text h-32 p-0"
          >
            {phrases[currentPhrase]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function FeatureCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isControlled, setIsControlled] = useState(false);

  useEffect(() => {
    if (isControlled) {
      const interval = setInterval(() => {
        setIsControlled(false);
      }, 7000);
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % titlesAndContext.length
        );
        setDirection(1);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isControlled]);

  const nextSlide = () => {
    setIsControlled(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % titlesAndContext.length);
    setDirection(1);
  };

  const prevSlide = () => {
    setIsControlled(true);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + titlesAndContext.length) % titlesAndContext.length
    );
    setDirection(-1);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between p-8 bg-transparent min-h-screen max-w-7xl mx-auto">
      <div className="md:w-1/2 p-4 min-h-[320px] flex flex-col justify-between items-start">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: 20 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 * direction }}
            transition={{ duration: 0.2 }}
            className="flex flex-col justify-start items-start"
          >
            <span className="text-3xl text-black dark:text-white font-bold mb-4 max-w-xl">
              {titlesAndContext[currentIndex].title}
            </span>
            <span className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
              {titlesAndContext[currentIndex].context}
            </span>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-start items-center gap-2">
          <button
            onClick={prevSlide}
            className="bg-transparent p-2 rounded-full hover:text-zinc-400 transition-colors border dark:border-zinc-200 border-zinc-900"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-6 h-6 dark:text-zinc-100 group-hover:text-zinc-600 group-hover:dark:text-zinc-400 text-zinc-900" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-transparent p-2 rounded-full hover:text-zinc-400 transition-colors border dark:border-zinc-200 border-zinc-900 group"
            aria-label="Next slide"
          >
            <ArrowRight className="w-6 h-6 dark:text-zinc-100 group-hover:text-zinc-600 group-hover:dark:text-zinc-400 text-zinc-900" />
          </button>
        </div>
      </div>
      <div className="md:w-1/2 p-4 relative h-[400px] overflow-hidden rounded-2xl">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            className="absolute w-full h-full rounded-2xl"
            initial={{ x: 300 * direction, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300 * direction, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.5,
            }}
          >
            <div className="bg-gradient-to-br from-purple-500 via-orange-500 to-indigo-500 p-2 rounded-2xl shadow-lg w-[calc(100%-32px)] h-[calc(100%-32px)] flex items-center justify-center">
              {false ? (
                <img
                  src={titlesAndContext[currentIndex].videoSrc}
                  alt={`Video preview for ${titlesAndContext[currentIndex].title}`}
                  className="w-full h-full object-cover rounded-xl bg-blue-900"
                />
              ) : (
                <div className="w-full h-full rounded-xl bg-gray-300 relative flex justify-center items-center">
                  <span className="text-zinc-900">
                    Sample video here {currentIndex}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ListComponent() {
  return (
    <>
      <div className="h-[60rem] w-full flex flex-col justify-start items-center mx-auto">
        <span className="text-4xl font-semibold dark:text-zinc-100 text-zinc-900">
          Get your{" "}
          <span className="bg-gradient-to-br from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
            Genie
          </span>{" "}
          to do your testing
        </span>
        <div className="grid grid-cols-3 gap-20 mt-20 justify-center items-center">
          {[1, 2, 3].map((item) => (
            <ListItem key={item} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-20 mt-20 justify-center items-center">
          <ListItem />
          <ListItem />
        </div>
      </div>
    </>
  );
}
export function ListItem() {
  return (
    <>
      <div className="w-[400px] h-[300px] bg-white shadow dark:shadow-gray-100 rounded-2xl dark:bg-zinc-200 flex justify-center items-center border">
        <span className="text-zinc-900">Sample Content here</span>
      </div>
    </>
  );
}
