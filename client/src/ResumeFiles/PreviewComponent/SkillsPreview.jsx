  import React, { useContext } from 'react';
  import { ResumeContext } from '../../context/ResumeContext';

  const SkillsPreview = () => {
    const { resumeInfo } = useContext(ResumeContext);

    return (
      <div className="my-3">
        <h2 className="text-center font-bold text-sm text-red-500">Professional Skills</h2>
        <hr className="border-[1.5px] my-2 border-red-500" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
    {resumeInfo.skills?.length ? (
      resumeInfo.skills.map((skill, index) => (
        <div 
          key={index} 
          className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg shadow-md"
        >
          {skill}
        </div>
      ))
    ) : (
    
    "")}
  </div>

      </div>
    );
  };

  export default SkillsPreview;
