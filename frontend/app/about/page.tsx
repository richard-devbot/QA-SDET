import { FaRobot, FaBug, FaCode, FaChartLine } from 'react-icons/fa';
import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-8 text-center">About SDET-Genie</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg">
              SDET-Genie is revolutionizing quality assurance with AI-powered automation. We empower QA teams to deliver exceptional software faster and more efficiently than ever before.
            </p>
          </div>
          <div className="relative h-64 md:h-auto">
            <Image
              src="/mission-illustration.svg"
              alt="SDET-Genie Mission"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        </div>
        
        <h2 className="text-4xl font-bold mb-8 text-center">What SDET-Genie Can Do</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {capabilities.map((capability, index) => (
            <CapabilityCard key={index} {...capability} />
          ))}
        </div>
        
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl">
          <h2 className="text-3xl font-semibold mb-4">Why Choose SDET-Genie?</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Cutting-edge AI technology tailored for QA</li>
            <li>Seamless integration with existing tools and workflows</li>
            <li>Significant time and resource savings</li>
            <li>Continuous learning and improvement</li>
            <li>Dedicated support from QA and AI experts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function CapabilityCard({ icon, title, description }) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl flex flex-col items-center text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

const capabilities = [
  {
    icon: <FaRobot className="text-pink-400" />,
    title: "AI-Powered Test Generation",
    description: "Automatically create comprehensive test scenarios based on your application's structure and user flows."
  },
  {
    icon: <FaBug className="text-green-400" />,
    title: "Intelligent Bug Detection",
    description: "Identify potential issues and edge cases that human testers might miss, improving overall software quality."
  },
  {
    icon: <FaCode className="text-yellow-400" />,
    title: "Automated Script Creation",
    description: "Generate Selenium scripts and other test automation code with minimal human intervention."
  },
  {
    icon: <FaChartLine className="text-blue-400" />,
    title: "Advanced Analytics",
    description: "Gain insights into your testing processes and identify areas for improvement with detailed reporting and analytics."
  }
];