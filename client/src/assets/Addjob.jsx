import React, { useState } from "react";
import axios from 'axios'
import Layout from "../Reuse/Layout";
import { useNavigate } from "react-router-dom";
function Addjob() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [cname, setCname] = useState('')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState(null)
  const [detail, setDetail] = useState('')
  const userid = sessionStorage.getItem('userid')
  const navigate = useNavigate()
  const jobsub = (e)=>{
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('userid',userid)
    formdata.append('title',title)
    formdata.append('desc',desc)
    formdata.append('cname',cname)
    formdata.append('location',location)
    formdata.append('image',image)
    formdata.append('detail',detail)

    axios.post("http://localhost:3001/createjob", formdata)
    .then(res=>{
      navigate('/find')
      console.log(res)})
    .catch(err=>console.log(err))
  }
  return (
    <Layout>
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 pt-12 py-8">
      <h1 className="text-4xl text-center sm:text-5xl font-bold mb- text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          POST A JOB
        </h1>
        <form onSubmit={jobsub}  className="space-y-6">
          <div className="mb-4">
            <label htmlFor="jobTitle" className="block text-sm font-medium mb-2">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="title"
              placeholder="Enter job title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e)=> setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="jobDescription"
              className="block text-sm font-medium mb-2"
            >
              Job Description
            </label>
            <textarea
              id="jobDescription"
              name="desc"
              placeholder="Enter job description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e)=> setDesc(e.target.value)}
              
            />
          </div>

          <div className="mb- flex">
            
            <input
              type="text"
              id="jobLocation"
              name="location"
              placeholder="Enter job location"
              className="shadow appearance-none border rounded w-[40%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e)=> setLocation(e.target.value)}
             
            />
              
            <input
              type="text"
              id="company"
              placeholder="Enter company name"
              name='cname'
              className="shadow appearance-none border rounded w-[40%] ml-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e)=> setCname(e.target.value)}
             
             />

<input
              type="file"
              id="company"
              name="image"
              placeholder="Enter Picture"
              className="shadow appearance-none border rounded w-[20%] ml-4 py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e)=> setImage(e.target.files[0])}
              
              />
          </div>

      
          <div className="mb-">
            <label htmlFor="company" className="block text-sm font-medium mb-2">
              What you looking for
            </label>
            <input
              type="text"
              id="company"
              name='detail'
              placeholder="What you looking for"
              className="shadow appearance-none border rounded w-full py-2 px-3 h-52 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e)=> setDetail(e.target.value)}
             
             />
          </div>
          {/* <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
          >
            Submit
          </button> */}
          <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-lg font-semibold">
          Apply
        </button>
        </form>
      </div>
    </div>
    </Layout>
  );
}

export default Addjob;
