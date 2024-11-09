"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  Lightbulb,
  X,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
} from "lucide-react";

const faqs = [
  {
    question: "Can WAIGENIE handle complex test scenarios?",
    answer:
      "Yes, through: Multi-step action planning, Context-aware decision making, Dynamic validation strategies, Adaptive test flow management.",
  },
  {
    question: "How does WAIGENIE improve the QA process?",
    answer:
      "WAIGENIE uses AI to generate comprehensive test scenarios, automate test script creation, and provide intelligent analysis of test results, significantly reducing time and effort in the QA process.",
  },
  {
    question: "Can WAIGENIE integrate with existing testing frameworks?",
    answer:
      "Yes, WAIGENIE is designed to integrate seamlessly with popular testing frameworks, enhancing your current QA processes rather than replacing them entirely.",
  },
  {
    question: "How does WAIGENIE generate test scenarios?",
    answer:
      "WAIGENIE uses advanced language models and computer vision to analyze web pages, identify elements, and generate relevant test scenarios. It can create both positive and negative test cases, as well as consider edge cases and usability tests.",
  },
  {
    question: "Can WAIGENIE generate human-readable test cases?",
    answer:
      "Yes, WAIGENIE can generate test cases in Gherkin syntax, which is easy for both technical and non-technical stakeholders to understand.",
  },
];

