'use client'

import { FaRobot, FaSearch, FaFileAlt, FaCode, FaGlobe, FaPuzzlePiece } from 'react-icons/fa';
import { useState } from 'react';

export default function Services() {
  const [activeService, setActiveService] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-8 text-center">Our Services</h1>
        <p className="text-xl text-center mb-12">
          Empower your QA team with cutting-edge AI solutions tailored for enterprise needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              isActive={activeService === index}
              onClick={() => setActiveService(index)}
            />
          ))}
        </div>

        {activeService !== null && (
          <ServiceDetails {...services[activeService]} />
        )}

        <div className="mt-16 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Choose SDET-Genie for Your Enterprise?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BenefitCard title="Increase Efficiency" description="Reduce manual testing time by up to 70% with our AI-powered solutions." />
            <BenefitCard title="Improve Quality" description="Catch more bugs and edge cases before they reach production." />
            <BenefitCard title="Reduce Costs" description="Lower your QA expenses while improving test coverage and accuracy." />
            <BenefitCard title="Faster Time-to-Market" description="Accelerate your software delivery pipeline with automated testing." />
            <BenefitCard title="Scalability" description="Easily scale your testing efforts as your product and user base grow." />
            <BenefitCard title="Continuous Improvement" description="Our AI learns and adapts, constantly improving your testing process." />
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your QA Process?</h2>
          <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300">
            Schedule a Demo
          </button>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, shortDescription, isActive, onClick }) {
  return (
    <div
      className={`bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl cursor-pointer transition duration-300 ${
        isActive ? 'ring-2 ring-pink-500' : 'hover:bg-opacity-20'
      }`}
      onClick={onClick}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p>{shortDescription}</p>
    </div>
  );
}

function ServiceDetails({ title, fullDescription, features, caseStudy }) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl">
      <h3 className="text-3xl font-bold mb-4">{title}</h3>
      <p className="mb-6">{fullDescription}</p>
      <h4 className="text-2xl font-semibold mb-3">Key Features:</h4>
      <ul className="list-disc list-inside mb-6">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <div className="bg-indigo-900 bg-opacity-50 p-4 rounded-lg">
        <h4 className="text-xl font-semibold mb-2">Case Study: {caseStudy.company}</h4>
        <p>{caseStudy.description}</p>
        <p className="mt-2 font-semibold">{caseStudy.result}</p>
      </div>
    </div>
  );
}

