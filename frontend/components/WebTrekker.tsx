'use client'

import { motion } from 'framer-motion'
import { Globe, Compass, Map, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'

export default function WebTrekker() {
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
              WebTrekker
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Leverage AI to automatically explore and test complex user journeys, uncovering edge cases and issues that manual testing might miss.
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
              src="/WebTrekkerimage.png?"
              alt="WebTrekker illustration"
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
                icon: <Globe className="w-8 h-8 text-indigo-600" />,
                title: "Intelligent Exploration",
                description: "AI-driven exploration of web applications to uncover hidden paths and edge cases."
              },
              {
                icon: <Compass className="w-8 h-8 text-indigo-600" />,
                title: "Smart Path Analysis",
                description: "Analyze and optimize user journeys for improved user experience and conversion rates."
              },
              {
                icon: <Map className="w-8 h-8 text-indigo-600" />,
                title: "Visual Journey Mapping",
                description: "Generate visual maps of user journeys for easy understanding and analysis."
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
            <h2 className="text-3xl font-bold mb-8">Why Choose WebTrekker?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Uncover 40% more edge cases than manual testing",
                "Reduce time spent on exploratory testing by 60%",
                "Improve user experience with optimized journeys",
                "Identify potential conversion bottlenecks",
                "Generate comprehensive test scenarios automatically",
                "Continuous learning and improvement of test coverage"
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
          <h2 className="text-3xl font-bold mb-6">Ready to Explore Your Web Application Like Never Before?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start using WebTrekker today to uncover hidden issues and optimize user journeys.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.section>
      </main>

    </div>
  )
}