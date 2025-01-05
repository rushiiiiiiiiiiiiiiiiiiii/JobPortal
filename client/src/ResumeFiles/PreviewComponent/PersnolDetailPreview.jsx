import React from 'react'

const PersnolDetailPreview = ({ resumeInfo }) => {
  return (
    <div>
      <h2 className='text-red-500 font-bold text-xl text-center'>{resumeInfo?.firstName}{resumeInfo?.lastName}</h2>
      <h2 className='font-medium text-sm text-center'>{resumeInfo?.jobTitle}</h2>
      <h2 className='text-red-500 font-normal text-xs text-center'>{resumeInfo?.address}
      </h2>
      <div className='flex justify-between '>
        <h2 className='text-red-500 font-normal text-xs '>{resumeInfo?.phone}</h2>
        <h2 className='text-red-500 font-normal text-xs '>{resumeInfo?.email}</h2>
      </div>
      <hr className='border-[1.5px] my-2 border-red-500' />
  

    </div>
  )
}

export default PersnolDetailPreview
