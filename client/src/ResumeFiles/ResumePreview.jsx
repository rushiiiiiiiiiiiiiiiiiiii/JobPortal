import React, { useContext } from 'react'
import { ResumeContext } from '../context/ResumeContext'
import PersnolDetailPreview from './PreviewComponent/PersnolDetailPreview'
import SummaryPreview from './PreviewComponent/SummaryPreview'
import ExperiencePreview from './PreviewComponent/ExperiencePreview'
import EducationPreview from './PreviewComponent/EducationPreview'
import SkillsPreview from './PreviewComponent/SkillsPreview'
import MainResume from './PreviewComponent/MainResume'

const ResumePreview = () => {
    const {resumeInfo, setResumeInfo} = useContext(ResumeContext)
    
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
    <div className="border-2 border-red-500 p-4 rounded-lg">

        {/* persnol details */}
         <PersnolDetailPreview resumeInfo={resumeInfo}/>

        {/* Summary */}
        <SummaryPreview resumeInfo={resumeInfo}/>

        {/* Professional Experience */}
        <ExperiencePreview resumeInfo={resumeInfo}/>

        {/* Educatinal */}
        <EducationPreview resumeInfo={resumeInfo}/>

        {/* Skills */}
        <SkillsPreview resumeInfo={resumeInfo}/>

    </div>
  </div>
  )
}

export default ResumePreview
