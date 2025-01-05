import React, { useContext, useEffect, useState } from 'react'
  import { ResumeContext } from '../../context/ResumeContext'

  const Experience = () => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeContext)

    const handeldata = (e)=>{
      const {name, value} = e.target;
      setResumeInfo({
          ...resumeInfo,
          [name]:value
      })
  }
  //   const [experiencelist, setExperiencelist] = useState([
  //     {
  //     PositionTitle: '',
  //     CompanyName: '',
  //     City: '',
  //     State: '',
  //     StartDate: '',
  //     EndDate: '',
  //     Desc: '',
  //   }
  // ])
  // const AddExperience = ()=>{
  //   setExperiencelist([...experiencelist,
  //     {
  //       PositionTitle: '',
  //       CompanyName: '',
  //       City: '',
  //       State: '',
  //       StartDate: '',
  //       EndDate: '',
  //       Desc: '',
  //     }
  //   ])
  // }
  // const RemoveExperience = ()=>{
    
  // }
  //   const handeldata = (e,i) => {
  //     const newEntries =experiencelist.slice()
  //     const { name, value } = e.target;
  //     newEntries[i] [name]=value
  //     setExperiencelist(newEntries)
  //   }
    // const sub = (e) => {
    //   e.preventDefault()
    // }
    // useEffect(()=>{
    //   setResumeInfo({
    //     ...resumeInfo,
    //     experience:experiencelist
    //   })
    // })
    return (

      <div>
        <h2 className="text-xl font-bold text-purple-700 mb-2">Experience  Detail</h2>
        <p className="text-gray-600 mb-4">Get Started with the basic information</p>
        {/* {
          experiencelist.map((data,i)=>( */}
        <div className="space-y-4 h-auto">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Position Title</label>
              <input
                type="text"
                name="PositionTitle"
                required
                defaultValue={resumeInfo?.PositionTitle}
                onChange={handeldata}
                // onChange={()=>handeldata(e,i)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">Company Name</label>
              <input
                type="text"
                name="CompanyName"
                required
                defaultValue={resumeInfo?.CompanyName}
                onChange={handeldata}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              /> 
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">City</label>
              <input
                type="text"
                name="City"
                onChange={handeldata}
                // onChange={()=>handeldata(e,i)}
                required
                defaultValue={resumeInfo?.City}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">State</label>
              <input
                type="text"
                name="State"
                onChange={handeldata}
                // onChange={()=>handeldata(e,i)}
                required
                defaultValue={resumeInfo?.State}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Start Date</label>
              <input
                type="date"
                name="StartDate"
                onChange={handeldata}
                // onChange={()=>handeldata(e,i)}
                required
                defaultValue={resumeInfo?.StartDate}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">End Date</label>
              <input
                type="date"
                name="EndDate"
                onChange={handeldata}
                // onChange={()=>handeldata(e,i)}
                required
                defaultValue={resumeInfo?.EndDate}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

          </div>
          <label className="block text-gray-600">Experience Details</label>
          <textarea
            type="text"
            name="Desc"
            onChange={handeldata}
            // onChange={()=>handeldata(e,i)}
            required
            defaultValue={resumeInfo?.Desc}
            className="w-full h-32 border-gray-500 borer-2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
          ></textarea>

          {/* <div className='flex justify-between'>
            <div className='flex gap-2'>
            <button
                type="button"
                className="w-40 bg-purple-500 text-white  px-4 py-2 rounded-lg hover:bg-purple-600"
                // onClick={AddExperience}
              
              >
                + Add Experience
              </button>
              <button
                type="button"
                className=" bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
                // onClick={RemoveExperience}
              
              >
                - Remove
              </button>
              <div> <button
                type="button"
                className=" absolute left-[43%] bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
              >
                Save
              </button>
              </div>
            </div>
          </div> */}
        </div>
  {/* ))} */}
      </div>
    )
  }
  export default Experience