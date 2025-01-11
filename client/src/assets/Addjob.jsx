import React, { useState } from "react";
import axios from "axios";
import Layout from "../Reuse/Layout";
import { useNavigate } from "react-router-dom";

function Addjob() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cname, setCname] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [detail, setDetail] = useState("");
  const userid = sessionStorage.getItem("userid");
  const navigate = useNavigate();

  const jobsub = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("userid", userid);
    formdata.append("title", title);
    formdata.append("desc", desc);
    formdata.append("cname", cname);
    formdata.append("location", location);
    formdata.append("image", image);
    formdata.append("detail", detail);

    axios
      .post("http://localhost:3001/createjob", formdata)
      .then((res) => {
        navigate("/find");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-900 pt-10 to-gray-800 text-white min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-gray-800 shadow-xl rounded-lg max-w-3xl mx-auto p-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Post a Job
            </h1>
            <form
              onSubmit={jobsub}
              className="space-y-6"
            >
              {/* Job Title */}
              <div>
                <label
                  htmlFor="jobTitle"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="title"
                  placeholder="Enter job title"
                  className="block w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-900 focus:ring-blue-500 focus:border-blue-500 text-white"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Job Description */}
              <div>
                <label
                  htmlFor="jobDescription"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Job Description
                </label>
                <textarea
                  id="jobDescription"
                  name="desc"
                  placeholder="Enter job description"
                  rows="4"
                  className="block w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-900 focus:ring-blue-500 focus:border-blue-500 text-white"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              {/* Location, Company, and Image */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  id="jobLocation"
                  name="location"
                  placeholder="Enter job location"
                  className="px-4 py-3 border border-gray-600 rounded-md bg-gray-900 focus:ring-blue-500 focus:border-blue-500 text-white"
                  onChange={(e) => setLocation(e.target.value)}
                />
                <input
                  type="text"
                  id="company"
                  placeholder="Enter company name"
                  name="cname"
                  className="px-4 py-3 border border-gray-600 rounded-md bg-gray-900 focus:ring-blue-500 focus:border-blue-500 text-white"
                  onChange={(e) => setCname(e.target.value)}
                />
                <input
                  type="file"
                  id="imageUpload"
                  name="image"
                  className="px-4 py-3 border border-gray-600 rounded-md bg-gray-900 focus:ring-blue-500 focus:border-blue-500 text-gray-400"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              {/* Job Details */}
              <div>
                <label
                  htmlFor="detail"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  What Are You Looking For?
                </label>
                <textarea
                  id="detail"
                  name="detail"
                  placeholder="Describe what you are looking for"
                  rows="5"
                  className="block w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-900 focus:ring-blue-500 focus:border-blue-500 text-white"
                  onChange={(e) => setDetail(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg rounded-lg transition duration-300">
                Post Job
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Addjob;
