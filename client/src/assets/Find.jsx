import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Reuse/Layout";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Find = () => {
  const [data, setData] = useState([]);
  const [dataoftype, setDataoftype] = useState([]);
  const [loc, setLoc] = useState("");
  const [search, setSearch] = useState("");
  const [cname, setCname] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [likedJobs, setLikedJobs] = useState({});
  const uid = sessionStorage.getItem("userid");
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getuser/${uid}`)
      .then((res) => {
        setUserdata(res.data);
      })
      .catch((err) => console.error(err));
  }, [uid]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/showjob")
      .then((res) => {
        setData(res.data || []);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:3001/showjobmytype", { uid })
      .then((res) => {
        setDataoftype(res.data || []);
      })
      .catch((err) => console.log(err));
  }, [uid]);

  const handleSearchClick = () => {
    setIsSearchClicked(true);
  };

  const handleClearFilters = () => {
    setSearch("");
    setLoc("");
    setCname("");
    setIsSearchClicked(false);
  };

  const toggleLike = (jobid, action) => {
    axios
      .post("http://localhost:3001/joblike", { uid, jobid })
      .then(() => {
        setLikedJobs((prev) => ({
          ...prev,
          [jobid]: action === "like",
        }));
      })
      .catch((err) => console.error("Error toggling like:", err));
  };

  useEffect(() => {
    // Fetch liked jobs for the logged-in user
    axios
      .get(`http://localhost:3001/getlikedjobs/${uid}`)
      .then((res) => {
        const likedJobsFromBackend = res.data || [];
        const likedJobsState = likedJobsFromBackend.reduce((acc, jobId) => {
          acc[jobId] = true;
          return acc;
        }, {});
        setLikedJobs(likedJobsState);
      })
      .catch((err) => console.error("Error fetching liked jobs:", err));
  }, [uid]);

  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans">
    <Layout>
       
       

        <div className="container pt-10 mx-auto px-4 py-6 sm:py-10">
        <header  className="  p-5  text-center shadow-lg">
          <h1 className="text-4xl sm:text-5xl font-bold mb- text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Latest Jobs
          </h1>
        </header>
          {userdata?.type === "candidate" && (
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8 space-y-4 sm:space-y-0">
              <input
                type="text"
                placeholder="Search Jobs by Title..."
                className="w-full sm:w-1/3 p-4 bg-gray-800 rounded-lg shadow-lg text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                value={search}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />
              <select
                onChange={(e) => setLoc(e.target.value.toLowerCase())}
                className="w-full sm:w-1/3 p-4 bg-gray-800 rounded-lg shadow-lg text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
              >
                <option value="">Filter by Location</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="rajasthan">Rajasthan</option>
                <option value="west bengal">West Bengal</option>
                <option value="tamil nadu">Tamil Nadu</option>
                <option value="delhi">Delhi</option>
              </select>
              <select
                onChange={(e) => setCname(e.target.value.toLowerCase())}
                className="w-full sm:w-1/3 p-4 bg-gray-800 rounded-lg shadow-lg text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
              >
                <option value="">Filter by Company</option>
                <option value="apple">Apple</option>
                <option value="meta">Meta</option>
                <option value="netflix">Netflix</option>
                <option value="amazon">Amazon</option>
                <option value="microsoft">Microsoft</option>
              </select>
              <button
                onClick={handleSearchClick}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:bg-gradient-to-l focus:outline-none transition-all duration-300"
              >
                Search
              </button>
              <button
                onClick={handleClearFilters}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg hover:bg-gradient-to-l focus:outline-none transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data
              .filter((job) => {
                if (!isSearchClicked) return true;
                const matchesSearch =
                  search === "" || job.title.toLowerCase().includes(search);
                const matchesLocation =
                  loc === "" || job.location.toLowerCase() === loc;
                const matchesCname =
                  cname === "" || job.cname.toLowerCase() === cname;
                return matchesSearch && matchesLocation && matchesCname;
              })
              .map((job, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-6 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                      {job.title}
                    </h2>
                    <img
                      src={`http://localhost:3001/${job.image}`}
                      alt={`${job.cname} Logo`}
                      className="w-14 h-14 object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{job.desc}</p>
                  <div className="flex justify-between items-center text-gray-400 text-sm">
                    <span>📍 {job.location}</span>
                    {userdata && userdata.type === "candidate" && (
                      <div>
                        {likedJobs[job._id] ? (
                          <button
                            onClick={() => toggleLike(job._id, "unlike")}
                            className="text-xl focus:outline-none text-red-500 transition-all duration-300 transform hover:scale-110"
                          >
                            <FaHeart />
                          </button>
                        ) : (
                          <button
                            onClick={() => toggleLike(job._id, "like")}
                            className="text-xl focus:outline-none text-gray-400 transition-all duration-300 transform hover:scale-110"
                          >
                            <FaRegHeart />
                          </button>
                        )}
                      </div>
                    )}

                    <Link to={`/jdetail/${job._id}`}>
                      <button className="text-blue-400 hover:underline focus:outline-none">
                        More Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
    </Layout>

      </div>
  );
};

export default Find;
