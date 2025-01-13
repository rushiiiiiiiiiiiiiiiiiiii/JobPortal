import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Reuse/Layout";

const SavedJobs = () => {
  const [datalike, setDatalike] = useState([]);
  const [datajob, setDatajob] = useState([]);
  const id = sessionStorage.getItem("userid");

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await axios.get(`localhost://127.0.0.1:3001/savejob/${id}`);
        setDatalike(res.data);
        // console.log("Saved Jobs Data:", res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSavedJobs();
  }, [id]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("localhost://127.0.0.1:3001/showjob");
        setDatajob(res.data || []);
        // console.log("All Jobs Data:", res.data); 
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans">
      

        <div className="container mx-auto px-4 py-6 sm:py-10">
        <header className=" pt-10  p-5 text-center shadow-lg">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Saved Jobs
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mb-2">
           The jobs that you have liked
         </p>
        </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {datalike.length > 0 ? (
              [...datalike].reverse().slice().map((job, index) => {
                const user = datajob.find((user) => user._id?.toString() === job.jobid);
               

                return (
                  <div
                    key={index}
                    className="bg-gray-800 p-6 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                        {user?.title}
                      </h2>
                      <img
                        src={`localhost://127.0.0.1:3001/${user?.image}`}
                        className="w-10 h-10 rounded-full object-contain"
                      />
                    </div>
                    <p className="text-sm text-gray-400 mb-4">{user?.desc}</p>
                    <div className="flex justify-between items-center text-gray-400 text-sm">
                      <span> 📍 {user?.location}</span>
                      <Link to={`/jdetail/${user?._id}`}><button className="text-blue-400 hover:underline focus:outline-none">
                        More Details
                      </button></Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-400">No saved jobs found</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SavedJobs;
