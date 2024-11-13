'use client'

import { motion } from 'framer-motion'
import { Code, Zap, Globe, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'

export default function AutoScribe() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-32 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              AutoScribe
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Generate test automation scripts in multiple languages automatically, reducing the time spent on writing and maintaining test code.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              Try Demo
            </Button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2"
          >
            <div className="relative">
            <div className="absolute inset-0 bg-blue-200 rounded-lg transform rotate-3 w-[500px] h-[525px]"></div> 
            <Image
              src="/AutoScribeimage.png?"
              alt="AutoScribe illustration"
              width={500}
              height={525}
              className="relative z-10 rounded-lg shadow-xl"
            />
        </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="w-8 h-8 text-indigo-600" />,
                title: "Multi-Language Support",
                description: "Generate test scripts in popular languages like Python, Java, and JavaScript."
              },
              {
                icon: <Zap className="w-8 h-8 text-indigo-600" />,
                title: "Intelligent Code Generation",
                description: "Create efficient and maintainable test code using best practices and patterns."
              },
              {
                icon: <Globe className="w-8 h-8 text-indigo-600" />,
                title: "Framework Integration",
                description: "Seamlessly integrate with popular test automation frameworks and tools."
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-20"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8">Why Choose AutoScribe?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Reduce test script creation time by up to 70%",
                "Ensure consistency across test suites",
                "Easily maintain and update test code",
                "Support for multiple programming languages",
                "Integration with CI/CD pipelines",
                "Continuous updates with latest best practices"
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Automate Your Test Script Creation?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start using AutoScribe today to streamline your test automation process.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.section>
      </main>

    </div>
  )
}