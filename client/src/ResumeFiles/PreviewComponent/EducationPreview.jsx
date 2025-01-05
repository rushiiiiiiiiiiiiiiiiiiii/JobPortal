import React from 'react'

const EducationPreview = ({resumeInfo}) => {
  return (
    <div className='my-3'>
      <h2 className='text-center font-bold text-sm text-red-500'>Education Details</h2>
      <hr className='border-[1.5px] my-2 border-red-500' />
<div className='my-5'>
    <h2 className='text-red-500 text-sm font-bold'>{resumeInfo?.UniversityName}</h2>
    <h2 className='text-xs flex justify-between'>{resumeInfo?.Degree} in {resumeInfo?.Major}
    <span>{resumeInfo?.StartDateEdu} {resumeInfo?.EndDateEdu}</span></h2>
    <p className='text-xs my-2'>{resumeInfo?.DescriptionEdu}</p>
    </div>

    </div>
  )
}

export default EducationPreview
