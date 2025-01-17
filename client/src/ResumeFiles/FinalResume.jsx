import React, { useContext, useEffect, useState } from 'react';
import { ResumeContext } from '../context/ResumeContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import html2pdf from "html2pdf.js";
import { FaDownload, FaShareAlt } from 'react-icons/fa';
import { MdDashboard } from "react-icons/md";
import Layout from '../Reuse/Layout';

const FinalResume = () => {
  const [resumedata, setResumedata] = useState([]);
  const { resumeId } = useParams();
  const navigate = useNavigate();

  // Download Resume
  const handleDownload = () => {
    const element = document.getElementById("resume-content");
    const resumeName = resumedata.length > 0 ? resumedata[0].resumename : "resume"; // Default to "resume" if no name is found
    html2pdf()
      .set({
        margin: 1,
        filename: `${resumeName}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  // Share Resume
  let resumePdfBlob = null;
  const handleShare = () => {
    const file = new File([resumePdfBlob], "resume.pdf", { type: "application/pdf" });

    const shareData = {
      title: "Resume",
      files: [file],
    };

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator
        .share(shareData)
        .then(() => console.log("Resume shared successfully!"))
        .catch((err) => console.error("Error sharing resume:", err));
    } else {
      alert("File sharing is not supported on this browser.");
    }
  };

  // Fetching Resume Data from Database
  useEffect(() => {
    axios
      .get(`http://localhost:3001/getresumedata/${resumeId}`)
      .then((res) => {
        setResumedata(res.data);
      })
      .catch((err) => console.error(err));
  }, [resumeId]);

  const resume = resumedata.length > 0 ? resumedata[0] : {};

  return (
    <Layout>
    <div className="bg-white max-w-4xl mx-auto pt-16 p-6">
      <h2 className="text-center text-2xl font-medium">Congratulations! Your resume is generated</h2>
      <p className="text-center text-gray-400 mb-6">
        Now you can share or download your resume
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          className="bg-red-500 flex text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          onClick={handleDownload}
        >
          Download <FaDownload className="mt-1 ml-2" />
        </button>
        <button
          className="bg-blue-500 flex text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={handleShare}
        >
          Share <FaShareAlt className="mt-1 ml-2" />
        </button>
       <Link to='/start'><button
          className="bg-green-500 flex text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          DashBoard <MdDashboard className="mt-1 ml-2" />
        </button></Link>
      </div>

      {/* Resume Content */}
      <div id="resume-content" className="border-2 border-red-500 p-4 rounded-lg">

        {/* Personal Details */}
        <div className="p-4 border-gray-200">
          <h2 className="text-red-500 font-bold text-xl text-center">
            {resume?.firstName} {resume?.lastName}
          </h2>
          <h3 className="font-medium text-sm text-center">{resume?.jobTitle}</h3>
          <p className="text-red-500 font-normal text-xs text-center">{resume?.address}</p>
          <div className="flex justify-between">
            <p className="text-red-500 font-normal text-xs">{resume?.phone}</p>
            <p className="text-red-500 font-normal text-xs">{resume?.email}</p>
          </div>
          <hr className="border-[1.5px] my-2 border-red-500" />
        </div>

        {/* Summary */}
        <div className="my-2 p-4 border-gray-200">
          <h2 className="text-center font-bold text-lg text-red-500 mb-1">Summary</h2>
          <p className="text-sm text-gray-700">{resume?.summary}</p>
        </div>

        {/* Professional Experience */}
        <div className="my-2 p-4 border-gray-200">
          <h2 className="text-center font-bold text-sm text-red-500 mb-1">Professional Experience</h2>
          <hr className="border-[1.5px] my-2 border-red-500" />
          <div>
            <h2 className="text-red-500 text-sm font-bold">{resume?.PositionTitle}</h2>
            <h3 className="text-xs flex justify-between">
              {resume?.CompanyName}, {resume?.City}, {resume?.State}
              <span>{resume?.StartDate} - {resume?.EndDate}</span>
            </h3>
            <p className="text-xs my-2 text-gray-700">{resume?.Desc}</p>
          </div>
        </div>

        {/* Education Details */}
        <div className="my-2 p-4 border-gray-200">
          <h2 className="text-center font-bold text-sm text-red-500 mb-1">Education Details</h2>
          <hr className="border-[1.5px] my-2 border-red-500" />
          <div>
            <h2 className="text-red-500 text-sm font-bold">{resume?.UniversityName}</h2>
            <h3 className="text-xs flex justify-between">
              {resume?.Degree} in {resume?.Major}
              <span>{resume?.StartDateEdu} - {resume?.EndDateEdu}</span>
            </h3>
            <p className="text-xs my-2 text-gray-700">{resume?.DescriptionEdu}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="my-2 p-4 border-gray-200">
          <h2 className="text-center font-bold text-sm text-red-500 mb-1">Professional Skills</h2>
          <hr className="border-[1.5px] my-2 border-red-500" />
          <div className="grid grid-cols-3 gap-4 text-gray-700">
            {resume?.skills?.map((data, i) => (
              <div key={i} className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg shadow-md text-center">
                {data}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
    </Layout>
  );
};

export default FinalResume;
