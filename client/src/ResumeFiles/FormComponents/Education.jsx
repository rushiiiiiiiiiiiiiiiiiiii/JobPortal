    import React, { useContext, useState } from 'react'
    import { ResumeContext } from '../../context/ResumeContext'
import axios from 'axios'

    const Education = () => {
    const {resumeInfo, setResumeInfo} = useContext(ResumeContext)
    const handeldata = (e)=>{
        const {name, value} = e.target;
        setResumeInfo({
            ...resumeInfo,
            [name]:value
        })
    }
    
        return (

        <div>
        <h2 className="text-xl font-bold text-purple-700 mb-4">Education Detail</h2>
        <p className="text-gray-600 mb-6">Add your Educatinal information</p>
        <form className="space-y-4" >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-gray-600">University Name</label>
                <input
                type="text"
                name="UniversityName"
                required
                defaultValue={resumeInfo?.UniversityName}
                onChange={handeldata}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
            </div>
            <div>
                <label className="block text-gray-600">Degree</label>
                <input
                type="text"
                name="Degree"
                required
                defaultValue={resumeInfo?.Degree}
                onChange={handeldata}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
            </div>
            
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-gray-600">Major</label>
                <input
                type="text"
                name="Major"
                onChange={handeldata}
                required
                defaultValue={resumeInfo?.Major}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
            </div>
            <div>
                <label className="block text-gray-600">Start Date</label>
                <input
                type="date"
                name="StartDateEdu"
                onChange={handeldata}
                required
                defaultValue={resumeInfo?.StartDateEdu}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
            </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-gray-600">End Date</label>
                <input
                type="date"
                name="EndDateEdu"
                onChange={handeldata}
                required
                defaultValue={resumeInfo?.EndDateEdu}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
            </div>
            <div>
                <label className="block text-gray-600">Description</label>
                <textarea
                                type="text"
                                name="DescriptionEdu"
                                onChange={handeldata}
                                required
                                defaultValue={resumeInfo?.DescriptionEdu}
                                className="w-full h px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            ></textarea>
            </div>

            </div>
        
            {/* <button
            type="button"
            onClick={sub}
            className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
            >
            Save
            </button> */}
        </form>
        </div>
    )
    }

    export default Education
