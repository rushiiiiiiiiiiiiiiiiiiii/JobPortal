import React, { useContext } from 'react'
import { ResumeContext } from '../../context/ResumeContext';

const ResumeName = () => {
      const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
    
        const handeldata = (e) => {
            const { name, value } = e.target;
            setResumeInfo({
                ...resumeInfo,
                [name]: value
            });
        };
        const sub= ()=>{}
    
  return (
    <div>
       <div>
            <h2 className="text-xl font-bold text-purple-700 mb-4">Resume Name</h2>
            <p className="text-gray-600 mb-5">Add Name for your job Resume</p>
            <label className="block text-gray-600">Enter Your Resume Name</label>

            <form className="space-y-4" onSubmit={sub}>
            <div className="flex justify-between items-end">
                       
                        <input
                            type="text"
                            name="resumename"
                            onChange={handeldata}
                            required
                            defaultValue={resumeInfo?.resumename}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

            </form>
    </div >
    </div>
  )
}

export default ResumeName
