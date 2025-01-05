import React from 'react'

const ExperiencePreview = ({resumeInfo}) => {
  return (
    <div className='my-3'>
      <h2 className='text-center font-bold text-sm text-red-500'>Professional Experience</h2>
      <hr className='border-[1.5px] my-2 border-red-500' />
      {/* {
        resumeInfo?.experience.map((experience,i)=>(
<div key={i}> */}
    <h2 className='text-red-500 text-sm font-bold'>{resumeInfo?.PositionTitle}</h2>
    <h2 className='text-xs flex justify-between'>{resumeInfo?.CompanyName}, {resumeInfo?.City},{resumeInfo?.State}
    <span>{resumeInfo?.StartDate} {resumeInfo?.EndDate}</span></h2>
    <p className='text-xs my-2'>{resumeInfo?.Desc}</p>
    {/* </div>
        ))
} */}
    </div>
  )
}

export default ExperiencePreview
