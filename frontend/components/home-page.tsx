"use client";
import { Puzzle, Settings, Users, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
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
  "Explore AI Web Agents",
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BackgroundBeamsWithCollision className="min-h-screen relative w-full">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="min-h-screen flex items-center justify-center dark:text-zinc-100 text-zinc-900"
        >
          <TextAnimation />
          <motion.div
            className="rounded-full absolute bottom-10 border border-zinc-600 p-2 dark:text-zinc-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown />
          </motion.div>
        </motion.div>
      </BackgroundBeamsWithCollision>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-b from-blue-300 to-white dark:bg-gradient-to-b dark:from-blue-900 dark:to-black min-h-screen"
      >
        <FeatureCarousel />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white dark:bg-gradient-to-b dark:from-black dark:to-black"
      >
        <ListComponent />
        <EnhancedB2BSection />
      </motion.div>
    </motion.div>
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="h-[60rem] w-full flex flex-col justify-start items-center mx-auto"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-semibold dark:text-zinc-100 text-zinc-900"
        >
          Get your{" "}
          <motion.span
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent"
          >
            Genie
          </motion.span>{" "}
          to do your testing
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-3 gap-20 mt-20 justify-center items-center"
        >
          {[1, 2, 3].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
            >
              <ListItem />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="grid grid-cols-2 gap-20 mt-20 justify-center items-center"
        >
          {[1, 2].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.6 + index * 0.2 }}
            >
              <ListItem />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}

export function ListItem() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="w-[400px] h-[300px] bg-white shadow dark:shadow-gray-100 rounded-2xl dark:bg-zinc-200 flex justify-center items-center border"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-900"
        >
          Sample Content here
        </motion.span>
      </motion.div>
    </>
  );
}

const features = [
  {
    icon: <Puzzle className="w-12 h-12 text-indigo-500" />,
    title: "Customized Framework",
    description: "Tailored solutions based on your specific requirements",
  },
  {
    icon: <Settings className="w-12 h-12 text-indigo-500" />,
    title: "Flexible Features",
    description: "Modify and adapt every feature to meet your unique needs",
  },
  {
    icon: <Users className="w-12 h-12 text-indigo-500" />,
    title: "Dedicated Support",
    description: "Expert assistance throughout implementation and beyond",
  },
];

export function EnhancedB2BSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }));
  }, [controls]);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-br from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
              WAIGENIE
            </span>{" "}
            for Business
          </span>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-5">
            Empower your enterprise with customized AI-driven QA solutions that
            adapt to your unique challenges
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
            >
              <Card
                className="h-full transition-all duration-300 hover:shadow-xl bg-white/80 backdrop-blur-sm"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <motion.div
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="mb-6"
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full -mr-48 -mt-48 opacity-50" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full -ml-48 -mb-48 opacity-50" />

          <div className="relative z-10 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h3 className="text-3xl font-bold mb-6">
                Tailored for Your Success
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                At WAIGENIE, we understand that every business has unique
                challenges. Our B2B solutions offer:
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Customized frameworks",
                  "Flexible features",
                  "Scalable solutions",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.2 }}
                  >
                    <ChevronRight className="w-6 h-6 text-indigo-500 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Link
                href={"/Consultation"}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <span className="mr-2">Schedule a Consultation</span>
                <ArrowRight className="w-5 h-5 inline-block" />
              </Link>
            </div>
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="relative"
              >
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="B2B Solutions Illustration"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-purple-600/20 rounded-lg" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
