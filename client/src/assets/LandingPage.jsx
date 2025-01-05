import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Layout from "../Reuse/Layout";

const LandingPage = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const faqs = [
    {
      question: "What is Hircd?",
      answer: "Hircd is a job portal connecting job seekers with employers.",
    },
    {
      question: "How do I post a job?",
      answer: "To post a job, click on 'Post a Job' and fill out the required details.",
    },
    {
      question: "How can I search for jobs?",
      answer: "You can use the search bar to look for jobs based on your skills and location.",
    },
    {
      question: "How do I apply for a job?",
      answer: "Click on a job listing and follow the application instructions provided.",
    },
    {
      question: "Can I save jobs to apply later?",
      answer: "Yes, you can save jobs by clicking the 'Save' button on each listing.",
    },
    {
      question: "How do I track my job applications?",
      answer: "Track your applications from the 'My Applications' section in your profile.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <Layout>
      <div className="bg-gray-900 text-white min-h-screen font-sans">
        {/* Hero Section */}
        <div className="text-center bg-gradient-to-b from-gray-800 via-gray-900 to-black px-4 sm:px-8 py-20">
          <h1 className="mt-10 text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Find Your Dream Job with <br />
            <span className="text-blue-500">Hireme</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mb-10">
            Discover top job opportunities or the perfect candidates in just a few clicks.
          </p>
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            <Link to="/home2">
              <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg shadow-lg transition duration-200">
                Find Jobs
              </button>
            </Link>
            <Link to="/home2">
              <button className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-700 hover:to-red-900 text-white px-6 py-3 rounded-lg shadow-lg transition duration-200">
                Post a Job
              </button>
            </Link>
          </div>

          {/* Slider Section */}
          <div className="mt-20 max-w-6xl mb-8 mx-auto px-4">
            <h2 className="text-center text-2xl sm:text-3xl font-bold mb-10">Top Companies</h2>
            <Slider {...settings}>
              {[
                { src: "./public/image/amazon.svg", alt: "Amazon" },
                { src: "./public/image/netflix.png", alt: "Netflix" },
                { src: "./public/image/uber.svg", alt: "Uber" },
                { src: "./public/image/google.webp", alt: "Google" },
                { src: "./public/image/atlassian.svg", alt: "Atlassian" },
                { src: "./public/image/microsoft.webp", alt: "Microsoft" },
                { src: "./public/image/ibm.svg", alt: "IBM" },
              ].map((item, index) => (
                <div key={index} className="px-2 hover:scale-105 transition-transform duration-300">
                  <img src={item.src} alt={item.alt} className="h-14 mx-auto" />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Banner Section */}
        <div className="mt-6 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">What And Who We Help?</h2>

          <img
            src="./public/image/banner.jpeg"
            alt="Banner"
            className="w-full h-auto rounded-lg shadow-xl transform transition-all duration-300 "
          />
          <div className="flex gap-14 ">
          <div className="mt-8 w-[48%] bg-gray-800 p-6 rounded-lg hover:scale-105 transform transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-2 text-center">For Job Seekers</h3>
              <p className="text-center">Search and applay for jobs, track, application, and more.</p>
            </div>
            <div className="mt-8 w-[48%] bg-gray-800 p-6 rounded-lg hover:scale-105 transform transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-2 text-center">For Employers</h3>
              <p className="text-center">Post jobs, manage application, and find the best candidates.</p>
            </div>
            </div>
        </div>

        {/* FAQ Section */}
        <div className="h-screen w-full bg-gray-800">
        <div className="mt-16 px-6 sm:px-12 max-w-5xl mx-auto mb-20">
          <h2 className="text-center text-2xl sm:text-3xl font-bold pt-10 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4 pt-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-700 rounded-lg p-4 cursor-pointer bg-gray-800 hover:bg-gray-700 transition duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg sm:text-xl font-medium">{faq.question}</h3>
                  <span className="text-xl">{activeFAQ === index ? "-" : "+"}</span>
                </div>
                {activeFAQ === index && (
                  <p className="mt-2 text-gray-400 transition-opacity duration-500">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        </div>

                {/* Enhanced Generate Resume Section */}
        <div className="h-auto w-full ">

                <div className="mt-2 max-w-6xl mx-auto px-4">
          <div className="bg-gray-900  text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">Generate Your Resume Using AI</h2>
            <p className="text-center text-lg text-gray-200 mb-6">
              Create a professional resume in minutes tailored to your skills and experience. Let AI handle the formatting and design while you focus on showcasing your achievements.
            </p>
            <div className="flex justify-center mb-6">
              <Link to="/start">
                <button className="bg-white text-black px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-gray-100 transition duration-200">
                  Get Started
                </button>
              </Link>
            </div>

            {/* How It Works Section */}
            <div className=" bg-gray-800 p-6 rounded-lg mt-6">
              <h3 className="text-2xl font-semibold mb-4 text-center">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-4 rounded-full shadow-lg">
                    <svg
                      className="w-10 h-10 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16l-4-4m0 0l4-4m-4 4h16"
                      />
                    </svg>
                  </div>
                  <p className="text-white text-lg font-medium">Step 1: Add Your Details</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-4 rounded-full shadow-lg">
                  <svg
                      className="w-10 h-10 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16l-4-4m0 0l4-4m-4 4h16"
                      />
                    </svg>
                  </div>
                  <p className="text-white text-lg font-medium">Step 2: Select a Template</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-4 rounded-full shadow-lg">
                  <svg
                      className="w-10 h-10 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16l-4-4m0 0l4-4m-4 4h16"
                      />
                    </svg>
                  </div>
                  <p className="text-white text-lg font-medium">Step 3: Download & Share</p>
                </div>
              </div>
            </div>

            {/* Additional Features Section */}
            <div className="mt-8 mb-5  bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-center">Additional Features</h3>
              <ul className="space-y-4 text-gray-200">
                <li>✨ AI-powered recommendations for skills and job descriptions.</li>
                <li>✨ Multiple template options for different job roles.</li>
                <li>✨ Live preview of your resume while editing.</li>
                <li>✨ Automatic grammar and spelling checks.</li>
                <li>✨ Export to PDF or share via email directly from the platform.</li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