const FAQItem = ({
  faq,
  isOpen,
  toggleOpen,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  toggleOpen: () => void;
}) => {
  const controls = useAnimation();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      controls.start({
        height: contentRef.current?.scrollHeight || "auto",
        opacity: 1,
        transition: { duration: 0.3, ease: "easeOut" },
      });
    } else {
      controls.start({
        height: 0,
        opacity: 0,
        transition: { duration: 0.3, ease: "easeIn" },
      });
    }
  }, [isOpen, controls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-white to-[#C9EFFF] rounded-xl shadow-lg p-6 mb-4 overflow-hidden border border-[#ACCEE6] hover:shadow-xl transition-shadow duration-300"
    >
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none group"
        onClick={toggleOpen}
      >
        <span className="text-xl font-semibold text-zinc-900 group-hover:text-black transition-all duration-300">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#ACCEE6] rounded-full p-2 group-hover:bg-[#C9EFFF] transition-all duration-300"
        >
          {isOpen ? (
            <Minus className="w-6 h-6 text-black" />
          ) : (
            <Plus className="w-6 h-6 text-black" />
          )}
        </motion.div>
      </button>
      <motion.div
        ref={contentRef}
        initial={{ height: 0, opacity: 0 }}
        animate={controls}
        className="overflow-hidden"
      >
        <p className="text-gray-700 mt-4 leading-relaxed text-lg">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default function CreativeContactPageWithEnhancedFAQ() {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  const [isFAQExpanded, setIsFAQExpanded] = useState(false);
  const [currentFAQIndex, setCurrentFAQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const faqContainerRef = useRef<HTMLDivElement>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  useEffect(() => {
    if (isFAQExpanded) {
      const timer = setInterval(() => {
        setCurrentFAQIndex((prevIndex) => (prevIndex + 1) % faqs.length);
      }, 8000);
      return () => clearInterval(timer);
    }
  }, [isFAQExpanded]);

  const scrollFAQ = (direction: "left" | "right") => {
    if (faqContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      faqContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col mt-28">
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900">
              Connect with our QA experts
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Looking to transform your QA process? Our Waigenie experts are
              ready to help you unlock the full potential of AI-driven testing.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pb-20">
            <div className="flex flex-col md:flex-row gap-2 w-full">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-[500px]">
                <div className="flex justify-between mb-4 border-b pb-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-4 h-4 border border-gray-300 flex items-center justify-center">
                      <span className="text-xs">x</span>
                    </div>
                  </div>
                </div>

                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Name:
                    </label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      className="w-full border-gray-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Mail:
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your mail id"
                      className="w-full border-gray-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message:
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message"
                      className="w-full min-h-[150px] border-gray-300"
                    />
                  </div>

                  <Button className="w-full bg-[#ACCEE6] text-black hover:bg-[#C9EFFF] transition-all duration-300 transform hover:scale-105">
                    Send Message
                  </Button>
                </form>
              </div>

              <div className="md:self-end">
                <Image
                  src="/writingmessage.png?height=100&width=100"
                  alt="QA Expert Illustration"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="w-full lg:w-auto mt-0 md:mt-0 space-y-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 space-y-6">
                <div className="flex items-center space-x-4 hover:transform hover:translate-x-2 transition-transform duration-300">
                  <div className="bg-[#ACCEE6] rounded-full p-3">
                    <Phone className="h-6 w-6 text-black" />
                  </div>
                  <span className="text-lg font-medium">1234567890</span>
                </div>

                <div className="flex items-center space-x-4 hover:transform hover:translate-x-2 transition-transform duration-300">
                  <div className="bg-[#ACCEE6] rounded-full p-3">
                    <Mail className="h-6 w-6 text-black" />
                  </div>
                  <span className="text-lg font-medium">
                    waigenie@gmail.com
                  </span>
                </div>

                <div className="flex items-center space-x-4 hover:transform hover:translate-x-2 transition-transform duration-300">
                  <div className="bg-[#ACCEE6] rounded-full p-3">
                    <MapPin className="h-6 w-6 text-black" />
                  </div>
                  <span className="text-lg font-medium">
                    123, XXX, abc-0000
                  </span>
                </div>

                <div className="flex items-center space-x-6 pt-4">
                  <Link
                    href="#"
                    className="bg-[#ACCEE6] p-3 rounded-full text-black hover:bg-[#C9EFFF] transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin className="h-6 w-6" />
                  </Link>
                  <Link
                    href="#"
                    className="bg-[#ACCEE6] p-3 rounded-full text-black hover:bg-[#C9EFFF] transition-all duration-300 hover:scale-110"
                  >
                    <Twitter className="h-6 w-6" />
                  </Link>
                  <Link
                    href="#"
                    className="bg-[#ACCEE6] p-3 rounded-full text-black hover:bg-[#C9EFFF] transition-all duration-300 hover:scale-110"
                  >
                    <Github className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Enhanced Creative FAQ Section */}
          <div className="mt-16">
            <motion.div
              initial={false}
              animate={{ height: isFAQExpanded ? "auto" : "60px" }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-[#ACCEE6]"
            >
              <button
                onClick={() => setIsFAQExpanded(!isFAQExpanded)}
                className="w-full py-4 px-8 flex justify-between items-center text-sm bg-[#ACCEE6] hover:bg-[#C9EFFF] text-black transition-all duration-300 h-fit"
              >
                <span className="text-2xl font-bold flex items-center">
                  <Lightbulb className="w-8 h-8 mr-3" />
                  Illuminate Your Knowledge
                </span>
                {isFAQExpanded ? (
                  <X className="w-8 h-8" />
                ) : (
                  <motion.span
                    className="text-lg font-medium"
                    animate={{
                      opacity: [1, 0.5, 1],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    Click to explore FAQs
                  </motion.span>
                )}
              </button>
              <AnimatePresence>
                {isFAQExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-8"
                  >
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold mb-4 text-zinc-900">
                        FAQ Spotlight
                      </h3>
                      <motion.div
                        key={currentFAQIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <FAQItem
                          faq={faqs[currentFAQIndex]}
                          isOpen={true}
                          toggleOpen={() => {}}
                        />
                      </motion.div>
                    </div>
                    <div className="relative">
                      <div
                        ref={faqContainerRef}
                        className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide"
                      >
                        {faqs.map((faq, index) => (
                          <motion.div
                            key={index}
                            className="flex-shrink-0 w-96"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FAQItem
                              faq={faq}
                              isOpen={openFAQIndex === index}
                              toggleOpen={() => toggleFAQ(index)}
                            />
                          </motion.div>
                        ))}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => scrollFAQ("left")}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#ACCEE6] text-black rounded-full p-3 shadow-lg hover:bg-[#C9EFFF] transition-all duration-300"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => scrollFAQ("right")}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#ACCEE6] text-black rounded-full p-3 shadow-lg hover:bg-[#C9EFFF] transition-all duration-300"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </motion.button>
                    </div>
                    <div className="mt-8 text-center">
                      <Link
                        href="/FAQ"
                        className="inline-block bg-[#ACCEE6] text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-[#C9EFFF] hover:shadow-xl transform hover:scale-105"
                      >
                        Explore All FAQs
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
