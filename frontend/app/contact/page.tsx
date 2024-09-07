'use client'
import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', company: '', message: '' });
    // Show a success message to the user
    alert('Thank you for your message. We will get back to you soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-8 text-center">Contact Us</h1>
        <p className="text-xl text-center mb-12">
          Ready to revolutionize your QA process? Our SDET-Genie experts are here to help you harness the full power of AI-driven testing.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="company" className="block mb-2">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-md transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          <div>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl mb-8">
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <ContactInfo icon={<FaEnvelope />} text="info@sdet-genie.com" />
                <ContactInfo icon={<FaPhone />} text="+1 (555) 123-4567" />
                <ContactInfo icon={<FaMapMarkerAlt />} text="123 AI Avenue, Silicon Valley, CA 94000" />
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl">
              <h2 className="text-3xl font-bold mb-6">Connect With Us</h2>
              <div className="space-y-4">
                <SocialLink icon={<FaLinkedin />} text="LinkedIn" url="https://www.linkedin.com/company/sdet-genie" />
                <SocialLink icon={<FaTwitter />} text="Twitter" url="https://twitter.com/SDETGenie" />
                <SocialLink icon={<FaGithub />} text="GitHub" url="https://github.com/sdet-genie" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300">
            Schedule a Demo
          </button>
        </div>
      </div>
    </div>
  );
}

function ContactInfo({ icon, text }) {
  return (
    <div className="flex items-center">
      <div className="text-pink-400 mr-4">{icon}</div>
      <p>{text}</p>
    </div>
  );
}

function SocialLink({ icon, text, url }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-pink-400 transition duration-300">
      <div className="mr-4">{icon}</div>
      <p>{text}</p>
    </a>
  );
}