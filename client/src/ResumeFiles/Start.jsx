import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Reuse/Layout";
import axios from "axios";
import { IoDocumentTextSharp } from "react-icons/io5";

function Start() {
  const [resumealldata, setResumeAlldata] = useState([]);
  const [openModalId, setOpenModalId] = useState(null); // Track the opened modal's resume ID
  const navigate = useNavigate();
  const id = sessionStorage.getItem("userid")



  //Share Resume
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

  useEffect(() => {
    axios
      .get("https://jobportal-server-fwl8.onrender.com/getresumealldata/" +id)
      .then((res) => {
        setResumeAlldata(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const del = (id) => {
    axios
      .delete(`https://jobportal-server-fwl8.onrender.com/delresume/${id}`)
      .then((res) => {
        window.location.reload()
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };
  const edit = () => {
    alert("Edit Resume Functionality will come sooner")
  }
  const toggleModal = (id) => {
    setOpenModalId((prevId) => (prevId === id ? null : id)); // Toggle modal state
  };

  return (
    <Layout>
      <div className="bg-gray-900 min-h-screen px-6 py-8">
        <div className="text-center mb-8 pt-10">
          <h1 className="text-4xl font-bold text-purple-700">My Resume Dashboard</h1>
          <p className="mt-2 text-lg text-gray-500">Manage your AI-powered resumes for job applications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Create New Resume Card */}
          <div
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition-shadow cursor-pointer"
          >
            <Link to="/createResume">
              <div className="flex items-center justify-center h-24 w-24 bg-gray-100 rounded-full mb-4">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            </Link>
            <p className="text-gray-500">Create a New Resume</p>
          </div>

          {/* Existing Resumes Cards */}
          {resumealldata?.slice().reverse().map((data) => (
            <div
              key={data._id}
              className="bg-gradient-to-b from-purple-500 to-purple-300 text-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between hover:shadow-xl transition-shadow"
            >

              <IoDocumentTextSharp
                className="w-24 h-24 rounded-full  mb-4"

              />

              <p className="text-xl font-semibold text-center">{data?.resumename}</p>
              <div className="mt-4 w-full flex justify-between items-center">
                <div className="relative">
                  <button
                    onClick={() => toggleModal(data._id)} // Toggle the modal for the specific resume
                    className="bg-gray-100 ml-56 p-2 rounded-full shadow hover:bg-gray-200 transition-colors"
                  >
                    <svg
                      className="w-6 h-6 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6h.01M12 12h.01M12 18h.01"
                      />
                    </svg>
                  </button>

                  {/* Modal */}
                  {openModalId === data._id && (
                    <div className="modal-container absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50">
                      <Link to={`/finalresume/${data._id}`}>
                        <button className="block w-full text-black text-left px-4 py-2 hover:bg-gray-100 transition-colors">
                          View
                        </button>
                      </Link>
                      <Link to={`/finalresume/${data._id}`}>
                        <button
                           className="block w-full text-blue-500 text-left px-4 py-2 hover:bg-gray-100 transition-colors">
                          Download
                        </button>
                      </Link>

                      <button
                        onClick={edit} className="block w-full text-green-500 text-left px-4 py-2 hover:bg-gray-100 transition-colors">
                        Edit
                      </button>
                      <button
                        onClick={handleShare} className="block w-full text-purple-500 text-left px-4 py-2 hover:bg-gray-100 transition-colors">
                        Share
                      </button>
                      <button
                        onClick={() => del(data._id)}
                        className="block w-full text-red-500 text-left px-4 py-2 hover:bg-gray-100 transition-colors">
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Start;
