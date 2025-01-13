import React, { useEffect, useState } from "react";
import Layout from "../Reuse/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { MdDownload } from "react-icons/md";
import { FaBriefcase, FaDoorOpen } from "react-icons/fa";

const RecruJdetail = () => {
  const { jid } = useParams();
  const [jobdata, setJobdata] = useState(null);
  const [datajob, setDatajob] = useState([]);
  const [applaydata, setApplaydata] = useState(null);
  const uid = sessionStorage.getItem("userid");
  const [userdata, setUserdata] = useState(null);
  const [useralldata, setUseralldata] = useState([]);
  const [error, setError] = useState(null);  
  const [candidate, setCandidate] = useState(0);
  

  // Fetch applied data
  useEffect(() => {
    axios
      .get(`http://localhost:3001/getapplied/${jid}`)
      .then((res) =>{ 
        // console.log(res.data)
        setCandidate(res.data.length)
        setApplaydata(res.data || [])
      })
      .catch((err) => setError("Failed to load applied data"));
  }, [jid]);

  // Fetch user data
  useEffect(() => {
    axios
      .get(`http://localhost:3001/getuser/${uid}`)
      .then((res) => setUserdata(res.data))
      .catch((err) => setError("Failed to load user data"));
  }, [uid]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getalluser`)
      .then((res) => {
        // console.log(res.data)
        setUseralldata(res.data)})
      .catch((err) => setError("Failed to load user data"));
  }, [uid]);

  // Fetch job details
  useEffect(() => {
    axios
      .get(`http://localhost:3001/showjobinfo/${jid}`)
      .then((res) => setJobdata(res.data))
      .catch((err) => setError("Failed to load job details"));
  }, [jid]);

  // Fetch all jobs
  useEffect(() => {
    axios
      .get("http://localhost:3001/showjob")
      .then((res) => setDatajob(res.data || []))
      .catch((err) => setError("Failed to load jobs"));
  }, []);

  // Apply for a job
  const send = async (jobid) => {
    try {
      await axios.post("http://localhost:3001/jobapplay", { uid, jobid });
      const res = await axios.get(`http://localhost:3001/getapplied/${jid}`);
      setApplaydata(res.data || []);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error(err);
      setError("Failed to apply for the job");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 text-white font-sans">
        {error && <div className="text-red-500 text-center">{error}</div>}
        <section className="container mx-auto px-6 py-8">
          <div className="mt-10 flex flex-col sm:flex-row justify-between items-center">
            <div className="w-full sm:w-auto">
        <div className="flex justify-between">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-100">
                {jobdata?.title || "Loading..."}
              </h2>
               
            {/* Company Logo */}
            {jobdata?.image && (
              <img
                src={`http://localhost:3001/${jobdata.image}`}
                alt="Company Logo"
                className="w-20 h-20 object-contain mt-2 sm:mt-0 sm:ml-6"
              />
            )}
            </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-[500px] w-full sm:w-auto text-gray-400 mt-2 text-sm">
                <span className="flex"><p>📍</p> {jobdata?.location || "Location not available"}</span>
                <span className="flex items-center mt-2 sm:mt-0">
                  <FaBriefcase className="mr-2 flex" /> <p className="mr-1">{candidate} </p>Applicant
                </span>
                <span className="flex items-center mt-2 sm:mt-0">
                  <FaDoorOpen className="mr-2" /> Open
                </span>
              </div>
            </div>
           
          </div>
        </section>

        {userdata?._id === jobdata?.userid && (
          <section className="container mx-auto px-6 py-4 mb-4">
            <select className="w-full p-4 bg-green-800 rounded-lg text-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300">
              <option value="open">Hiring Status (Open)</option>
              <option value="close">Hiring Status (Close)</option>
            </select>
          </section>
        )}

        <section className="container mx-auto px-6 py-6 bg-gray-800 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-blue-500">
            About the Job
          </h3>
          <p className="text-gray-300 leading-relaxed">
            {jobdata?.desc || "Description not available"}
          </p>
        </section>

        <section className="container mx-auto px-6 py-6 bg-gray-800 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-blue-500">
            What We Are Looking For
          </h3>
          <p className="text-gray-300 leading-relaxed">
            {jobdata?.detail || "Details not available"}
          </p>
        </section>

        <div className="container mx-auto px-6 py-6">
          <h3 className="text-2xl text-center sm:text-3xl font-bold mb-6 text-blue-500">
            Applied Candidates
          </h3>
          {
  applaydata?.map((data, i) => {
    const user = useralldata.find((user) => user?._id === data?.uid); // Ensure user is defined here
    return (
      <div
        key={i} // Always include a unique key for mapped elements
        className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 flex justify-between items-center"
      >
        <div>
          <h3 className="text-3xl font-bold">{jobdata?.title}</h3>
          <p className="text-sm mt-2">📧 2 years experience</p>
          <p className="text-sm text-gray-400 mt-2">08/12/2004</p>
        </div>
        <div className="flex flex-col ">
          <p className="text-sm bg-gray-700 text-gray-300 px-3 py-1 rounded-lg">
            Post Graduate
          </p>
          <p className="mt-4 text-center">{user?.name || "Unknown Candidate"}</p>
         <Link to={`/chatsearch`}><button className="mt-4  bg-blue-600 px-4 ml-6 py-2 text-white rounded hover:bg-blue-700 font-semibold text-center">Chat</button></Link> 
        </div>
        <div className="flex flex-col items-end">
          <MdDownload className="text-2xl text-gray-300" />
          <p className="text-sm mt-4">💻 Skills: React, Node.js</p>
          <select className="mt-4 bg-gray-600 text-sm text-white px-4 py-2 rounded-lg cursor-pointer">
            <option>Applied</option>
            <option>Interviewing</option>
            <option>Shortlisted</option>
          </select>
        </div>
      </div>
    );
  })
}

        </div>

      </div>

    </Layout>
  );
};

export default RecruJdetail;
