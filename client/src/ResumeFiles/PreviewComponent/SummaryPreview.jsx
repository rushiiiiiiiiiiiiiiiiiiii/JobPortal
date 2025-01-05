import React from 'react'

const SummaryPreview = ({resumeInfo}) => {
  return (
    <div>
   <p className='text-sm'>
    {resumeInfo?.summary}
   </p>
   </div>
  )
}

export default SummaryPreview