function BenefitCard({ title, description }) {
  return (
    <div className="bg-indigo-800 bg-opacity-50 rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

const services = [
  {
    icon: <FaRobot className="text-pink-400" />,
    title: "AI-Powered Test Idea Generation",
    shortDescription: "Generate comprehensive test scenarios using advanced AI algorithms.",
    fullDescription: "Our AI-powered system analyzes your application structure, user flows, and historical data to generate comprehensive test scenarios. This ensures thorough coverage of both common paths and edge cases, significantly reducing the risk of overlooking critical test cases.",
    features: [
      "Automatic generation of test cases based on application analysis",
      "Coverage of edge cases and unusual user flows",
      "Integration with your existing test management tools",
      "Continuous learning and improvement of test case generation"
    ],
    caseStudy: {
      company: "TechCorp Inc.",
      description: "TechCorp integrated our AI-Powered Test Idea Generation into their QA process for a complex e-commerce platform.",
      result: "Result: 40% increase in test coverage and 25% reduction in post-release bugs."
    }
  },
  {
    icon: <FaSearch className="text-green-400" />,
    title: "Intelligent Element Inspector",
    shortDescription: "Automatically identify and analyze web elements with precision.",
    fullDescription: "Our Intelligent Element Inspector uses computer vision and machine learning to automatically identify and analyze web elements. This dramatically reduces the time spent on manual inspection and significantly decreases the likelihood of human error in element identification.",
    features: [
      "Automatic element detection and classification",
      "Generation of robust, reliable locators",
      "Integration with popular test automation frameworks",
      "Support for dynamic and single-page applications"
    ],
    caseStudy: {
      company: "FinanceApp Ltd.",
      description: "FinanceApp used our Intelligent Element Inspector to automate testing of their complex, data-heavy dashboards.",
      result: "Result: 60% reduction in test script maintenance time and improved test stability."
    }
  },
  {
    icon: <FaFileAlt className="text-yellow-400" />,
    title: "Gherkin Feature Generator",
    shortDescription: "Transform user stories into clear, concise Gherkin feature files.",
    fullDescription: "Our Gherkin Feature Generator uses natural language processing to transform user stories and requirements into clear, concise Gherkin feature files. This ensures consistent communication between business stakeholders, developers, and QA teams, reducing misunderstandings and improving overall product quality.",
    features: [
      "Automatic generation of Gherkin syntax from plain text",
      "Support for complex scenarios and scenario outlines",
      "Integration with popular BDD frameworks",
      "Customizable templates to match your team's style"
    ],
    caseStudy: {
      company: "HealthTech Solutions",
      description: "HealthTech adopted our Gherkin Feature Generator to improve communication in their agile development process.",
      result: "Result: 30% reduction in requirement clarification meetings and faster sprint deliveries."
    }
  },
  {
    icon: <FaCode className="text-blue-400" />,
    title: "Automated Code Generation",
    shortDescription: "Generate test automation scripts in multiple languages automatically.",
    fullDescription: "Our Automated Code Generation service creates test automation scripts in multiple programming languages based on your test scenarios and application structure. This significantly reduces development time, ensures consistent code quality, and allows your QA team to focus on more complex testing tasks.",
    features: [
      "Support for multiple programming languages and frameworks",
      "Generation of readable, maintainable code",
      "Integration with version control systems",
      "Automatic updates based on application changes"
    ],
    caseStudy: {
      company: "CloudSys Technologies",
      description: "CloudSys used our Automated Code Generation to rapidly build a test suite for their new cloud management platform.",
      result: "Result: 70% reduction in test script development time and 100% increase in test coverage."
    }
  },
  {
    icon: <FaGlobe className="text-purple-400" />,
    title: "Web Agent Explorer",
    shortDescription: "Leverage AI to automatically explore and test complex user journeys.",
    fullDescription: "Our Web Agent Explorer uses advanced AI algorithms to autonomously navigate and test your web application. It simulates real user behavior, explores different paths, and identifies potential issues without the need for pre-defined scripts. This is particularly valuable for complex applications with numerous possible user journeys.",
    features: [
      "Autonomous exploration of web applications",
      "Identification of performance bottlenecks and usability issues",
      "Generation of detailed reports and test cases",
      "Support for authentication and complex state management"
    ],
    caseStudy: {
      company: "SocialConnect Platform",
      description: "SocialConnect employed our Web Agent Explorer to test their social media management tool with millions of possible user paths.",
      result: "Result: Discovered 15 critical bugs that manual testing had missed, improving overall platform stability."
    }
  },
  {
    icon: <FaPuzzlePiece className="text-red-400" />,
    title: "Custom Integration Solutions",
    shortDescription: "Seamlessly integrate SDET-Genie into your existing QA workflow and tools.",
    fullDescription: "We offer tailored integration solutions to seamlessly incorporate SDET-Genie into your existing QA workflows and toolchain. Our team of experts works closely with your organization to ensure smooth adoption, maximum efficiency, and optimal use of SDET-Genie's capabilities within your unique environment.",
    features: [
      "Custom API development for integration with your tools",
      "Workflow optimization consulting",
      "On-premise deployment options for enhanced security",
      "Dedicated support and training for your team"
    ],
    caseStudy: {
      company: "MegaCorp Enterprises",
      description: "MegaCorp needed a custom solution to integrate SDET-Genie with their proprietary test management system.",
      result: "Result: Successful integration led to a 50% improvement in overall QA efficiency and faster product releases."
    }
  }
];