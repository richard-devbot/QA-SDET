'use client'
import { useState } from 'react';
import { FaBook, FaQuestionCircle, FaVideo, FaEnvelope, FaRocket, FaUsers, FaCode, FaBug } from 'react-icons/fa';

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-8 text-center">SDET-Genie Support</h1>
        <p className="text-xl text-center mb-12">
          We're committed to your success. Explore our resources or reach out for personalized assistance.
        </p>

        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search our knowledge base..."
              className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800"
            />
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-r-md transition duration-300"
            >
              Search
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <SupportCard
            icon={<FaBook />}
            title="Documentation"
            description="Comprehensive guides for all SDET-Genie features."
            link="#"
            linkText="Explore Docs"
          />
          <SupportCard
            icon={<FaQuestionCircle />}
            title="FAQs"
            description="Quick answers to common questions about our platform."
            link="#"
            linkText="View FAQs"
          />
          <SupportCard
            icon={<FaVideo />}
            title="Video Tutorials"
            description="Step-by-step video guides to master SDET-Genie."
            link="#"
            linkText="Watch Now"
          />
          <SupportCard
            icon={<FaEnvelope />}
            title="Email Support"
            description="Get personalized help from our expert support team."
            link="mailto:support@sdet-genie.com"
            linkText="Contact Support"
          />
        </div>

        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Latest Updates</h2>
          <div className="space-y-4">
            <Update
              title="New Feature: AI-Powered Test Case Prioritization"
              date="June 15, 2024"
              description="Optimize your test runs with our new ML algorithm that prioritizes test cases based on historical data and code changes."
            />
            <Update
              title="Enhanced Integration with Jenkins"
              date="May 28, 2024"
              description="Seamlessly integrate SDET-Genie with your Jenkins pipelines for automated test generation and execution."
            />
            <Update
              title="Performance Boost: 50% Faster Test Execution"
              date="May 10, 2024"
              description="We've optimized our core engine, resulting in significantly faster test execution times across all test types."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Community Forum</h2>
            <p className="mb-4">Join our vibrant community of SDET-Genie users. Share tips, ask questions, and collaborate with peers.</p>
            <a href="#" className="text-pink-400 hover:text-pink-300 transition duration-300 flex items-center">
              <FaUsers className="mr-2" /> Join the Discussion
            </a>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Developer API</h2>
            <p className="mb-4">Integrate SDET-Genie directly into your workflow with our comprehensive API.</p>
            <a href="#" className="text-pink-400 hover:text-pink-300 transition duration-300 flex items-center">
              <FaCode className="mr-2" /> API Documentation
            </a>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Need More Help?</h2>
          <p className="mb-8">Our dedicated support team is ready to assist you with any questions or issues.</p>
          <a
            href="mailto:support@sdet-genie.com"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 inline-flex items-center"
          >
            <FaRocket className="mr-2" /> Get Premium Support
          </a>
        </div>
      </div>
    </div>
  );
}

function SupportCard({ icon, title, description, link, linkText }) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl flex flex-col">
      <div className="text-4xl mb-4 text-pink-400">{icon}</div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="mb-4 flex-grow">{description}</p>
      <a href={link} className="text-pink-400 hover:text-pink-300 transition duration-300 mt-auto">
        {linkText} →
      </a>
    </div>
  );
}

function Update({ title, date, description }) {
  return (
    <div className="border-l-4 border-pink-500 pl-4">
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-sm text-pink-300 mb-2">{date}</p>
      <p>{description}</p>
    </div>
  );
}