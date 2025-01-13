import React, { useEffect, useState } from "react";
import Layout from "../Reuse/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MdDownload } from "react-icons/md";
import { FaBriefcase, FaDoorOpen } from "react-icons/fa";

const Jdetails = () => {
  const { jid } = useParams();
  const [jobdata, setJobdata] = useState(null);
  const [datajob, setDatajob] = useState([]);
  const [applaydata, setApplaydata] = useState([]);
  const uid = sessionStorage.getItem("userid");
  const [userdata, setUserdata] = useState(null);
  const [candidate, setCandidate] = useState(0);
  const [error, setError] = useState(null);
  // console.log(uid)
  // Fetch applied data
  useEffect(() => {
    axios
      .get(`https://job-portal-server-orpin.vercel.app/getapplied/${jid}`)
      .then((res) => {
        (res.data)
        setApplaydata(res.data || [])
        setCandidate(res.data.length)
      })
      .catch((err) => setError("Failed to load applied data"));
  }, [jid]);

  // Fetch user data
  useEffect(() => {
    axios
      .get(`https://job-portal-server-orpin.vercel.app/getuser/${uid}`)
      .then((res) => {
        // console.log(res.data)
        setUserdata(res.data)
      })
      .catch((err) => setError("Failed to load user data"));
  }, [uid]);

  // Fetch job details
  useEffect(() => {
    axios
      .get(`https://job-portal-server-orpin.vercel.app/showjobinfo/${jid}`)
      .then((res) => {
        // console.log(res.data)
        setJobdata(res.data)
      })
      .catch((err) => setError("Failed to load job details"));
  }, [jid]);

  // Fetch all jobs
  useEffect(() => {
    axios
      .get("https://job-portal-server-orpin.vercel.app/showjob")
      .then((res) => setDatajob(res.data || []))
      .catch((err) => setError("Failed to load jobs"));
  }, []);

  // Apply for a job
  const send = async (jobid) => {
    try {
      await axios.post("https://job-portal-server-orpin.vercel.app/jobapplay", { uid, jobid });
      const res = await axios.get(`https://job-portal-server-orpin.vercel.app/getapplied/${jid}`);
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
        src={`https://job-portal-server-orpin.vercel.app/${jobdata.image}`}
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

        {userdata?.type === "candidate" ? (
          <section className="container mx-auto px-6 py-6 ">

            {
           // applaydata?.jobid === jobdata?._id &&  applaydata?.uid === uid ? (
              applaydata.some((data)=> data?.jobid === jobdata?._id && data?.uid === uid) ?

                (
                  <button className="w-full py-3 bg-red-500 text-white rounded text-lg font-semibold">
                    Applied
                  </button>
                ) : (
                  <button
                    onClick={() => send(jobdata?._id)}
                    className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 text-lg font-semibold"
                  >
                    Apply
                  </button>
                )
            }
          </section>
        ) : null}
      </div>
    </Layout>
  );
};

export default Jdetails;



