
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../Reuse/Layout'
import axios from 'axios';

const Home2 = () => {
  const [userdata, setUserdata] = useState(null);
 const uid= sessionStorage.getItem("userid")
  useEffect(() => {
    axios
      .get(`https://job-portal-server-orpin.vercel.app/getuser/${uid}`)
      .then((res) => {
        // console.log(res.data)
        setUserdata(res.data)
      })
      .catch((err) => setError("Failed to load user data"));
  }, [uid]);
  const no = ()=>{
    alert("You are a Candidate First login as a Recruiter");
  }
  return (
    <Layout>
    <div className="bg-dark text-white min-h-auto font-sans">
    

    <div className="text-center bg-gradient-to-b from-gray-800 via-gray-900 to-black px-4 sm:px-8 py-20">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 mt-10 leading-snug">
          Welcome to <span className="text-blue-400">Hircd</span>
        </h1>
         <h1 className="mt- text-4xl sm:text-5xl md:text-6xl font-bold mb-10  leading-tight">
           I am a.... <br />
         </h1>
         <p className="text-lg sm:text-xl text-gray-400 mb-8">
           Discover top job opportunities or the perfect candidates in just a few clicks.
         </p>
         <div className="flex justify-center flex-wrap gap-4 mt-16 mb-28">
          <Link to='/find'><button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white px-28 py-8 rounded-lg shadow-lg">
             Candidate
           </button></Link>
           {
            userdata?.type=="candidate"?
           <Link onClick={no}><button className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-700 hover:to-red-900 text-white px-28 py-8 rounded-lg shadow-lg">
             Recruiter
           </button></Link>
           :
           <Link to='/addjob'><button className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-700 hover:to-red-900 text-white px-28 py-8 rounded-lg shadow-lg">
             Recruiter
           </button></Link>
           }
         </div>

</div>
.
  </div>
  </Layout>
  )
}

export default Home2
