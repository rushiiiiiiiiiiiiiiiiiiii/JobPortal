import React, { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';

const MainResume = () => {
  const { resumeInfo } = useContext(ResumeContext);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Personal Details */}
      <div className="my-6">
        <h2 className="text-red-500 font-bold text-xl text-center">{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
        <h2 className="font-medium text-sm text-center">{resumeInfo?.jobTitle}</h2>
        <h2 className="text-red-500 font-normal text-xs text-center">{resumeInfo?.address}</h2>
        <div className="flex justify-between mt-2">
          <h2 className="text-red-500 font-normal text-xs">{resumeInfo?.phone}</h2>
          <h2 className="text-red-500 font-normal text-xs">{resumeInfo?.email}</h2>
        </div>
        <hr className="border-[1.5px] my-2 border-red-500" />
      </div>

      {/* Professional Experience */}
      <div className="my-6">
        <h2 className="text-center font-bold text-sm text-red-500">Professional Experience</h2>
        <hr className="border-[1.5px] my-2 border-red-500" />
        <div>
          <h2 className="text-red-500 text-sm font-bold">{resumeInfo?.PositionTitle}</h2>
          <h2 className="text-xs flex justify-between">{resumeInfo?.CompanyName}, {resumeInfo?.City}, {resumeInfo?.State}
            <span>{resumeInfo?.StartDate} - {resumeInfo?.EndDate}</span>
          </h2>
          <p className="text-xs my-2">{resumeInfo?.Desc}</p>
        </div>
      </div>

      {/* Professional Skills */}
      <div className="my-6">
        <h2 className="text-center font-bold text-sm text-red-500">Professional Skills</h2>
        <hr className="border-[1.5px] my-2 border-red-500" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
          {resumeInfo.skills?.length ? (
            resumeInfo.skills.map((skill, index) => (
              <div key={index} className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg shadow-md">
                {skill}
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No skills added yet.</p>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="my-6">
        <h2 className="text-center font-bold text-sm text-red-500">Summary</h2>
        <hr className="border-[1.5px] my-2 border-red-500" />
        <p className="text-sm">{resumeInfo?.summary}</p>
      </div>
    </div>
  );
};

export default MainResume;
