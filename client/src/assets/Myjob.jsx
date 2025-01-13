import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Reuse/Layout";
import { MdDelete } from "react-icons/md";
const Myjob = () => {
  const [dataapplay, setDataapplay  ] = useState([]);
  const [applaydata, setApplaydata] = useState([]);
  const [datajob, setDatajob] = useState([]);
  const uid = sessionStorage.getItem("userid");
  const [userdata, setUserdata] = useState(null);
  const [dataoftype, setDataoftype] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3001/getapplied/${jid}`)
  //     .then((res) => setApplaydata(res.data || []))
  //     .catch((err) => setError("Failed to load applied data"));
  // }, [jid]);
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/getuser/${uid}`)
      .then((res) => {
        setUserdata(res.data);
        // console.log(res.data)
      })
      .catch((err) => console.error(err));
  }, [uid])


    useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/getmyjob/${uid}`);
        setDataapplay(res.data);
        // console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSavedJobs();
  }, [uid]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/showjobmytype",{uid})
      .then((res) => {
        setDataoftype(res.data || []);
        // console.log(res.data);  
      })
      .catch((err) => console.log(err));
  }, [uid]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:3001/showjob");
        setDatajob(res.data || []);
        // console.log(res.data); 
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, []);
  const del = (id) => {
    axios
        .delete("http://localhost:3001/deljob/"+id)
        .then((res) => {
          // window.location.reload()
          // console.log(res.data);
        })
        .catch((err) => {console.log(err); });
};

  return (
    <Layout>
    {userdata?.type == "candidate" ?
      
       <div className="min-h-screen  bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans">
         

         <div className="container mx-auto px-4 py-6 sm:py-10">
         <header className=" pt-10 p-5 text-center shadow-lg">
           <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
             My Jobs
           </h1>
           <p className="text-lg sm:text-xl text-gray-400 mb-8">
            The jobs that you have applied succsesfully
          </p>
         </header>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {dataapplay.length > 0 ? (
              [...dataapplay].reverse().slice().map((job, index) => {
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
                        src={`http://localhost:3001/${user?.image}`}
                        className="w-10 h-10 rounded-full object-contain"
                      />
                    </div>
                    <p className="text-sm text-gray-400 mb-4">{user?.desc}</p>
                    <div className="flex justify-between items-center text-gray-400 text-sm">
                      <span> 📍 {user?.location}</span>
                      {userdata?.type =="candidate" ?
                      (<Link to={`/jdetail/${user?._id}`}><button className="text-blue-400 hover:underline focus:outline-none">
                        More Details
                      </button></Link>)
                      :
                      (<Link to={`/recrujdetail/${user?._id}`}><button className="text-blue-400 hover:underline focus:outline-none">
                        More Details
                      </button></Link>)}
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
      :<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans">
         
         <div className="container mx-auto px-4 py-6 sm:py-10">
         <header className=" pt-10 p-5 text-center shadow-lg">
           <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
             My Jobs
           </h1>
           <p className="text-lg sm:text-xl text-gray-400 mb-">
            The jobs that you have applied succsesfully
          </p>
         </header>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {dataoftype.length > 0 ? (
              [...dataoftype].reverse().slice().map((jobuid, i) => {
                // const user = datajob.find((user) => user._id?.toString() === job.jobid);
               

                return (
                  <div
                    key={i}
                    className="bg-gray-800 p-6 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                        {jobuid?.title}
                      </h2>
                      <img
                        src={`http://localhost:3001/${jobuid?.image}`}
                        className="w-10 h-10 rounded-full object-contain"
                      />
                    </div>
                    <p className="text-sm text-gray-400 mb-4">{jobuid?.desc}</p>
                    <div className="flex justify-between items-center text-gray-400 text-sm">
                      <span> 📍 {jobuid?.location}</span>
                    <MdDelete onClick={()=>del(jobuid?._id)} className="float-center text-xl hover:bg-black hover:rounded-full h-6 w-6"/>

                      <Link to={`/recrujdetail/${jobuid?._id}`}><button className="text-blue-400 hover:underline focus:outline-none">
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
}
    </Layout>
  );
};

export default Myjob;

// {userdata?.type== "candidate"?
//   (<Link to={`/jdetail/${jobuid?._id}`}><button className="text-blue-400 hover:underline focus:outline-none">
//     More Details
//   </button></Link>):(
    
//   <Link to={`/jdetail/${jobuid?._id}`}><button className="text-blue-400 hover:underline focus:outline-none">
//     More Details
//   </button></Link>
//   )}
